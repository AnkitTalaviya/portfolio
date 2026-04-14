import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { Document, NodeIO } from '@gltf-transform/core';
import { prune, resample } from '@gltf-transform/functions';

const projectRoot = process.cwd();
const modelOutputDir = resolve(projectRoot, 'public/models');
const baseModelPath = resolve(modelOutputDir, 'Landing.glb');
const animationPackPath = resolve(modelOutputDir, 'HeroAnimations.glb');
const sourceModelDir = resolve(projectRoot, 'tools/source-models/hero');

const animationSources = [
  {
    mode: 'walking',
    file: 'Walking.glb',
    aliases: ['walking', 'walk', 'locomotion', 'move'],
  },
  {
    mode: 'running',
    file: 'Running.glb',
    aliases: ['running', 'run', 'sprint', 'jog'],
  },
  {
    mode: 'walkingBackward',
    file: 'Walking Backwards.glb',
    aliases: ['walkingbackwards', 'walkbackwards', 'walkbackward', 'backward'],
  },
  {
    mode: 'forwardJump',
    file: 'Forward Jump.glb',
    aliases: ['forwardjump', 'jump', 'hop'],
  },
  {
    mode: 'runningJump',
    file: 'Running Jump.glb',
    aliases: ['runningjump', 'runjump', 'jump'],
  },
  {
    mode: 'stumbleBackward',
    file: 'Stumble Backwards.glb',
    aliases: ['stumblebackwards', 'stumblebackward', 'stumble', 'fallback'],
  },
  {
    mode: 'kipUp',
    file: 'Kip Up.glb',
    aliases: ['kipup', 'standup', 'getup', 'recover'],
  },
];

function normalizeAnimationName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function resolveAnimation(doc, aliases) {
  const normalizedAliases = aliases.map(normalizeAnimationName);
  const animations = doc.getRoot().listAnimations();

  return (
    animations.find((animation) => {
      const animationName = normalizeAnimationName(animation.getName());
      return normalizedAliases.some((alias) => animationName.includes(alias));
    }) ?? animations[animations.length - 1] ?? null
  );
}

function assertUniqueNodeNames(doc, label) {
  const seenNames = new Set();

  doc.getRoot()
    .listNodes()
    .forEach((node) => {
      const name = node.getName();
      if (!name) {
        throw new Error(`${label} contains unnamed nodes and cannot be packed safely.`);
      }

      if (seenNames.has(name)) {
        throw new Error(`${label} contains duplicate node name "${name}".`);
      }

      seenNames.add(name);
    });
}

function assertCompatibleRig(baseDoc, sourceDoc, fileName) {
  const baseNames = new Set(baseDoc.getRoot().listNodes().map((node) => node.getName()));
  const sourceNames = new Set(sourceDoc.getRoot().listNodes().map((node) => node.getName()));

  if (baseNames.size !== sourceNames.size) {
    throw new Error(
      `${fileName} is using a different rig size (${sourceNames.size}) than the base model (${baseNames.size}).`,
    );
  }

  sourceNames.forEach((name) => {
    if (!baseNames.has(name)) {
      throw new Error(`${fileName} contains rig node "${name}" that is not present in Landing.glb.`);
    }
  });
}

function cloneTypedArray(array) {
  return new array.constructor(array);
}

function cloneAccessor(targetDoc, targetBuffer, accessor, name) {
  const array = accessor.getArray();
  if (!array) {
    throw new Error(`Accessor "${name}" has no array data.`);
  }

  return targetDoc
    .createAccessor(name, targetBuffer)
    .setType(accessor.getType())
    .setArray(cloneTypedArray(array))
    .setNormalized(accessor.getNormalized());
}

function copyNodeHierarchy(baseDoc, targetDoc) {
  const nodeMap = new Map();
  const baseNodes = baseDoc.getRoot().listNodes();

  baseNodes.forEach((baseNode) => {
    const copiedNode = targetDoc.createNode(baseNode.getName());
    copiedNode
      .setTranslation([...baseNode.getTranslation()])
      .setRotation([...baseNode.getRotation()])
      .setScale([...baseNode.getScale()]);

    const weights = baseNode.getWeights();
    if (weights.length) {
      copiedNode.setWeights([...weights]);
    }

    nodeMap.set(baseNode.getName(), copiedNode);
  });

  baseNodes.forEach((baseNode) => {
    const copiedNode = nodeMap.get(baseNode.getName());
    baseNode.listChildren().forEach((childNode) => {
      copiedNode.addChild(nodeMap.get(childNode.getName()));
    });
  });

  const baseScene = baseDoc.getRoot().getDefaultScene() ?? baseDoc.getRoot().listScenes()[0];
  const scene = targetDoc.createScene('HeroAnimationRig');

  baseScene.listChildren().forEach((childNode) => {
    scene.addChild(nodeMap.get(childNode.getName()));
  });

  targetDoc.getRoot().setDefaultScene(scene);

  return nodeMap;
}

async function buildAnimationPack() {
  const io = new NodeIO();
  const baseDoc = await io.read(baseModelPath);

  assertUniqueNodeNames(baseDoc, 'Landing.glb');

  const packDoc = new Document();
  packDoc.getRoot().getAsset().generator = 'portfolio hero animation packer';

  const packBuffer = packDoc.createBuffer('hero-animation-buffer');
  const packNodes = copyNodeHierarchy(baseDoc, packDoc);

  for (const source of animationSources) {
    const sourcePath = resolve(sourceModelDir, source.file);
    const sourceDoc = await io.read(sourcePath);

    assertUniqueNodeNames(sourceDoc, source.file);
    assertCompatibleRig(baseDoc, sourceDoc, source.file);

    const animation = resolveAnimation(sourceDoc, source.aliases);
    if (!animation) {
      throw new Error(`Could not resolve an animation clip from ${source.file}.`);
    }

    const packAnimation = packDoc.createAnimation(source.mode);

    animation.listChannels().forEach((channel, channelIndex) => {
      const sampler = channel.getSampler();
      const input = sampler?.getInput();
      const output = sampler?.getOutput();
      const targetPath = channel.getTargetPath();
      const sourceTargetNode = channel.getTargetNode();

      if (!sampler || !input || !output || !targetPath || !sourceTargetNode) {
        throw new Error(`${source.file} contains an incomplete animation channel.`);
      }

      const targetNode = packNodes.get(sourceTargetNode.getName());
      if (!targetNode) {
        throw new Error(
          `${source.file} targets node "${sourceTargetNode.getName()}" that is not present in the pack rig.`,
        );
      }

      const packSampler = packDoc
        .createAnimationSampler(`${source.mode}-${channelIndex}`)
        .setInterpolation(sampler.getInterpolation())
        .setInput(
          cloneAccessor(
            packDoc,
            packBuffer,
            input,
            `${source.mode}-${channelIndex}-input`,
          ),
        )
        .setOutput(
          cloneAccessor(
            packDoc,
            packBuffer,
            output,
            `${source.mode}-${channelIndex}-output`,
          ),
        );

      const packChannel = packDoc
        .createAnimationChannel(`${source.mode}-${channelIndex}`)
        .setTargetNode(targetNode)
        .setTargetPath(targetPath)
        .setSampler(packSampler);

      packAnimation.addSampler(packSampler).addChannel(packChannel);
    });
  }

  await packDoc.transform(resample(), prune());

  await mkdir(dirname(animationPackPath), { recursive: true });
  await io.write(animationPackPath, packDoc);
}

await buildAnimationPack();
