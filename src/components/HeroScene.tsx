import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  AnimationAction,
  AnimationClip,
  AnimationMixer,
  AmbientLight,
  Box3,
  BoxGeometry,
  Clock,
  Color,
  ConeGeometry,
  DirectionalLight,
  Fog,
  Group,
  InstancedMesh,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
  LoopOnce,
  LoopRepeat,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { outfitPalettes, type OutfitPaletteId } from '../data/outfitPalettes';
import { modelUrl } from '../lib/sitePaths';

type SceneStatus = 'loading' | 'ready' | 'error';

const heroModelPath = modelUrl('Landing.glb');
const heroAnimationPackPath = modelUrl('HeroAnimations.glb');

type HeroLocomotionMode =
  | 'landing'
  | 'walking'
  | 'running'
  | 'walkingBackward'
  | 'runningBackward';
type HeroJumpMode = 'forwardJump' | 'runningJump';
type HeroRecoveryMode = 'stumbleBackward' | 'kipUp';
export type HeroAnimationMode = HeroLocomotionMode | HeroJumpMode | HeroRecoveryMode;

// Landing stays embedded in the visible base model. The rest come from a shared animation pack.
const heroAnimationLibrary: Record<
  HeroAnimationMode,
  {
    aliases: readonly string[];
  }
> = {
  landing: {
    aliases: ['landing', 'idle', 'breath', 'breathing', 'rest'],
  },
  walking: {
    aliases: ['walking', 'walk', 'locomotion', 'move'],
  },
  running: {
    aliases: ['running', 'run', 'sprint', 'jog'],
  },
  walkingBackward: {
    aliases: ['walkingbackwards', 'walkbackwards', 'walkbackward', 'backward'],
  },
  runningBackward: {
    aliases: ['walkingbackwards', 'walkbackwards', 'walkbackward', 'backward'],
  },
  forwardJump: {
    aliases: ['forwardjump', 'jump', 'hop'],
  },
  runningJump: {
    aliases: ['runningjump', 'runjump', 'jump'],
  },
  stumbleBackward: {
    aliases: ['stumblebackwards', 'stumblebackward', 'stumble', 'fallback'],
  },
  kipUp: {
    aliases: ['kipup', 'standup', 'getup', 'recover'],
  },
};

type TouchMovementState = {
  active: boolean;
  x: number;
  y: number;
  magnitude: number;
};

type ControlHintState = {
  hasMoved: boolean;
  hasRun: boolean;
  hasJumped: boolean;
};

type HeroSceneProps = {
  outfitPaletteId: OutfitPaletteId;
  animationMode?: HeroAnimationMode;
  isExpanded?: boolean;
  isOutfitTransitioning?: boolean;
  onOutfitApplied?: () => void;
  labels: {
    loading: string;
    error: string;
    tailoringTitle: string;
    tailoringText: string;
  };
};

function normalizeAnimationName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function resolveAnimationClip(
  clips: AnimationClip[],
  aliases: readonly string[],
): AnimationClip | null {
  const normalizedAliases = aliases.map(normalizeAnimationName);

  return (
    clips.find((clip) => {
      const clipName = normalizeAnimationName(clip.name);
      return normalizedAliases.some((alias) => clipName.includes(alias));
    }) ?? null
  );
}

function resolvePackedAnimationClip(
  clips: AnimationClip[],
  mode: HeroAnimationMode,
  aliases: readonly string[],
) {
  const normalizedMode = normalizeAnimationName(mode);
  const exactMatch =
    clips.find((clip) => normalizeAnimationName(clip.name) === normalizedMode) ?? null;

  if (exactMatch) {
    return exactMatch;
  }

  if (mode === 'runningBackward') {
    const walkingBackwardMatch =
      clips.find(
        (clip) => normalizeAnimationName(clip.name) === normalizeAnimationName('walkingBackward'),
      ) ?? null;

    if (walkingBackwardMatch) {
      return walkingBackwardMatch;
    }
  }

  return resolveAnimationClip(clips, aliases);
}

function pickFallbackClip(clips: AnimationClip[]) {
  if (!clips.length) {
    return null;
  }

  // These GLBs currently contain multiple generic Mixamo layers; the newest intended
  // export ends up as the last clip in each file.
  return clips[clips.length - 1];
}

const rootMotionTargetPattern = /(^|\.)(pelvis|hips|mixamorighips|root|armature)(\.|$)/i;

function makeClipInPlace(clip: AnimationClip) {
  const sanitizedClip = clip.clone();

  sanitizedClip.tracks.forEach((track) => {
    if (!track.name.toLowerCase().endsWith('.position')) {
      return;
    }

    const trackTarget = track.name.slice(0, -'.position'.length);
    if (!rootMotionTargetPattern.test(trackTarget)) {
      return;
    }

    const values = track.values;
    if (values.length < 3) {
      return;
    }

    const baseX = values[0];
    const baseZ = values[2];

    for (let index = 0; index < values.length; index += 3) {
      values[index] = baseX;
      values[index + 2] = baseZ;
    }
  });

  return sanitizedClip;
}

function createAnimationActionMap(
  mixer: AnimationMixer,
  clips: Partial<Record<HeroAnimationMode, AnimationClip>>,
) {
  const actions: Partial<Record<HeroAnimationMode, AnimationAction>> = {};

  (Object.entries(clips) as [HeroAnimationMode, AnimationClip | undefined][]).forEach(
    ([mode, clip]) => {
      if (!clip) {
        return;
      }

      const action = mixer.clipAction(clip);
      action.enabled = true;
      action.clampWhenFinished = false;
      action.setLoop(LoopRepeat, Infinity);
      actions[mode] = action;
    },
  );

  return actions;
}

function configureActionForMode(
  action: AnimationAction,
  mode: HeroAnimationMode,
  holdLandingPose: boolean,
) {
  action.enabled = true;
  action.setEffectiveWeight(1);

  if (mode === 'landing') {
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;

    if (holdLandingPose) {
      action.paused = false;
      action.time = Math.max(action.getClip().duration - 1 / 60, 0);
      action.setEffectiveTimeScale(0);
      action.play();
      return;
    }

    action.paused = false;
    action.reset();
    action.setEffectiveTimeScale(1);
    action.play();
    return;
  }

  if (
    mode === 'forwardJump' ||
    mode === 'runningJump' ||
    mode === 'stumbleBackward' ||
    mode === 'kipUp'
  ) {
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.paused = false;
    action.reset();
    action.setEffectiveTimeScale(
      mode === 'runningJump' ? 1.05 : mode === 'kipUp' ? 1.04 : 1,
    );
    action.play();
    return;
  }

  action.clampWhenFinished = false;
  action.setLoop(LoopRepeat, Infinity);
  action.paused = false;
  action.reset();
  action.setEffectiveTimeScale(
    mode === 'running' ? 1.12 : mode === 'runningBackward' ? 1.24 : 1,
  );
  action.play();
}

function resolveAvailableAnimationMode(
  actions: Partial<Record<HeroAnimationMode, AnimationAction>>,
  requestedMode: HeroAnimationMode,
) {
  if (actions[requestedMode]) {
    return requestedMode;
  }

  if (requestedMode === 'runningJump' && actions.running) {
    return 'running';
  }

  if (requestedMode === 'forwardJump' && actions.walking) {
    return 'walking';
  }

  if (requestedMode === 'runningBackward' && actions.walkingBackward) {
    return 'walkingBackward';
  }

  if (requestedMode === 'walkingBackward' && actions.walking) {
    return 'walking';
  }

  if (requestedMode === 'kipUp' && actions.walkingBackward) {
    return 'walkingBackward';
  }

  if (requestedMode === 'stumbleBackward' && actions.walkingBackward) {
    return 'walkingBackward';
  }

  if (actions.landing) {
    return 'landing';
  }

  if (actions.walking) {
    return 'walking';
  }

  if (actions.running) {
    return 'running';
  }

  return null;
}

function playAnimationMode(
  actions: Partial<Record<HeroAnimationMode, AnimationAction>>,
  requestedMode: HeroAnimationMode,
  activeModeRef: { current: HeroAnimationMode | null },
  landingIntroCompletedRef: { current: boolean },
  immediate = false,
) {
  const nextMode = resolveAvailableAnimationMode(actions, requestedMode);

  if (!nextMode) {
    return false;
  }

  const nextAction = actions[nextMode];
  const currentMode = activeModeRef.current;
  const currentAction = currentMode ? actions[currentMode] : null;

  if (!nextAction) {
    return false;
  }

  const holdLandingPose = nextMode === 'landing' && landingIntroCompletedRef.current;

  if (
    currentMode === nextMode &&
    (nextAction.isRunning() || (nextMode === 'landing' && holdLandingPose))
  ) {
    return true;
  }

  configureActionForMode(nextAction, nextMode, holdLandingPose);

  if (currentAction && currentAction !== nextAction) {
    currentAction.crossFadeTo(nextAction, immediate ? 0 : 0.35, true);
  } else {
    nextAction.fadeIn(immediate ? 0 : 0.35);
  }

  activeModeRef.current = nextMode;
  return true;
}

function isMovementKey(key: string) {
  return key === 'w' || key === 'a' || key === 's' || key === 'd';
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return (
    target.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT'
  );
}

function resolveRequestedAnimationMode(
  restMode: HeroLocomotionMode,
  activeMovementKeys: Set<string>,
  isSprintPressed: boolean,
  touchMovement: TouchMovementState,
): HeroLocomotionMode {
  const isForwardPressed =
    activeMovementKeys.has('w') || (touchMovement.active && touchMovement.y < -0.18);
  const isBackwardPressed =
    activeMovementKeys.has('s') || (touchMovement.active && touchMovement.y > 0.18);

  if (!isForwardPressed && !isBackwardPressed) {
    return restMode;
  }

  const isTouchForwardSprint =
    touchMovement.active && touchMovement.y < -0.18 && touchMovement.magnitude > 0.8;
  const isTouchBackwardSprint =
    touchMovement.active && touchMovement.y > 0.18 && touchMovement.magnitude > 0.8;

  if (isBackwardPressed) {
    return isSprintPressed || isTouchBackwardSprint ? 'runningBackward' : 'walkingBackward';
  }

  return (isSprintPressed || isTouchForwardSprint) && isForwardPressed ? 'running' : 'walking';
}

function easeAngle(current: number, target: number, blend: number) {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + delta * blend;
}

function loadOptionalGltf(loader: GLTFLoader, path: string) {
  return (async () => {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      const resourceRoot = path.slice(0, path.lastIndexOf('/') + 1);

      return await new Promise<GLTF | null>((resolve) => {
        loader.parse(
          arrayBuffer,
          resourceRoot,
          (gltf) => resolve(gltf),
          () => resolve(null),
        );
      });
    } catch {
      return null;
    }
  })();
}

async function loadHeroAnimationClips(
  loader: GLTFLoader,
  embeddedClips: AnimationClip[],
) {
  const resolvedClips: Partial<Record<HeroAnimationMode, AnimationClip>> = {};

  (Object.entries(heroAnimationLibrary) as [
    HeroAnimationMode,
    (typeof heroAnimationLibrary)[HeroAnimationMode],
  ][]).forEach(([mode, config]) => {
    const embeddedClip = resolveAnimationClip(embeddedClips, config.aliases);
    if (embeddedClip) {
      resolvedClips[mode] = mode === 'landing' ? embeddedClip : makeClipInPlace(embeddedClip);
      return;
    }

    const fallbackEmbeddedClip = pickFallbackClip(embeddedClips);
    if (mode === 'landing' && fallbackEmbeddedClip) {
      resolvedClips[mode] = fallbackEmbeddedClip;
    }
  });

  const missingModes = (Object.keys(heroAnimationLibrary) as HeroAnimationMode[]).filter(
    (mode) => !resolvedClips[mode],
  );

  if (!missingModes.length) {
    return resolvedClips;
  }

  const animationPack = await loadOptionalGltf(loader, heroAnimationPackPath);
  if (!animationPack?.animations.length) {
    return resolvedClips;
  }

  missingModes.forEach((mode) => {
    const matchedClip = resolvePackedAnimationClip(
      animationPack.animations,
      mode,
      heroAnimationLibrary[mode].aliases,
    );
    if (matchedClip) {
      resolvedClips[mode] = mode === 'landing' ? matchedClip : makeClipInPlace(matchedClip);
    }
  });

  return resolvedClips;
}

function applyOutfitPalette(model: Group, outfitPaletteId: OutfitPaletteId) {
  const palette = outfitPalettes.find((entry) => entry.id === outfitPaletteId) ?? outfitPalettes[0];
  const clothTint = new Color(palette.cloth);
  const accentClothTint = new Color(palette.cloak);
  const armorTint = new Color(palette.armor);
  const metalTint = new Color(palette.metal);

  model.traverse((child) => {
    if (!('isMesh' in child && child.isMesh)) {
      return;
    }

    const mesh = child as Mesh;
    const meshName = mesh.name.toLowerCase();
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materials.forEach((material) => {
      if (!(material instanceof MeshStandardMaterial)) {
        return;
      }

      const materialName = material.name.toLowerCase();

      if (materialName.startsWith('cloth')) {
        const tint = meshName.includes('cloak') ? accentClothTint : clothTint;
        material.color.copy(tint);
        material.roughness = 0.92;
        material.metalness = 0.06;
      } else if (materialName.startsWith('armor')) {
        material.color.copy(armorTint);
        material.roughness = 0.55;
        material.metalness = 0.28;
      } else if (materialName.startsWith('metall')) {
        material.color.copy(metalTint);
        material.roughness = 0.34;
        material.metalness = 0.72;
      }

      material.needsUpdate = true;
    });
  });
}

function hideDuplicateAvatarVariant(model: Group) {
  const isLegacyFantasyAvatar =
    model.getObjectByName('Armature.Cloak') !== undefined ||
    model.getObjectByName('SM_Cloak') !== undefined;

  if (!isLegacyFantasyAvatar) {
    return;
  }

  const duplicateNodeNames = new Set([
    'Armature',
    'SM_Bag',
    'SM_Body',
    'SM_Dagger',
    'SM_Head',
    'SM_Legs',
    'SM_Cloak',
    'Armature.Cloak',
  ]);

  model.traverse((child) => {
    if (duplicateNodeNames.has(child.name)) {
      child.visible = false;
    }
  });
}

function hideAvatarAccessories(model: Group) {
  model.traverse((child) => {
    if ('isMesh' in child && child.isMesh) {
      const mesh = child as Mesh;
      const meshName = mesh.name.toLowerCase();

      if (
        meshName.includes('dagger') ||
        meshName.includes('flask') ||
        meshName.includes('bag')
      ) {
        mesh.visible = false;
      }
    }
  });
}

function resolveHeroFocusNode(model: Group) {
  const focusNodeNames = ['spine_03', 'spine_04', 'spine_02', 'pelvis', 'hips', 'head'];

  for (const nodeName of focusNodeNames) {
    const node = model.getObjectByName(nodeName);
    if (node) {
      return node;
    }
  }

  return model;
}

function disposeMaterial(material: unknown) {
  const materials = Array.isArray(material) ? material : [material];

  materials.forEach((entry) => {
    if (!entry || typeof entry !== 'object' || !('dispose' in entry)) {
      return;
    }

    Object.values(entry).forEach((value) => {
      if (value && typeof value === 'object' && 'dispose' in value && typeof value.dispose === 'function') {
        value.dispose();
      }
    });

    entry.dispose();
  });
}

export function HeroScene({
  outfitPaletteId,
  animationMode = 'landing',
  isExpanded = false,
  isOutfitTransitioning = false,
  onOutfitApplied,
  labels,
}: HeroSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const forceViewportResizeRef = useRef<(() => void) | null>(null);
  const forceViewportReframeRef = useRef<(() => void) | null>(null);
  const modelRootRef = useRef<Group | null>(null);
  const outfitPaletteRef = useRef(outfitPaletteId);
  const animationModeRef = useRef<HeroAnimationMode>(animationMode);
  const requestedAnimationModeRef = useRef<HeroAnimationMode>(animationMode);
  const onOutfitAppliedRef = useRef(onOutfitApplied);
  const animationMixerRef = useRef<AnimationMixer | null>(null);
  const animationActionsRef = useRef<Partial<Record<HeroAnimationMode, AnimationAction>>>({});
  const activeAnimationModeRef = useRef<HeroAnimationMode | null>(null);
  const hasClipAnimationRef = useRef(false);
  const landingIntroCompletedRef = useRef(false);
  const movementKeysRef = useRef<Set<string>>(new Set());
  const sprintPressedRef = useRef(false);
  const jumpHeldRef = useRef(false);
  const jumpModeRef = useRef<HeroJumpMode | null>(null);
  const recoveryModeRef = useRef<HeroRecoveryMode | null>(null);
  const gameStateRef = useRef<'idle' | 'playing' | 'gameover'>('idle');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const scoreElementRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef(0);
  const speedMultiplierRef = useRef(1);
  const obstaclesRef = useRef<Mesh[]>([]);
  const lastSpawnZRef = useRef(0);
  const resetGameRef = useRef<(() => void) | null>(null);
  const touchMovementRef = useRef<TouchMovementState>({
    active: false,
    x: 0,
    y: 0,
    magnitude: 0,
  });
  const joystickRef = useRef<HTMLDivElement | null>(null);
  const joystickPointerIdRef = useRef<number | null>(null);
  const [status, setStatus] = useState<SceneStatus>('loading');
  const [mobileJoystickState, setMobileJoystickState] = useState({
    active: false,
    x: 0,
    y: 0,
  });
  const [mobileJumpActive, setMobileJumpActive] = useState(false);
  const [isTouchHintMode, setIsTouchHintMode] = useState(false);
  const [controlHintState, setControlHintState] = useState<ControlHintState>({
    hasMoved: false,
    hasRun: false,
    hasJumped: false,
  });

  const advanceControlHint = (step: keyof ControlHintState) => {
    setControlHintState((current) => {
      if (current[step]) {
        return current;
      }

      return {
        ...current,
        [step]: true,
      };
    });
  };

  const controlHintStep = !controlHintState.hasMoved
    ? 'move'
    : !controlHintState.hasRun
      ? 'run'
      : controlHintState.hasJumped
        ? 'done'
        : 'jump';

  const updateTouchMovement = (x: number, y: number, active: boolean) => {
    const magnitude = Math.min(1, Math.hypot(x, y));
    const normalizedX = magnitude > 1 ? x / magnitude : x;
    const normalizedY = magnitude > 1 ? y / magnitude : y;

    touchMovementRef.current = {
      active,
      x: normalizedX,
      y: normalizedY,
      magnitude: Math.min(1, Math.hypot(normalizedX, normalizedY)),
    };

    setMobileJoystickState({
      active,
      x: normalizedX,
      y: normalizedY,
    });

    if (active && Math.hypot(normalizedX, normalizedY) > 0.2) {
      advanceControlHint('hasMoved');
    }

    if (active && normalizedY < -0.18 && Math.hypot(normalizedX, normalizedY) > 0.8) {
      advanceControlHint('hasRun');
    }

    syncRequestedAnimationMode();
  };

  const resetTouchMovement = () => {
    updateTouchMovement(0, 0, false);
  };

  const queueJump = () => {
    if (!landingIntroCompletedRef.current || jumpModeRef.current || recoveryModeRef.current) {
      return false;
    }

    const touchForwardPressed = touchMovementRef.current.active && touchMovementRef.current.y < -0.2;
    const shouldUseRunningJump =
      (sprintPressedRef.current ||
        (touchForwardPressed && touchMovementRef.current.magnitude > 0.8)) &&
      (movementKeysRef.current.has('w') || touchForwardPressed);

    const requestedJumpMode = shouldUseRunningJump ? 'runningJump' : 'forwardJump';

    if (!animationActionsRef.current[requestedJumpMode]) {
      return false;
    }

    jumpModeRef.current = requestedJumpMode;
    advanceControlHint('hasJumped');
    syncRequestedAnimationMode();
    return true;
  };

  const queueBackwardRecovery = () => {
    if (!landingIntroCompletedRef.current || jumpModeRef.current || recoveryModeRef.current) {
      return false;
    }

    const isForwardRunning =
      (movementKeysRef.current.has('w') && sprintPressedRef.current) ||
      activeAnimationModeRef.current === 'running' ||
      requestedAnimationModeRef.current === 'running';

    if (!isForwardRunning || !animationActionsRef.current.stumbleBackward) {
      return false;
    }

    movementKeysRef.current.delete('w');
    recoveryModeRef.current = 'stumbleBackward';
    syncRequestedAnimationMode();
    return true;
  };

  const syncRequestedAnimationMode = () => {
    const nextMode = landingIntroCompletedRef.current
      ? recoveryModeRef.current ??
        jumpModeRef.current ??
        resolveRequestedAnimationMode(
          animationModeRef.current as HeroLocomotionMode,
          movementKeysRef.current,
          sprintPressedRef.current,
          touchMovementRef.current,
        )
      : 'landing';
    requestedAnimationModeRef.current = nextMode;

    if (animationMixerRef.current) {
      playAnimationMode(
        animationActionsRef.current,
        nextMode,
        activeAnimationModeRef,
        landingIntroCompletedRef,
      );
    }
  };

  useEffect(() => {
    outfitPaletteRef.current = outfitPaletteId;

    if (modelRootRef.current) {
      applyOutfitPalette(modelRootRef.current, outfitPaletteId);

      window.requestAnimationFrame(() => {
        onOutfitAppliedRef.current?.();
      });
    }
  }, [outfitPaletteId]);

  useEffect(() => {
    animationModeRef.current = animationMode;
    syncRequestedAnimationMode();
  }, [animationMode]);

  useEffect(() => {
    const syncViewport = () => {
      forceViewportResizeRef.current?.();
      forceViewportReframeRef.current?.();
    };

    const firstFrame = window.requestAnimationFrame(() => {
      syncViewport();

      window.requestAnimationFrame(() => {
        syncViewport();
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) {
        return;
      }

      const key = event.key.toLowerCase();
      const isJumpKey = event.code === 'Space';
      let changed = false;

      if (isJumpKey) {
        event.preventDefault();

        if (!jumpHeldRef.current) {
          jumpHeldRef.current = true;
          changed = queueJump() || changed;
        }
      }

      if (isMovementKey(key) && !movementKeysRef.current.has(key)) {
        movementKeysRef.current.add(key);
        advanceControlHint('hasMoved');
        changed = true;

        if (key === 's') {
          changed = queueBackwardRecovery() || changed;
        }
      }

      if (key === 'shift' && !sprintPressedRef.current) {
        sprintPressedRef.current = true;
        advanceControlHint('hasRun');
        changed = true;
      }

      if (changed) {
        syncRequestedAnimationMode();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isJumpKey = event.code === 'Space';
      let changed = false;

      if (isJumpKey) {
        jumpHeldRef.current = false;
      }

      if (isMovementKey(key) && movementKeysRef.current.has(key)) {
        movementKeysRef.current.delete(key);
        changed = true;
      }

      if (key === 'shift' && sprintPressedRef.current) {
        sprintPressedRef.current = false;
        changed = true;
      }

      if (changed) {
        syncRequestedAnimationMode();
      }
    };

    const handleBlur = () => {
      if (
        movementKeysRef.current.size === 0 &&
        !sprintPressedRef.current &&
        !touchMovementRef.current.active &&
        !jumpHeldRef.current &&
        !jumpModeRef.current
      ) {
        return;
      }

      movementKeysRef.current.clear();
      sprintPressedRef.current = false;
      jumpHeldRef.current = false;
      jumpModeRef.current = null;
      recoveryModeRef.current = null;
      resetTouchMovement();
      syncRequestedAnimationMode();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    onOutfitAppliedRef.current = onOutfitApplied;
  }, [onOutfitApplied]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const syncHintMode = () => {
      setIsTouchHintMode(mediaQuery.matches);
    };

    syncHintMode();
    mediaQuery.addEventListener('change', syncHintMode);

    return () => {
      mediaQuery.removeEventListener('change', syncHintMode);
    };
  }, []);

  const updateJoystickFromClientPosition = (clientX: number, clientY: number) => {
    const joystick = joystickRef.current;

    if (!joystick) {
      return;
    }

    const bounds = joystick.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const radius = Math.max(Math.min(bounds.width, bounds.height) * 0.34, 1);
    const deltaX = (clientX - centerX) / radius;
    const deltaY = (clientY - centerY) / radius;
    const magnitude = Math.hypot(deltaX, deltaY);

    if (magnitude > 1) {
      updateTouchMovement(deltaX / magnitude, deltaY / magnitude, true);
      return;
    }

    updateTouchMovement(deltaX, deltaY, true);
  };

  const handleJoystickPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    joystickPointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateJoystickFromClientPosition(event.clientX, event.clientY);
  };

  const handleJoystickPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (joystickPointerIdRef.current !== event.pointerId) {
      return;
    }

    event.preventDefault();
    updateJoystickFromClientPosition(event.clientX, event.clientY);
  };

  const handleJoystickPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (joystickPointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    joystickPointerIdRef.current = null;
    resetTouchMovement();
  };

  const handleMobileJumpPress = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setMobileJumpActive(true);
    queueJump();
  };

  const handleMobileJumpRelease = () => {
    setMobileJumpActive(false);
  };

  const controlHintCopy =
    controlHintStep === 'move'
      ? {
          title: isTouchHintMode ? 'Move' : 'Walk',
          text: isTouchHintMode ? 'Use the joystick to move.' : 'Use W A S D to walk.',
        }
      : controlHintStep === 'run'
        ? {
            title: 'Run',
            text: isTouchHintMode
              ? 'Push the joystick farther forward to run.'
              : 'Hold Shift + W to run.',
          }
        : controlHintStep === 'jump'
          ? {
              title: 'Jump',
              text: isTouchHintMode ? 'Tap Jump to leap.' : 'Press Spacebar to jump.',
            }
          : null;

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const scene = new Scene();
    scene.fog = new Fog(0x07141f, 40, 150);

    const camera = new PerspectiveCamera(42, 1, 0.01, 200);
    camera.position.set(0, 1.4, 8.5);

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const stage = new Group();
    scene.add(stage);

    const ambientLight = new AmbientLight(0xffffff, 2.0);
    const keyLight = new DirectionalLight(0xfff2d7, 5.0);
    keyLight.position.set(5.5, 7, 6.5);

    const rimLight = new DirectionalLight(0x5ed6c2, 2.7);
    rimLight.position.set(-4.5, 3.5, -5);

    const fillLight = new DirectionalLight(0xff8a5b, 2.2);
    fillLight.position.set(-2.5, -1.5, 4.5);

    scene.add(ambientLight, keyLight, rimLight, fillLight);

    const obstacleGeo = new BoxGeometry(1.2, 1.2, 1.2);
    const obstacleMat = new MeshStandardMaterial({ color: 0xff4444, roughness: 0.6 });
    const terrainGroup = new Group();
    stage.add(terrainGroup);

    const spawnObstacle = (z: number) => {
      const obs = new Mesh(obstacleGeo, obstacleMat);
      obs.castShadow = true;
      obs.receiveShadow = true;
      obs.position.set((Math.random() - 0.5) * 7, baseModelPosition.y + 0.6, z);
      stage.add(obs);
      obstaclesRef.current.push(obs);
    };

    const cleanupObstacles = () => {
      obstaclesRef.current.forEach(obs => stage.remove(obs));
      obstaclesRef.current.length = 0;
    };

    const loader = new GLTFLoader();
    
    const groundGeo = new PlaneGeometry(2000, 2000);
    const groundMat = new MeshStandardMaterial({ color: 0x3b5323, roughness: 1, metalness: 0.1 });
    const ground = new Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    terrainGroup.add(ground);

    const dummy = new Object3D();
    const grassCount = 15000;
    const grassGeo = new ConeGeometry(0.1, 0.4, 3);
    const grassMat = new MeshStandardMaterial({ color: 0x5a863e, roughness: 0.8 });
    const grassMesh = new InstancedMesh(grassGeo, grassMat, grassCount);
    grassMesh.receiveShadow = true;
    grassMesh.castShadow = true;
    for (let i = 0; i < grassCount; i++) {
      const x = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 400;
      dummy.position.set(x, 0.2, z);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      dummy.rotation.x = (Math.random() - 0.5) * 0.2;
      dummy.rotation.z = (Math.random() - 0.5) * 0.2;
      const scale = 0.5 + Math.random() * 1.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      grassMesh.setMatrixAt(i, dummy.matrix);
    }
    terrainGroup.add(grassMesh);

    const flowerCount = 3000;
    const flowerGeo = new SphereGeometry(0.15, 5, 4);
    const flowerMat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
    const flowerMesh = new InstancedMesh(flowerGeo, flowerMat, flowerCount);
    flowerMesh.receiveShadow = true;
    flowerMesh.castShadow = true;
    const flowerColors = [0xff6b81, 0xffd166, 0x4bcffa, 0xfcb045, 0xffffff];
    const tempColor = new Color();
    for (let i = 0; i < flowerCount; i++) {
      const x = (Math.random() - 0.5) * 400;
      const z = (Math.random() - 0.5) * 400;
      dummy.position.set(x, 0.08, z);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      const scale = 0.5 + Math.random() * 0.8;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      flowerMesh.setMatrixAt(i, dummy.matrix);
      tempColor.setHex(flowerColors[Math.floor(Math.random() * flowerColors.length)]);
      flowerMesh.setColorAt(i, tempColor);
    }
    terrainGroup.add(flowerMesh);

    const clock = new Clock();
    const tempSize = new Vector3();
    const tempCenter = new Vector3();
    const cameraLookTarget = new Vector3(0, 0.6, 0);
    const clampedTarget = new Vector3();
    const targetDelta = new Vector3();
    const followedLookTarget = new Vector3();
    const movementOffset = new Vector3();
    const movementDirection = new Vector3(0, 0, -1);
    const movementStep = new Vector3();
    const cameraFacingDirection = new Vector3(0, 0, -1);
    const baseModelPosition = new Vector3();
    const heroFocusPoint = new Vector3();
    const panBoundsMin = new Vector3();
    const panBoundsMax = new Vector3();
    const cameraBaseOffset = new Vector3();
    const cameraOffset = new Vector3();
    const controls = new OrbitControls(camera, renderer.domElement);
    const sceneDocument = renderer.domElement.ownerDocument;
    const walkSpeed = 1.55;
    const runSpeed = 3.1;
    const backwardSpeed = 1.05;
    const turnSpeed = 2.35;
    const landingDropHeight = 2.15;
    const heroVerticalLift = 2.50;

    let animationFrame = 0;
    let disposed = false;
    let modelRoot: Group | null = null;
    let animationMixer: AnimationMixer | null = null;
    let hasFramedModel = false;
    let lastMovementFacingAngle = 0;
    let heroFocusNode: Object3D | null = null;
    let heroFocusOffsetY = 0;

    const updateSize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    forceViewportResizeRef.current = updateSize;
    updateSize();

    cameraBaseOffset.copy(camera.position).sub(cameraLookTarget);

    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.72;
    controls.screenSpacePanning = false;
    controls.zoomSpeed = 0.9;
    controls.minPolarAngle = Math.PI / 2.9;
    controls.maxPolarAngle = Math.PI / 1.95;
    controls.target.copy(cameraLookTarget);

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(mount);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let manualOrbitPointerId: number | null = null;
    let manualOrbitLastX = 0;
    let manualOrbitLastY = 0;

    // OrbitControls maps Shift + left-drag to pan. Pan is disabled here, so we
    // provide a small capture-phase rotate handler to keep sprint + drag usable.
    const handleManualOrbitPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !event.shiftKey) {
        return;
      }

      manualOrbitPointerId = event.pointerId;
      manualOrbitLastX = event.clientX;
      manualOrbitLastY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
      event.preventDefault();
      event.stopPropagation();
    };

    const handleManualOrbitPointerMove = (event: PointerEvent) => {
      if (manualOrbitPointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - manualOrbitLastX;
      const deltaY = event.clientY - manualOrbitLastY;
      const orbitScale = (2 * Math.PI) / Math.max(mount.clientHeight, 1);

      manualOrbitLastX = event.clientX;
      manualOrbitLastY = event.clientY;

      controls.rotateLeft(deltaX * orbitScale * controls.rotateSpeed);
      controls.rotateUp(deltaY * orbitScale * controls.rotateSpeed);
      controls.update();

      event.preventDefault();
      event.stopPropagation();
    };

    const handleManualOrbitPointerEnd = (event: PointerEvent) => {
      if (manualOrbitPointerId !== event.pointerId) {
        return;
      }

      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }

      manualOrbitPointerId = null;
      event.preventDefault();
      event.stopPropagation();
    };

    renderer.domElement.addEventListener('pointerdown', handleManualOrbitPointerDown, true);
    sceneDocument.addEventListener('pointermove', handleManualOrbitPointerMove, true);
    sceneDocument.addEventListener('pointerup', handleManualOrbitPointerEnd, true);
    sceneDocument.addEventListener('pointercancel', handleManualOrbitPointerEnd, true);

    const clampCameraTarget = () => {
      if (!hasFramedModel || !controls.enablePan) {
        return;
      }

      clampedTarget.copy(controls.target);
      clampedTarget.x = Math.min(Math.max(clampedTarget.x, panBoundsMin.x), panBoundsMax.x);
      clampedTarget.y = Math.min(Math.max(clampedTarget.y, panBoundsMin.y), panBoundsMax.y);
      clampedTarget.z = Math.min(Math.max(clampedTarget.z, panBoundsMin.z), panBoundsMax.z);

      targetDelta.copy(controls.target).sub(clampedTarget);

      if (targetDelta.lengthSq() === 0) {
        return;
      }

      controls.target.copy(clampedTarget);
      camera.position.sub(targetDelta);
    };

    const fitCameraToModel = (model: Group) => {
      const bounds = new Box3().setFromObject(model);
      const center = bounds.getCenter(tempCenter);
      const size = bounds.getSize(tempSize);
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      const targetSpan = 4.2;
      const scale = targetSpan / maxAxis;

      model.position.set(-center.x, -center.y, -center.z);
      model.scale.setScalar(scale);
      model.updateMatrixWorld(true);

      bounds.setFromObject(model);
      bounds.getSize(size);
      bounds.getCenter(center);

      model.position.x -= center.x;
      model.position.z -= center.z;
      model.position.y += 0.18 - bounds.min.y;

      model.updateMatrixWorld(true);
      bounds.setFromObject(model);
      bounds.getSize(size);
      bounds.getCenter(center);

      const fittedHeight = size.y || targetSpan;
      const fittedMaxAxis = Math.max(size.x, size.y, size.z) || targetSpan;
      const fov = (camera.fov * Math.PI) / 180;
      const distance = (fittedMaxAxis / (2 * Math.tan(fov / 2))) * 1.62;
      const lookTargetY = bounds.min.y + fittedHeight * 0.31;
      const panRangeX = Math.max(size.x * 0.2, 0.45);
      const panRangeYUp = Math.max(fittedHeight * 0.14, 0.34);
      const panRangeYDown = Math.max(fittedHeight * 0.18, 0.36);
      const panRangeZ = Math.max(fittedMaxAxis * 0.1, 0.25);
      cameraLookTarget.set(0, lookTargetY, 0);
      panBoundsMin.set(
        cameraLookTarget.x - panRangeX,
        cameraLookTarget.y - panRangeYDown,
        cameraLookTarget.z - panRangeZ,
      );
      panBoundsMax.set(
        cameraLookTarget.x + panRangeX,
        cameraLookTarget.y + panRangeYUp,
        cameraLookTarget.z + panRangeZ,
      );
      hasFramedModel = true;
      lastMovementFacingAngle = 0;
      baseModelPosition.copy(model.position);
      baseModelPosition.y += heroVerticalLift;
      model.position.y = baseModelPosition.y;
      terrainGroup.position.y = baseModelPosition.y;
      heroFocusNode = resolveHeroFocusNode(model);
      heroFocusOffsetY = cameraLookTarget.y - baseModelPosition.y;
      followedLookTarget.copy(cameraLookTarget);
      cameraBaseOffset.set(fittedMaxAxis * 0.03, fittedHeight * 0.02, distance).sub(cameraLookTarget);
      cameraOffset.copy(cameraBaseOffset);
      camera.position.copy(cameraLookTarget).add(cameraOffset);
      controls.target.copy(cameraLookTarget);
      controls.minDistance = Math.max(cameraBaseOffset.length() * 0.72, 2.4);
      controls.maxDistance = cameraBaseOffset.length() * 1.9;
      clampCameraTarget();
      controls.update();
    };

    const reframeViewport = () => {
      updateSize();

      if (!hasFramedModel || !modelRoot) {
        return;
      }

      if (heroFocusNode) {
        heroFocusNode.getWorldPosition(heroFocusPoint);
      } else {
        heroFocusPoint.set(
          modelRoot.position.x,
          modelRoot.position.y + heroFocusOffsetY,
          modelRoot.position.z,
        );
      }

      followedLookTarget.copy(heroFocusPoint);
      controls.target.copy(heroFocusPoint);
      camera.position.copy(heroFocusPoint).add(cameraBaseOffset);
      clampCameraTarget();
      controls.update();
      renderer.render(scene, camera);
    };

    const resetGame = () => {
      cleanupObstacles();
      movementOffset.set(0, 0, 0);
      lastSpawnZRef.current = 0;
      speedMultiplierRef.current = 1;
      scoreRef.current = 0;
      if (scoreElementRef.current) scoreElementRef.current.innerText = '0';
      gameStateRef.current = 'playing';
      setGameState('playing');
      recoveryModeRef.current = null;
      jumpModeRef.current = null;
      lastMovementFacingAngle = 0;
      
      if (modelRoot) {
        modelRoot.position.x = baseModelPosition.x;
        modelRoot.position.z = baseModelPosition.z;
        if (heroFocusNode) heroFocusNode.getWorldPosition(heroFocusPoint);
        controls.target.copy(heroFocusPoint);
        camera.position.copy(heroFocusPoint).add(cameraBaseOffset);
        controls.update();
      }
      syncRequestedAnimationMode();
    };
    resetGameRef.current = resetGame;

    loader.load(
      heroModelPath,
      async (gltf) => {
        if (disposed) {
          return;
        }

        const model = gltf.scene;
        model.visible = false;

        model.traverse((child) => {
          if ('isMesh' in child && child.isMesh) {
            const mesh = child as Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

            materials.forEach((material) => {
              if (material instanceof MeshStandardMaterial) {
                material.envMapIntensity = 1.1;
              }

              material.needsUpdate = true;
            });
          }
        });

        hideDuplicateAvatarVariant(model);
        applyOutfitPalette(model, outfitPaletteRef.current);
        hideAvatarAccessories(model);
        fitCameraToModel(model);
        stage.add(model);
        modelRoot = model;
        modelRootRef.current = model;

        const animationClips = await loadHeroAnimationClips(loader, gltf.animations);

        if (disposed) {
          return;
        }
        if (Object.keys(animationClips).length > 0) {
          animationMixer = new AnimationMixer(model);
          animationMixerRef.current = animationMixer;
          animationActionsRef.current = createAnimationActionMap(animationMixer, animationClips);
          hasClipAnimationRef.current = Object.keys(animationActionsRef.current).length > 0;
          animationMixer.addEventListener('finished', ({ action }) => {
            if (
              action === animationActionsRef.current.landing &&
              !landingIntroCompletedRef.current
            ) {
              landingIntroCompletedRef.current = true;
              syncRequestedAnimationMode();
              return;
            }

            if (
              action === animationActionsRef.current.forwardJump ||
              action === animationActionsRef.current.runningJump
            ) {
              jumpModeRef.current = null;
              syncRequestedAnimationMode();
              return;
            }

            if (action === animationActionsRef.current.stumbleBackward) {
              recoveryModeRef.current = animationActionsRef.current.kipUp ? 'kipUp' : null;
              syncRequestedAnimationMode();
              return;
            }

            if (action === animationActionsRef.current.kipUp) {
              recoveryModeRef.current = null;
              syncRequestedAnimationMode();
            }
          });
        }

        const hasLandingAction = Boolean(animationActionsRef.current.landing);

        if (hasLandingAction) {
          requestedAnimationModeRef.current = 'landing';
          playAnimationMode(
            animationActionsRef.current,
            'landing',
            activeAnimationModeRef,
            landingIntroCompletedRef,
            true,
          );
          animationMixerRef.current?.update(0);
          model.position.y = baseModelPosition.y + landingDropHeight;
          model.updateMatrixWorld(true);
        } else {
          landingIntroCompletedRef.current = true;
          syncRequestedAnimationMode();
          animationMixerRef.current?.update(0);
        }

        window.requestAnimationFrame(() => {
          if (disposed) {
            return;
          }

          model.visible = true;
          setStatus('ready');
          onOutfitAppliedRef.current?.();
        });
      },
      undefined,
      () => {
        if (!disposed) {
          setStatus('error');
        }
      },
    );

    forceViewportReframeRef.current = reframeViewport;

    const renderScene = () => {
      const delta = clock.getDelta();
      const isLandingIntroActive = !landingIntroCompletedRef.current;
      const touchMovement = touchMovementRef.current;
      const touchForwardPressed = touchMovement.active && touchMovement.y < -0.18;
      const touchBackwardPressed = touchMovement.active && touchMovement.y > 0.18;
      const touchTurningLeft = touchMovement.active && touchMovement.x < -0.18;
      const touchTurningRight = touchMovement.active && touchMovement.x > 0.18;
      const isForwardPressed = movementKeysRef.current.has('w') || touchForwardPressed;
      const isBackwardPressed = movementKeysRef.current.has('s') || touchBackwardPressed;
      const isRecoveryActive = Boolean(recoveryModeRef.current);
      const isTurningLeft = movementKeysRef.current.has('a') || touchTurningLeft;
      const isTurningRight = movementKeysRef.current.has('d') || touchTurningRight;
      const shouldMoveBackward = isBackwardPressed;
      const shouldMoveForward = isForwardPressed && !shouldMoveBackward;
      const isMoving = !isLandingIntroActive && !isRecoveryActive && (shouldMoveForward || shouldMoveBackward);
      const isRunningForward =
        shouldMoveForward &&
        (sprintPressedRef.current || (touchForwardPressed && touchMovement.magnitude > 0.8));
      const isRunningBackward =
        shouldMoveBackward &&
        (sprintPressedRef.current || (touchBackwardPressed && touchMovement.magnitude > 0.8));

      controls.autoRotate = false;

      if (animationMixer) {
        animationMixer.update(delta);
      }

      if (modelRoot) {
        if (!isLandingIntroActive && !isRecoveryActive && isTurningLeft !== isTurningRight) {
          const turnIntensity =
            movementKeysRef.current.has('a') || movementKeysRef.current.has('d')
              ? 1
              : Math.max(0.45, Math.abs(touchMovement.x));

          controls.rotateLeft((isTurningLeft ? -1 : 1) * turnSpeed * 0.42 * turnIntensity * delta);
          controls.update();
        }

        cameraFacingDirection.copy(controls.target).sub(camera.position);
        cameraFacingDirection.y = 0;

        if (cameraFacingDirection.lengthSq() > 0.0001) {
          cameraFacingDirection.normalize();
        } else {
          cameraFacingDirection.set(0, 0, -1);
        }

        if (isMoving) {
          movementDirection.copy(cameraFacingDirection);

          if (shouldMoveBackward) {
            movementDirection.multiplyScalar(-1);
          }

          const movementSpeed = shouldMoveForward
            ? isRunningForward
              ? runSpeed
              : walkSpeed
            : isRunningBackward
              ? runSpeed * 0.82
              : backwardSpeed;
          const movementIntensity =
            movementKeysRef.current.has('w') || movementKeysRef.current.has('s')
              ? 1
              : shouldMoveForward
                ? Math.max(0.5, Math.min(1, -touchMovement.y))
                : Math.max(0.45, Math.min(0.9, touchMovement.y));

          movementStep
            .copy(movementDirection)
            .multiplyScalar((shouldMoveForward ? 1 : -1) * movementSpeed * movementIntensity * delta);
          movementOffset.add(movementStep);
        }

        const landingAction = animationActionsRef.current.landing;
        const landingProgress =
          isLandingIntroActive && landingAction
            ? Math.min(1, landingAction.time / Math.max(landingAction.getClip().duration, 0.0001))
            : 1;
        const landingLift = isLandingIntroActive ? (1 - landingProgress) ** 2 * landingDropHeight : 0;

        if (isMoving) {
          lastMovementFacingAngle = Math.atan2(movementDirection.x, movementDirection.z);
        }

        const targetFacing = lastMovementFacingAngle;
        modelRoot.rotation.y = easeAngle(
          modelRoot.rotation.y,
          targetFacing,
          Math.min(1, delta * (isLandingIntroActive ? 4 : 10)),
        );

        let targetGroundY = baseModelPosition.y;
        const playerRadius = 0.35;
        const cubeHalfSize = 0.6;
        const cubeTop = baseModelPosition.y + 1.2;
        const visualFeetY = heroFocusNode ? heroFocusPoint.y - 0.9 : modelRoot.position.y;

        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
          const obs = obstaclesRef.current[i];

          if (gameStateRef.current === 'playing' && obs.position.z > baseModelPosition.z + movementOffset.z + 5) {
            stage.remove(obs);
            obstaclesRef.current.splice(i, 1);
            continue;
          }

          const dx = (baseModelPosition.x + movementOffset.x) - obs.position.x;
          const dz = (baseModelPosition.z + movementOffset.z) - obs.position.z;

          const overlapX = (playerRadius + cubeHalfSize) - Math.abs(dx);
          const overlapZ = (playerRadius + cubeHalfSize) - Math.abs(dz);

          if (overlapX > 0 && overlapZ > 0) {
            if (visualFeetY >= cubeTop - 0.6) {
              targetGroundY = Math.max(targetGroundY, cubeTop);
            } else {
              if (overlapX < overlapZ) {
                movementOffset.x += Math.sign(dx) * overlapX;
              } else {
                movementOffset.z += Math.sign(dz) * overlapZ;
              }
            }
          }
        }

        modelRoot.position.x = baseModelPosition.x + movementOffset.x;
        modelRoot.position.z = baseModelPosition.z + movementOffset.z;

        if (isLandingIntroActive) {
          modelRoot.position.y = baseModelPosition.y + landingLift;
        } else {
          const yDiff = targetGroundY - modelRoot.position.y;
          if (Math.abs(yDiff) > 0.01) {
            modelRoot.position.y += Math.sign(yDiff) * Math.min(Math.abs(yDiff), delta * 8);
          } else {
            modelRoot.position.y = targetGroundY;
          }
        }

        if (heroFocusNode) {
          heroFocusNode.getWorldPosition(heroFocusPoint);
        } else {
          heroFocusPoint.set(
            modelRoot.position.x,
            modelRoot.position.y + heroFocusOffsetY,
            modelRoot.position.z,
          );
        }

        followedLookTarget.lerp(heroFocusPoint, Math.min(1, delta * 8));
        targetDelta.copy(followedLookTarget).sub(controls.target);

        if (targetDelta.lengthSq() > 0) {
          camera.position.add(targetDelta);
          controls.target.copy(followedLookTarget);
        }
      }

      if (gameStateRef.current === 'playing' && modelRoot) {
        const currentZ = modelRoot.position.z;
        
        if (currentZ < lastSpawnZRef.current - 15) {
          spawnObstacle(lastSpawnZRef.current - 40);
          lastSpawnZRef.current -= 15;
        }

        const newScore = Math.floor(-currentZ / 2);
        if (newScore > scoreRef.current) {
          scoreRef.current = newScore;
          if (scoreElementRef.current) scoreElementRef.current.innerText = newScore.toString();
        }
      }

      controls.update();
      clampCameraTarget();

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(renderScene);
      }
    };

    renderScene();

    return () => {
      disposed = true;

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      renderer.domElement.removeEventListener('pointerdown', handleManualOrbitPointerDown, true);
      sceneDocument.removeEventListener('pointermove', handleManualOrbitPointerMove, true);
      sceneDocument.removeEventListener('pointerup', handleManualOrbitPointerEnd, true);
      sceneDocument.removeEventListener('pointercancel', handleManualOrbitPointerEnd, true);
      resizeObserver.disconnect();
      controls.dispose();

      if (animationMixer && modelRoot) {
        animationMixer.stopAllAction();
        animationMixer.uncacheRoot(modelRoot);
      }

      if (modelRoot) {
        modelRoot.traverse((child) => {
          if ('isMesh' in child && child.isMesh) {
            const mesh = child as Mesh;
            mesh.geometry.dispose();
            disposeMaterial(mesh.material);
          }
        });
      }

      cleanupObstacles();
      obstacleGeo.dispose();
      obstacleMat.dispose();
      terrainGroup.traverse((child) => {
        if ('isMesh' in child && child.isMesh) {
          const mesh = child as Mesh;
          mesh.geometry.dispose();
          disposeMaterial(mesh.material);
        }
      });
      renderer.dispose();
      forceViewportResizeRef.current = null;
      forceViewportReframeRef.current = null;
      modelRootRef.current = null;
      animationMixerRef.current = null;
      animationActionsRef.current = {};
      activeAnimationModeRef.current = null;
      hasClipAnimationRef.current = false;
      landingIntroCompletedRef.current = false;
      movementKeysRef.current.clear();
      sprintPressedRef.current = false;
      jumpHeldRef.current = false;
      jumpModeRef.current = null;
      recoveryModeRef.current = null;

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="scene-canvas" ref={mountRef} aria-hidden="true">
      {status === 'loading' ? (
        <div className="scene-overlay">
          <div className="scene-loader" aria-hidden="true">
            <span className="scene-loader__ring scene-loader__ring--outer" />
            <span className="scene-loader__ring scene-loader__ring--inner" />
            <span className="scene-loader__core" />
          </div>
          <div className="scene-overlay__copy">
            <strong>{labels.loading}</strong>
          </div>
        </div>
      ) : null}
      {status !== 'loading' && isOutfitTransitioning ? (
        <div className="scene-overlay scene-overlay--tailor">
          <div className="scene-loader" aria-hidden="true">
            <span className="scene-loader__ring scene-loader__ring--outer" />
            <span className="scene-loader__ring scene-loader__ring--inner" />
            <span className="scene-loader__core" />
          </div>
          <div className="scene-overlay__copy">
            <strong>{labels.tailoringTitle}</strong>
            <span>{labels.tailoringText}</span>
          </div>
        </div>
      ) : null}
      {status === 'ready' && !isOutfitTransitioning && gameState === 'idle' && controlHintCopy ? (
        <div className="scene-control-hint" aria-live="polite">
          <strong>{controlHintCopy.title}</strong>
          <span>{controlHintCopy.text}</span>
        </div>
      ) : null}
      {status === 'ready' && !isOutfitTransitioning ? (
        <div className="scene-mobile-controls">
          <div className="scene-mobile-controls__group scene-mobile-controls__group--move">
            <span className="scene-mobile-controls__label">Move</span>
            <div
              ref={joystickRef}
              className={`scene-joystick ${mobileJoystickState.active ? 'is-active' : ''}`}
              onPointerDown={handleJoystickPointerDown}
              onPointerMove={handleJoystickPointerMove}
              onPointerUp={handleJoystickPointerEnd}
              onPointerCancel={handleJoystickPointerEnd}
              aria-label="Movement joystick"
              role="application"
            >
              <span className="scene-joystick__base" />
              <span className="scene-joystick__crosshair" />
              <span
                className="scene-joystick__thumb"
                style={{
                  transform: `translate(${mobileJoystickState.x * 1.9}rem, ${mobileJoystickState.y * 1.9}rem)`,
                }}
              />
            </div>
          </div>
          <div className="scene-mobile-controls__group scene-mobile-controls__group--jump">
            <span className="scene-mobile-controls__label">Jump</span>
            <button
              type="button"
              className={`scene-mobile-jump ${mobileJumpActive ? 'is-active' : ''}`}
              onPointerDown={handleMobileJumpPress}
              onPointerUp={handleMobileJumpRelease}
              onPointerCancel={handleMobileJumpRelease}
              onPointerLeave={handleMobileJumpRelease}
              aria-label="Jump"
            >
              <span className="scene-mobile-jump__icon" aria-hidden="true">
                ^
              </span>
              <span className="scene-mobile-jump__text">Jump</span>
            </button>
          </div>
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="scene-status scene-status--error">{labels.error}</div>
      ) : null}
    </div>
  );
}
