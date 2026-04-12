import {
  type ChangeEvent,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  createSeedRecords,
  generateRandomRecords,
  generatorSizePresets,
  ownerOptions,
  pageSizeOptions,
  priorityOptions,
  regionOptions,
  sourceOptions,
  statusOptions,
  type CrudPriority,
  type CrudRecord,
  type CrudSession,
  type CrudStatus,
  workspaceCredentials,
  workspaceSession,
} from './crudWorkspaceData';

type SortMode = 'updated-desc' | 'name-asc' | 'value-desc' | 'contact-asc';
type ViewMode = 'table' | 'cards';
type ToastTone = 'success' | 'info' | 'danger';
type ThemeMode = 'dark' | 'light';

type ToastState = {
  tone: ToastTone;
  message: string;
};

type DraftState = {
  name: string;
  email: string;
  company: string;
  title: string;
  status: CrudStatus;
  priority: CrudPriority;
  owner: string;
  region: string;
  source: string;
  value: string;
  nextAction: string;
  notes: string;
  tags: string;
};

const recordStorageKey = 'crud-workspace-records';
const sessionStorageKey = 'crud-workspace-session';
const viewStorageKey = 'crud-workspace-view';
const pageSizeStorageKey = 'crud-workspace-page-size';
const themeStorageKey = 'crud-workspace-theme';

const statusLabels: Record<CrudStatus, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  customer: 'Customer',
  inactive: 'Inactive',
};

const priorityLabels: Record<CrudPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

const blankDraft = (): DraftState => ({
  name: '',
  email: '',
  company: '',
  title: '',
  status: 'lead',
  priority: 'medium',
  owner: ownerOptions[0],
  region: regionOptions[0],
  source: sourceOptions[0],
  value: '4500',
  nextAction: 'Schedule product walkthrough',
  notes: '',
  tags: 'stakeholder-review, needs-follow-up',
});

const safeJsonParse = <T,>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const readStoredSession = (): CrudSession | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedSession =
    safeJsonParse<CrudSession>(window.localStorage.getItem(sessionStorageKey)) ??
    safeJsonParse<CrudSession>(window.sessionStorage.getItem(sessionStorageKey));

  return storedSession?.email === workspaceSession.email ? storedSession : null;
};

const readStoredRecords = (): CrudRecord[] => {
  if (typeof window === 'undefined') {
    return createSeedRecords();
  }

  return safeJsonParse<CrudRecord[]>(window.localStorage.getItem(recordStorageKey)) ?? createSeedRecords();
};

const readStoredView = (): ViewMode => {
  if (typeof window === 'undefined') {
    return 'table';
  }

  const storedView = window.localStorage.getItem(viewStorageKey);
  return storedView === 'cards' ? 'cards' : 'table';
};

const readStoredPageSize = (): number => {
  if (typeof window === 'undefined') {
    return 25;
  }

  const storedValue = Number(window.localStorage.getItem(pageSizeStorageKey));
  return pageSizeOptions.includes(storedValue as (typeof pageSizeOptions)[number]) ? storedValue : 25;
};

const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.localStorage.getItem(themeStorageKey) === 'light' ? 'light' : 'dark';
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));

const sortRecords = (records: CrudRecord[], sortMode: SortMode) => {
  const next = [...records];

  switch (sortMode) {
    case 'name-asc':
      return next.sort((left, right) => left.name.localeCompare(right.name));
    case 'value-desc':
      return next.sort((left, right) => right.value - left.value);
    case 'contact-asc':
      return next.sort(
        (left, right) =>
          new Date(left.lastContact).getTime() - new Date(right.lastContact).getTime(),
      );
    case 'updated-desc':
    default:
      return next.sort(
        (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
      );
  }
};

const normalizeRecord = (value: Partial<CrudRecord>): CrudRecord | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const status = statusOptions.includes(value.status as CrudStatus)
    ? (value.status as CrudStatus)
    : 'lead';
  const priority = priorityOptions.includes(value.priority as CrudPriority)
    ? (value.priority as CrudPriority)
    : 'medium';

  return {
    id:
      typeof value.id === 'string' && value.id.length > 0
        ? value.id
        : `import_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    name: typeof value.name === 'string' ? value.name : 'Imported Record',
    email: typeof value.email === 'string' ? value.email : 'imported@example.com',
    company: typeof value.company === 'string' ? value.company : 'Imported Company',
    title: typeof value.title === 'string' ? value.title : 'Imported Contact',
    status,
    priority,
    owner:
      typeof value.owner === 'string' && value.owner.length > 0 ? value.owner : ownerOptions[0],
    region:
      typeof value.region === 'string' && value.region.length > 0 ? value.region : regionOptions[0],
    source:
      typeof value.source === 'string' && value.source.length > 0 ? value.source : sourceOptions[0],
    value: typeof value.value === 'number' && Number.isFinite(value.value) ? value.value : 0,
    lastContact:
      typeof value.lastContact === 'string' ? value.lastContact : new Date().toISOString(),
    nextAction:
      typeof value.nextAction === 'string' && value.nextAction.length > 0
        ? value.nextAction
        : 'Review imported record',
    notes: typeof value.notes === 'string' ? value.notes : 'Imported from JSON file.',
    tags: Array.isArray(value.tags) ? value.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    createdAt: typeof value.createdAt === 'string' ? value.createdAt : new Date().toISOString(),
    updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : new Date().toISOString(),
  };
};

function CrudWorkspaceApp() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastSelectionAnchorRef = useRef<string | null>(null);
  const [session, setSession] = useState<CrudSession | null>(readStoredSession);
  const [records, setRecords] = useState<CrudRecord[]>(readStoredRecords);
  const [viewMode, setViewMode] = useState<ViewMode>(readStoredView);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CrudStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | CrudPriority>('all');
  const [sortMode, setSortMode] = useState<SortMode>('updated-desc');
  const [pageSize, setPageSize] = useState<number>(readStoredPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeRecordId, setActiveRecordId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftState>(blankDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  );
  const [generatorCount, setGeneratorCount] = useState<number>(200);
  const [generatorStatus, setGeneratorStatus] = useState<'mixed' | CrudStatus>('mixed');
  const [generatorMode, setGeneratorMode] = useState<'append' | 'replace'>('append');
  const [loginUsername, setLoginUsername] = useState(workspaceCredentials.username);
  const [loginPassword, setLoginPassword] = useState(workspaceCredentials.password);
  const [rememberSession, setRememberSession] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState<ToastState | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(readStoredTheme);

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const matchesSearch =
          searchTerm.trim().length === 0 ||
          [record.name, record.email, record.company, record.title, record.owner, record.notes, ...record.tags]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || record.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      }),
    [priorityFilter, records, searchTerm, statusFilter],
  );

  const sortedRecords = useMemo(() => sortRecords(filteredRecords, sortMode), [filteredRecords, sortMode]);
  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const pageRecords = useMemo(
    () => sortedRecords.slice(pageStart, pageStart + pageSize),
    [pageSize, pageStart, sortedRecords],
  );
  const visibleRecordIds = useMemo(() => pageRecords.map((record) => record.id), [pageRecords]);
  const activeRecord = useMemo(
    () =>
      records.find((record) => record.id === activeRecordId) ??
      pageRecords[0] ??
      records[0] ??
      null,
    [activeRecordId, pageRecords, records],
  );
  const pipelineValue = useMemo(
    () =>
      records
        .filter((record) => record.status !== 'inactive')
        .reduce((total, record) => total + record.value, 0),
    [records],
  );
  const highPriorityCount = useMemo(
    () => records.filter((record) => record.priority === 'high').length,
    [records],
  );
  const overdueCount = useMemo(
    () =>
      records.filter((record) => {
        const daysSinceContact =
          (Date.now() - new Date(record.lastContact).getTime()) / (1000 * 60 * 60 * 24);

        return daysSinceContact > 12 && record.status !== 'customer';
      }).length,
    [records],
  );
  const recentRecords = useMemo(() => sortRecords(records, 'updated-desc').slice(0, 4), [records]);
  const generatedTotalPreview = generatorMode === 'replace' ? generatorCount : records.length + generatorCount;
  const generatedPagePreview = Math.max(1, Math.ceil(generatedTotalPreview / pageSize));
  const isTabletViewport = viewportWidth <= 1180;
  const isCompactViewport = viewportWidth <= 860;
  const activeViewMode: ViewMode = isCompactViewport ? 'cards' : viewMode;

  useEffect(() => {
    window.localStorage.setItem(recordStorageKey, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    window.localStorage.setItem(viewStorageKey, viewMode);
  }, [viewMode]);

  useEffect(() => {
    window.localStorage.setItem(pageSizeStorageKey, String(pageSize));
  }, [pageSize]);

  useEffect(() => {
    window.localStorage.setItem(themeStorageKey, theme);
    document.body.dataset.crudTheme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    if (!session) {
      window.localStorage.removeItem(sessionStorageKey);
      window.sessionStorage.removeItem(sessionStorageKey);
      return;
    }

    const storage = rememberSession ? window.localStorage : window.sessionStorage;
    const staleStorage = rememberSession ? window.sessionStorage : window.localStorage;
    storage.setItem(sessionStorageKey, JSON.stringify(session));
    staleStorage.removeItem(sessionStorageKey);
  }, [rememberSession, session]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (activeRecordId && records.some((record) => record.id === activeRecordId)) {
      return;
    }

    setActiveRecordId(records[0]?.id ?? null);
  }, [activeRecordId, records]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);

      if (window.innerWidth > 1180) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isTabletViewport && isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen, isTabletViewport]);

  useEffect(() => {
    if (!isSidebarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  const showToast = (message: string, tone: ToastTone = 'success') => {
    setToast({ message, tone });
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openGeneratorPanel = () => {
    setIsSidebarOpen(false);
    setIsGeneratorOpen(true);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const clearSelection = (shouldToast = false) => {
    setSelectedIds([]);
    lastSelectionAnchorRef.current = null;

    if (shouldToast) {
      showToast('Selection cleared.', 'info');
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSortMode('updated-desc');
    setCurrentPage(1);
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedUsername = loginUsername.trim().toLowerCase();

    if (
      normalizedUsername !== workspaceCredentials.username.toLowerCase() ||
      loginPassword !== workspaceCredentials.password
    ) {
      setLoginError('Enter the provisioned workspace username and password.');
      return;
    }

    setSession(workspaceSession);
    setLoginError('');
    showToast('Workspace unlocked.', 'success');
  };

  const handleLogout = () => {
    setSession(null);
    setIsSidebarOpen(false);
    clearSelection();
    showToast('Session closed.', 'info');
  };

  const openCreateRecord = () => {
    setDraft(blankDraft());
    setEditingId(null);
    setFormError('');
    setIsEditorOpen(true);
  };

  const openEditRecord = (record: CrudRecord) => {
    setDraft({
      name: record.name,
      email: record.email,
      company: record.company,
      title: record.title,
      status: record.status,
      priority: record.priority,
      owner: record.owner,
      region: record.region,
      source: record.source,
      value: String(record.value),
      nextAction: record.nextAction,
      notes: record.notes,
      tags: record.tags.join(', '),
    });
    setEditingId(record.id);
    setFormError('');
    setIsEditorOpen(true);
  };

  const handleDraftChange = <K extends keyof DraftState>(field: K, value: DraftState[K]) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleDraftSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.name.trim() || !draft.company.trim() || !draft.email.trim() || !draft.title.trim()) {
      setFormError('Name, email, company, and title are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(draft.email)) {
      setFormError('Enter a valid email address for the record.');
      return;
    }

    const value = Number(draft.value);
    if (!Number.isFinite(value) || value < 0) {
      setFormError('Value must be a valid positive number.');
      return;
    }

    const nextRecord: CrudRecord = {
      id: editingId ?? `record_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      name: draft.name.trim(),
      email: draft.email.trim(),
      company: draft.company.trim(),
      title: draft.title.trim(),
      status: draft.status,
      priority: draft.priority,
      owner: draft.owner.trim(),
      region: draft.region,
      source: draft.source,
      value,
      lastContact: editingId
        ? records.find((record) => record.id === editingId)?.lastContact ?? new Date().toISOString()
        : new Date().toISOString(),
      nextAction: draft.nextAction.trim(),
      notes: draft.notes.trim(),
      tags: draft.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt:
        records.find((record) => record.id === editingId)?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRecords((current) => {
      if (!editingId) {
        return [nextRecord, ...current];
      }

      return current.map((record) => (record.id === editingId ? nextRecord : record));
    });

    setActiveRecordId(nextRecord.id);
    setIsEditorOpen(false);
    setEditingId(null);
    setFormError('');
    showToast(editingId ? 'Record updated.' : 'Record created.', 'success');
  };

  const handleDeleteRecord = (recordId: string) => {
    setRecords((current) => current.filter((record) => record.id !== recordId));
    setSelectedIds((current) => current.filter((selectedId) => selectedId !== recordId));
    if (lastSelectionAnchorRef.current === recordId) {
      lastSelectionAnchorRef.current = null;
    }
    showToast('Record deleted.', 'danger');
  };

  const toggleRecordSelection = (recordId: string, shiftKey = false) => {
    const anchorId = lastSelectionAnchorRef.current;
    const rangeIds =
      shiftKey && anchorId && visibleRecordIds.includes(anchorId) && visibleRecordIds.includes(recordId)
        ? visibleRecordIds.slice(
            Math.min(visibleRecordIds.indexOf(anchorId), visibleRecordIds.indexOf(recordId)),
            Math.max(visibleRecordIds.indexOf(anchorId), visibleRecordIds.indexOf(recordId)) + 1,
          )
        : [recordId];

    setSelectedIds((current) => {
      const next = new Set(current);
      const shouldSelect = !current.includes(recordId);

      rangeIds.forEach((id) => {
        if (shouldSelect) {
          next.add(id);
          return;
        }

        next.delete(id);
      });

      return Array.from(next);
    });

    lastSelectionAnchorRef.current = recordId;
  };

  const togglePageSelection = () => {
    const pageIds = pageRecords.map((record) => record.id);
    const allSelected = pageIds.every((recordId) => selectedIds.includes(recordId));

    setSelectedIds((current) => {
      if (allSelected) {
        return current.filter((recordId) => !pageIds.includes(recordId));
      }

      return Array.from(new Set([...current, ...pageIds]));
    });

    lastSelectionAnchorRef.current = pageIds[0] ?? null;
  };

  const handleRecordCheckboxClick = (
    event: ReactMouseEvent<HTMLInputElement>,
    recordId: string,
  ) => {
    event.stopPropagation();
    toggleRecordSelection(recordId, event.shiftKey);
  };

  const archiveSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setRecords((current) =>
      current.map((record) =>
        selectedIds.includes(record.id)
          ? { ...record, status: 'inactive', updatedAt: new Date().toISOString() }
          : record,
      ),
    );
    clearSelection();
    showToast('Selected records moved to inactive.', 'info');
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setRecords((current) => current.filter((record) => !selectedIds.includes(record.id)));
    clearSelection();
    showToast('Selected records deleted.', 'danger');
  };

  const handleGenerateRecords = () => {
    if (!Number.isFinite(generatorCount) || generatorCount < 1 || generatorCount > 10000) {
      showToast('Choose a generation size between 1 and 10,000 records.', 'danger');
      return;
    }

    const overrideStatus = generatorStatus === 'mixed' ? {} : { status: generatorStatus };
    const generatedRecords = generateRandomRecords(generatorCount, overrideStatus);

    setRecords((current) =>
      generatorMode === 'replace' ? generatedRecords : [...generatedRecords, ...current],
    );
    clearSelection();
    setActiveRecordId(generatedRecords[0]?.id ?? null);
    setIsGeneratorOpen(false);
    showToast(
      generatorMode === 'replace'
        ? 'Workspace replaced with fresh generated records.'
        : `${generatorCount} random records added.`,
      'success',
    );
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'react-crud-workspace-data.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('JSON export downloaded.', 'info');
  };

  const handleImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const raw = await file.text();
    const parsed = safeJsonParse<unknown>(raw);

    if (!Array.isArray(parsed)) {
      showToast('Import failed. Expected an array of records.', 'danger');
      event.target.value = '';
      return;
    }

    const normalized = parsed
      .map((item) => normalizeRecord(item as Partial<CrudRecord>))
      .filter((item): item is CrudRecord => item !== null);

    if (normalized.length === 0) {
      showToast('No usable records were found in the selected file.', 'danger');
      event.target.value = '';
      return;
    }

    setRecords((current) => [...normalized, ...current]);
    setActiveRecordId(normalized[0].id);
    showToast(`${normalized.length} records imported from JSON.`, 'success');
    event.target.value = '';
  };

  const resetWorkspace = () => {
    const seeded = createSeedRecords();
    setRecords(seeded);
    clearSelection();
    setActiveRecordId(seeded[0]?.id ?? null);
    resetFilters();
    showToast('Workspace reset to the seeded records.', 'info');
  };

  const themeToggleLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
  const themeToggleAriaLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  const renderThemeToggle = (className = '') => (
    <button
      className={`crud-theme-toggle ${className}`.trim()}
      type="button"
      aria-label={themeToggleAriaLabel}
      onClick={toggleTheme}
      data-theme={theme}
    >
      <span className="crud-theme-toggle__icon" aria-hidden="true">
        <span className="crud-theme-toggle__ring" />
        <span className="crud-theme-toggle__core" />
        <span className="crud-theme-toggle__spark crud-theme-toggle__spark--one" />
        <span className="crud-theme-toggle__spark crud-theme-toggle__spark--two" />
      </span>
      <span className="crud-theme-toggle__label">{themeToggleLabel}</span>
    </button>
  );

  if (!session) {
    return (
      <div className="crud-login-shell">
        <section className="crud-login-card crud-login-panel">
          <div className="crud-login-header">
            <div className="crud-login-header__bar">
              <span className="crud-kicker">Cobalt Desk</span>
              {renderThemeToggle('crud-theme-toggle--compact')}
            </div>
            <h1>Sign in to the workspace</h1>
            <p className="crud-login-helper">
              Use the provisioned account to access records, filters, and workspace controls.
            </p>
          </div>

          <form className="crud-login-form" onSubmit={handleLoginSubmit}>
            <label className="crud-field">
              <span>Username</span>
              <input
                autoComplete="username"
                value={loginUsername}
                onChange={(event) => setLoginUsername(event.target.value)}
                placeholder={workspaceCredentials.username}
              />
            </label>

            <label className="crud-field">
              <span>Password</span>
              <input
                autoComplete="current-password"
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                placeholder={workspaceCredentials.password}
              />
            </label>

            <label className="crud-checkbox">
              <input
                type="checkbox"
                checked={rememberSession}
                onChange={(event) => setRememberSession(event.target.checked)}
              />
              <span>Keep this workspace signed in on this browser.</span>
            </label>

            {loginError ? <p className="crud-form-error">{loginError}</p> : null}

            <div className="crud-login-actions">
              <button className="crud-button crud-button--primary" type="submit">
                Enter workspace
              </button>
            </div>
          </form>

          <div className="crud-login-meta" aria-label="Workspace access details">
            <span>{workspaceCredentials.email}</span>
            <span>{rememberSession ? 'Session will be remembered.' : 'Session will stay active for this tab only.'}</span>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={`crud-shell ${isSidebarOpen ? 'is-sidebar-open' : ''}`}>
      <aside
        className={`crud-sidebar ${isSidebarOpen ? 'is-open' : ''}`}
        id="crud-sidebar"
        aria-label="Workspace navigation"
      >
        <div className="crud-sidebar__mobile-head">
          <span className="crud-kicker">Workspace menu</span>
          <button
            className="crud-menu-button crud-menu-button--close"
            type="button"
            aria-label="Close workspace menu"
            onClick={closeSidebar}
          >
            <span className="crud-close-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        <div className="crud-sidebar__brand">
          <span className="crud-kicker">React CRUD workspace</span>
          <h1>Cobalt Desk</h1>
          <p>CRM workspace built with React, TypeScript, and local-first state.</p>
        </div>

        <nav className="crud-sidebar__nav" aria-label="Workspace sections">
          <a href="#overview" onClick={closeSidebar}>
            Overview
          </a>
          <a href="#records" onClick={closeSidebar}>
            Records
          </a>
          <a href="#inspector" onClick={closeSidebar}>
            Inspector
          </a>
          <button type="button" onClick={openGeneratorPanel}>
            Open generator
          </button>
        </nav>

        <article className="crud-sidebar__panel">
          <h2>Status snapshot</h2>
          <div className="crud-status-stack">
            {statusOptions.map((status) => {
              const count = records.filter((record) => record.status === status).length;
              const width =
                records.length === 0 ? 0 : Math.max(8, Math.round((count / records.length) * 100));

              return (
                <div className="crud-status-row" key={status}>
                  <div className="crud-status-row__top">
                    <span>{statusLabels[status]}</span>
                    <strong>{count}</strong>
                  </div>
                  <div className="crud-progress">
                    <span style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="crud-sidebar__panel">
          <h2>Session</h2>
          <div className="crud-profile">
            <div className="crud-profile__avatar">{session.name.slice(0, 1)}</div>
            <div>
              <strong>{session.name}</strong>
              <span>{session.role}</span>
              <span>{session.email}</span>
            </div>
          </div>
          <button
            className="crud-button crud-button--ghost crud-button--full"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
        </article>
      </aside>
      <button
        className={`crud-sidebar-backdrop ${isSidebarOpen ? 'is-visible' : ''}`}
        type="button"
        aria-label="Close workspace menu"
        onClick={closeSidebar}
      />

      <main className="crud-main">
        <header className="crud-topbar">
          <div className="crud-topbar__intro">
            <button
              className={`crud-menu-button crud-menu-button--burger ${isSidebarOpen ? 'is-open' : ''}`}
              type="button"
              aria-expanded={isSidebarOpen}
              aria-controls="crud-sidebar"
              aria-label={isSidebarOpen ? 'Close workspace menu' : 'Open workspace menu'}
              onClick={() => setIsSidebarOpen((current) => !current)}
            >
              <span className="crud-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <div className="crud-topbar__copy">
              <span className="crud-kicker">Operations workspace</span>
              <h2>Manage records, filters, and bulk actions.</h2>
            </div>
          </div>
          <div className="crud-topbar__actions">
            {renderThemeToggle()}
            <button className="crud-button crud-button--primary" type="button" onClick={openCreateRecord}>
              New record
            </button>
            <button
              className="crud-button crud-button--ghost"
              type="button"
              onClick={() => setIsGeneratorOpen(true)}
            >
              Generate data
            </button>
            <button className="crud-button crud-button--ghost" type="button" onClick={handleExportJson}>
              Export JSON
            </button>
            <button
              className="crud-button crud-button--ghost"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              Import JSON
            </button>
            <button className="crud-button crud-button--ghost" type="button" onClick={resetWorkspace}>
              Reset
            </button>
          </div>
        </header>

        <section className="crud-overview" id="overview">
          <article className="crud-overview-card">
            <span>Total records</span>
            <strong>{records.length}</strong>
            <p>All persisted entities currently available in the workspace.</p>
          </article>
          <article className="crud-overview-card">
            <span>Pipeline value</span>
            <strong>{formatCurrency(pipelineValue)}</strong>
            <p>Estimated value from active leads, qualified records, proposals, and customers.</p>
          </article>
          <article className="crud-overview-card">
            <span>High priority</span>
            <strong>{highPriorityCount}</strong>
            <p>Records marked as important and likely to need manual follow-up.</p>
          </article>
          <article className="crud-overview-card">
            <span>Needs attention</span>
            <strong>{overdueCount}</strong>
            <p>Records with stale contact windows that should move back into focus.</p>
          </article>
        </section>

        <section className="crud-workspace" id="records">
          <div className="crud-panel crud-panel--workspace">
            <div className="crud-toolbar">
              <label className="crud-field crud-field--search">
                <span>Search</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search name, company, notes, owner, or tags"
                />
              </label>

              <label className="crud-field">
                <span>Status</span>
                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value as 'all' | CrudStatus);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="crud-field">
                <span>Priority</span>
                <select
                  value={priorityFilter}
                  onChange={(event) => {
                    setPriorityFilter(event.target.value as 'all' | CrudPriority);
                    setCurrentPage(1);
                  }}
                >
                  <option value="all">All priorities</option>
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priorityLabels[priority]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="crud-field">
                <span>Sort</span>
                <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
                  <option value="updated-desc">Updated recently</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="value-desc">Highest value</option>
                  <option value="contact-asc">Oldest contact first</option>
                </select>
              </label>

              <label className="crud-field">
                <span>Rows per page</span>
                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {pageSizeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {isCompactViewport ? (
                <div className="crud-compact-note">
                  Cards view is used on smaller screens so records stay easier to scan.
                </div>
              ) : (
                <div className="crud-view-toggle">
                  <button
                    className={`crud-chip ${viewMode === 'table' ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setViewMode('table')}
                  >
                    Table
                  </button>
                  <button
                    className={`crud-chip ${viewMode === 'cards' ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setViewMode('cards')}
                  >
                    Cards
                  </button>
                </div>
              )}
            </div>

            {selectedIds.length > 0 ? (
              <div className="crud-bulkbar">
                <div className="crud-bulkbar__copy">
                  <strong>{selectedIds.length} selected</strong>
                  <span>Shift-click a checkbox to select or clear a range of visible records.</span>
                </div>
                <div className="crud-bulkbar__actions">
                  <button className="crud-button crud-button--ghost" type="button" onClick={() => clearSelection(true)}>
                    Clear selection
                  </button>
                  <button className="crud-button crud-button--ghost" type="button" onClick={archiveSelected}>
                    Move to inactive
                  </button>
                  <button className="crud-button crud-button--ghost" type="button" onClick={deleteSelected}>
                    Delete selected
                  </button>
                </div>
              </div>
            ) : null}

            {activeViewMode === 'table' ? (
              <div className="crud-table-wrap">
                <table className="crud-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          aria-label="Select all visible records"
                          checked={
                            pageRecords.length > 0 &&
                            pageRecords.every((record) => selectedIds.includes(record.id))
                          }
                          readOnly
                          onClick={togglePageSelection}
                        />
                      </th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Owner</th>
                      <th>Value</th>
                      <th>Updated</th>
                      <th aria-label="Actions" />
                    </tr>
                  </thead>
                  <tbody>
                    {pageRecords.map((record) => (
                      <tr
                        key={record.id}
                        className={activeRecord?.id === record.id ? 'is-active' : ''}
                        onClick={() => setActiveRecordId(record.id)}
                      >
                        <td onClick={(event) => event.stopPropagation()}>
                          <input
                            type="checkbox"
                            aria-label={`Select ${record.name}`}
                            checked={selectedIds.includes(record.id)}
                            readOnly
                            onClick={(event) => handleRecordCheckboxClick(event, record.id)}
                          />
                        </td>
                        <td>
                          <div className="crud-table__contact">
                            <strong>{record.name}</strong>
                            <span className="crud-table__contact-company">{record.company}</span>
                            <span className="crud-table__contact-email">{record.email}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`crud-pill crud-pill--${record.status}`}>{statusLabels[record.status]}</span>
                          <span className={`crud-pill crud-pill--priority-${record.priority}`}>
                            {priorityLabels[record.priority]}
                          </span>
                        </td>
                        <td>
                          <strong>{record.owner}</strong>
                          <span>{record.region}</span>
                        </td>
                        <td>{formatCurrency(record.value)}</td>
                        <td>{formatDate(record.updatedAt)}</td>
                        <td onClick={(event) => event.stopPropagation()}>
                          <div className="crud-row-actions">
                            <button className="crud-inline-link" type="button" onClick={() => openEditRecord(record)}>
                              Edit
                            </button>
                            <button
                              className="crud-inline-link is-danger"
                              type="button"
                              onClick={() => handleDeleteRecord(record.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {pageRecords.length === 0 ? (
                  <div className="crud-empty-state">
                    <strong>No records match the current filters.</strong>
                    <p>Reset the filters or generate a fresh dataset to keep exploring the workspace.</p>
                    <button className="crud-button crud-button--ghost" type="button" onClick={resetFilters}>
                      Reset filters
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="crud-card-grid">
                {pageRecords.map((record) => (
                  <article
                    key={record.id}
                    className={`crud-record-card ${activeRecord?.id === record.id ? 'is-active' : ''}`}
                    onClick={() => setActiveRecordId(record.id)}
                  >
                    <div className="crud-record-card__top">
                      <div>
                        <h3>{record.name}</h3>
                        <p>{record.company}</p>
                      </div>
                      <input
                        type="checkbox"
                        aria-label={`Select ${record.name}`}
                        checked={selectedIds.includes(record.id)}
                        readOnly
                        onClick={(event) => handleRecordCheckboxClick(event, record.id)}
                      />
                    </div>
                    <div className="crud-tag-row">
                      <span className={`crud-pill crud-pill--${record.status}`}>{statusLabels[record.status]}</span>
                      <span className={`crud-pill crud-pill--priority-${record.priority}`}>
                        {priorityLabels[record.priority]}
                      </span>
                    </div>
                    <p>{record.title}</p>
                    <div className="crud-record-card__meta">
                      <span>{record.owner}</span>
                      <span>{record.region}</span>
                      <strong>{formatCurrency(record.value)}</strong>
                    </div>
                    <div className="crud-record-card__actions">
                      <button className="crud-inline-link" type="button" onClick={() => openEditRecord(record)}>
                        Edit
                      </button>
                      <button
                        className="crud-inline-link is-danger"
                        type="button"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="crud-pagination">
              <span>
                Showing {pageRecords.length === 0 ? 0 : pageStart + 1}-
                {Math.min(pageStart + pageRecords.length, sortedRecords.length)} of {sortedRecords.length}
              </span>
              <div className="crud-pagination__actions">
                <button
                  className="crud-button crud-button--ghost"
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  Previous
                </button>
                <button
                  className="crud-button crud-button--ghost"
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <aside className="crud-panel crud-panel--inspector" id="inspector">
            <div className="crud-panel__header">
              <span className="crud-kicker">Inspector</span>
              {activeRecord ? (
                <button className="crud-inline-link" type="button" onClick={() => openEditRecord(activeRecord)}>
                  Edit record
                </button>
              ) : null}
            </div>

            {activeRecord ? (
              <>
                <div className="crud-inspector__heading">
                  <h3>{activeRecord.name}</h3>
                  <p>{activeRecord.company}</p>
                </div>
                <div className="crud-tag-row">
                  <span className={`crud-pill crud-pill--${activeRecord.status}`}>
                    {statusLabels[activeRecord.status]}
                  </span>
                  <span className={`crud-pill crud-pill--priority-${activeRecord.priority}`}>
                    {priorityLabels[activeRecord.priority]}
                  </span>
                </div>
                <dl className="crud-inspector__details">
                  <div>
                    <dt>Email</dt>
                    <dd>{activeRecord.email}</dd>
                  </div>
                  <div>
                    <dt>Title</dt>
                    <dd>{activeRecord.title}</dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{activeRecord.owner}</dd>
                  </div>
                  <div>
                    <dt>Value</dt>
                    <dd>{formatCurrency(activeRecord.value)}</dd>
                  </div>
                  <div>
                    <dt>Next action</dt>
                    <dd>{activeRecord.nextAction}</dd>
                  </div>
                  <div>
                    <dt>Last contact</dt>
                    <dd>{formatDate(activeRecord.lastContact)}</dd>
                  </div>
                </dl>
                <div className="crud-note-card">
                  <strong>Notes</strong>
                  <p>{activeRecord.notes}</p>
                </div>
                <div className="crud-tag-row">
                  {activeRecord.tags.map((tag) => (
                    <span className="crud-chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="crud-empty-state crud-empty-state--compact">
                <strong>No active record selected.</strong>
              </div>
            )}

            <div className="crud-divider" />

            <div className="crud-panel__header">
              <span className="crud-kicker">Recent updates</span>
            </div>
            <div className="crud-recent-list">
              {recentRecords.map((record) => (
                <button
                  className="crud-recent-item"
                  key={record.id}
                  type="button"
                  onClick={() => setActiveRecordId(record.id)}
                >
                  <strong>{record.name}</strong>
                  <span>{record.company}</span>
                  <span>{formatDate(record.updatedAt)}</span>
                </button>
              ))}
            </div>
          </aside>
        </section>
      </main>

      <input
        ref={fileInputRef}
        hidden
        type="file"
        accept="application/json"
        onChange={handleImportFile}
      />

      {isEditorOpen ? (
        <div className="crud-modal-backdrop" role="presentation" onClick={() => setIsEditorOpen(false)}>
          <div
            className="crud-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="crud-modal__header">
              <div>
                <span className="crud-kicker">{editingId ? 'Edit record' : 'Create record'}</span>
                <h3>{editingId ? 'Update workspace entry' : 'Add a new workspace entry'}</h3>
              </div>
              <button className="crud-inline-link" type="button" onClick={() => setIsEditorOpen(false)}>
                Close
              </button>
            </div>

            <form className="crud-form-grid" onSubmit={handleDraftSubmit}>
              <label className="crud-field">
                <span>Name</span>
                <input value={draft.name} onChange={(event) => handleDraftChange('name', event.target.value)} />
              </label>
              <label className="crud-field">
                <span>Email</span>
                <input value={draft.email} onChange={(event) => handleDraftChange('email', event.target.value)} />
              </label>
              <label className="crud-field">
                <span>Company</span>
                <input value={draft.company} onChange={(event) => handleDraftChange('company', event.target.value)} />
              </label>
              <label className="crud-field">
                <span>Title</span>
                <input value={draft.title} onChange={(event) => handleDraftChange('title', event.target.value)} />
              </label>
              <label className="crud-field">
                <span>Status</span>
                <select
                  value={draft.status}
                  onChange={(event) => handleDraftChange('status', event.target.value as CrudStatus)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="crud-field">
                <span>Priority</span>
                <select
                  value={draft.priority}
                  onChange={(event) => handleDraftChange('priority', event.target.value as CrudPriority)}
                >
                  {priorityOptions.map((priority) => (
                    <option key={priority} value={priority}>
                      {priorityLabels[priority]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="crud-field">
                <span>Owner</span>
                <select value={draft.owner} onChange={(event) => handleDraftChange('owner', event.target.value)}>
                  {ownerOptions.map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
              </label>
              <label className="crud-field">
                <span>Region</span>
                <select value={draft.region} onChange={(event) => handleDraftChange('region', event.target.value)}>
                  {regionOptions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>
              <label className="crud-field">
                <span>Source</span>
                <select value={draft.source} onChange={(event) => handleDraftChange('source', event.target.value)}>
                  {sourceOptions.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </label>
              <label className="crud-field">
                <span>Value</span>
                <input value={draft.value} onChange={(event) => handleDraftChange('value', event.target.value)} />
              </label>
              <label className="crud-field crud-field--span">
                <span>Next action</span>
                <input
                  value={draft.nextAction}
                  onChange={(event) => handleDraftChange('nextAction', event.target.value)}
                />
              </label>
              <label className="crud-field crud-field--span">
                <span>Tags</span>
                <input value={draft.tags} onChange={(event) => handleDraftChange('tags', event.target.value)} />
              </label>
              <label className="crud-field crud-field--span">
                <span>Notes</span>
                <textarea
                  rows={4}
                  value={draft.notes}
                  onChange={(event) => handleDraftChange('notes', event.target.value)}
                />
              </label>

              {formError ? <p className="crud-form-error crud-form-error--span">{formError}</p> : null}

              <div className="crud-modal__actions crud-form-error--span">
                <button className="crud-button crud-button--ghost" type="button" onClick={() => setIsEditorOpen(false)}>
                  Cancel
                </button>
                <button className="crud-button crud-button--primary" type="submit">
                  {editingId ? 'Save changes' : 'Create record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isGeneratorOpen ? (
        <div className="crud-modal-backdrop" role="presentation" onClick={() => setIsGeneratorOpen(false)}>
          <div
            className="crud-modal crud-modal--compact"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="crud-modal__header">
              <div>
                <span className="crud-kicker">Random data generator</span>
                <h3>Build a realistic dataset instantly</h3>
              </div>
              <button className="crud-inline-link" type="button" onClick={() => setIsGeneratorOpen(false)}>
                Close
              </button>
            </div>

            <div className="crud-form-grid">
              <label className="crud-field">
                <span>How many records?</span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={generatorCount}
                  onChange={(event) =>
                    setGeneratorCount(Math.min(10000, Math.max(1, Number(event.target.value) || 1)))
                  }
                />
              </label>
              <label className="crud-field">
                <span>Status mix</span>
                <select
                  value={generatorStatus}
                  onChange={(event) => setGeneratorStatus(event.target.value as 'mixed' | CrudStatus)}
                >
                  <option value="mixed">Mixed pipeline</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>
              <div className="crud-field crud-field--span">
                <span>Scale presets</span>
                <div className="crud-preset-grid">
                  {generatorSizePresets.map((preset) => (
                    <button
                      key={preset}
                      className={`crud-chip ${generatorCount === preset ? 'is-active' : ''}`}
                      type="button"
                      onClick={() => setGeneratorCount(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              <label className="crud-field crud-field--span">
                <span>Mode</span>
                <div className="crud-inline-choice">
                  <button
                    className={`crud-chip ${generatorMode === 'append' ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setGeneratorMode('append')}
                  >
                    Append to current data
                  </button>
                  <button
                    className={`crud-chip ${generatorMode === 'replace' ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setGeneratorMode('replace')}
                  >
                    Replace current data
                  </button>
                </div>
              </label>
              <div className="crud-note-card crud-field--span">
                <strong>Generator notes</strong>
                <p>
                  Generated records include owners, tags, contact dates, value bands, status mixes,
                  and notes so the workspace stays useful for filters, bulk actions, and realistic
                  workflow reviews.
                </p>
                <p>
                  This run will leave you with about {generatedTotalPreview.toLocaleString()} total
                  records across {generatedPagePreview.toLocaleString()} pages at {pageSize} rows per
                  page.
                </p>
              </div>
              <div className="crud-modal__actions crud-field--span">
                <button className="crud-button crud-button--ghost" type="button" onClick={() => setIsGeneratorOpen(false)}>
                  Cancel
                </button>
                <button className="crud-button crud-button--primary" type="button" onClick={handleGenerateRecords}>
                  Generate records
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? <div className={`crud-toast crud-toast--${toast.tone}`}>{toast.message}</div> : null}
    </div>
  );
}

export default CrudWorkspaceApp;
