import type { LanguageCode } from './i18n';

export type ProjectHubStat = {
  value: string;
  label: string;
};

export type ProjectHubCard = {
  category: string;
  kind: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  href: string;
  cta: string;
};

export type ProjectHubCopy = {
  kicker: string;
  title: string;
  text: string;
  stats: ProjectHubStat[];
  cards: ProjectHubCard[];
};

const sharedCards = {
  taskflow: {
    href: './projects/taskflow-sprint-planner.html',
    tech: ['React', 'TypeScript', 'LocalStorage'],
  },
  housing: {
    href: './projects/berlin-flat-tracker.html',
    tech: ['Next.js', 'PostgreSQL', 'Maps API'],
  },
  support: {
    href: './projects/support-note-automator.html',
    tech: ['Python', 'FastAPI', 'OpenAI API'],
  },
  analytics: {
    href: './projects/market-snapshot-studio.html',
    tech: ['Vue', 'D3', 'Serverless'],
  },
} as const;

export const projectHubCopy: Record<LanguageCode, ProjectHubCopy> = {
  en: {
    kicker: 'Projects',
    title: 'Mini products, experiments, and workflow builds.',
    text:
      'A small collection of concept builds and workflow tools. Each card opens a dedicated project tab with its own focused layout.',
    stats: [
      { value: '04', label: 'concept projects' },
      { value: 'Web', label: 'dashboards, automation, and reporting tools' },
      { value: 'New Tab', label: 'each card opens an isolated detail page' },
    ],
    cards: [
      {
        category: 'Frontend application',
        kind: 'React CRUD workspace',
        title: 'React CRUD Workspace',
        summary:
          'A frontend-only React CRUD workspace with a dark theme, streamlined login, local persistence, search, filters, bulk actions, JSON export, and scalable data generation for realistic admin flows.',
        highlights: [
          'Includes a minimal sign-in screen, dashboard stats, editable records, and responsive table and card views.',
          'Uses localStorage to persist session state, generated data, filters, and user-created records across refreshes.',
          'Adds data generation, import and export tools, and record detail inspection to mirror a practical internal workspace.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Open project page',
      },
      {
        category: 'Search workflow',
        kind: 'Micro product',
        title: 'Berlin Flat Tracker',
        summary:
          'A housing-search dashboard that collects apartment links, tracks application status, and keeps viewings, documents, and follow-ups in one timeline.',
        highlights: [
          'Collects listings from multiple portals into a single shortlist.',
          'Tracks landlord replies, document status, and next actions.',
          'Surfaces high-priority applications based on deadline and rent fit.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Open project page',
      },
      {
        category: 'Ops automation',
        kind: 'Internal tool',
        title: 'Support Note Automator',
        summary:
          'A shared-ops assistant that turns noisy support conversations into structured issue summaries, reproducible steps, and release-note drafts.',
        highlights: [
          'Extracts product signals from long ticket threads and chat logs.',
          'Builds handoff notes for engineering, QA, and customer success.',
          'Keeps tagged issue patterns visible across repeated incidents.',
        ],
        tech: [...sharedCards.support.tech],
        href: sharedCards.support.href,
        cta: 'Open project page',
      },
      {
        category: 'Reporting dashboard',
        kind: 'Small task system',
        title: 'Market Snapshot Studio',
        summary:
          'A simple analytics workspace for turning CSV exports into one-page KPI narratives, trend cards, and shareable executive summaries.',
        highlights: [
          'Uploads raw campaign or revenue exports and normalizes the data.',
          'Creates summary cards, anomaly flags, and stakeholder-ready notes.',
          'Exports polished report views without needing spreadsheet cleanup.',
        ],
        tech: [...sharedCards.analytics.tech],
        href: sharedCards.analytics.href,
        cta: 'Open project page',
      },
    ],
  },
  de: {
    kicker: 'Projekte',
    title: 'Kleine Produkte, Experimente und Workflow-Bausteine.',
    text:
      'Eine kleine Sammlung aus Konzeptprojekten und Workflow-Tools. Jede Karte oeffnet ein eigenes Projekt in einem neuen Tab mit fokussiertem Layout.',
    stats: [
      { value: '04', label: 'Konzeptprojekte' },
      { value: 'Web', label: 'Dashboards, Automatisierung und Reporting-Tools' },
      { value: 'Neuer Tab', label: 'jede Karte oeffnet eine isolierte Detailseite' },
    ],
    cards: [
      {
        category: 'Frontend-Anwendung',
        kind: 'React-CRUD-Workspace',
        title: 'React CRUD Workspace',
        summary:
          'Ein frontend-only React-CRUD-Workspace mit Dark Theme, reduziertem Login, lokaler Persistenz, Suche, Filtern, Bulk-Aktionen, JSON-Export und skalierbarer Datengenerierung fuer realistische Admin-Ablaufe.',
        highlights: [
          'Enthaelt einen reduzierten Login-Screen, Dashboard-Kennzahlen, editierbare Datensaetze sowie responsive Tabellen- und Kartenansichten.',
          'Nutzen von localStorage fuer Session, generierte Daten, Filter und manuell angelegte Datensaetze.',
          'Erweitert um Datengenerator, Import und Export sowie eine Detailansicht fuer typische interne Workspace-Aufgaben.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Projektseite oeffnen',
      },
      {
        category: 'Such-Workflow',
        kind: 'Mini-Produkt',
        title: 'Berlin Flat Tracker',
        summary:
          'Ein Wohnungs-Dashboard, das Inserate sammelt, Bewerbungsstatus verfolgt und Besichtigungen, Dokumente sowie Follow-ups in einer Timeline haelt.',
        highlights: [
          'Sammelt Inserate aus mehreren Portalen in einer gemeinsamen Shortlist.',
          'Verfolgt Rueckmeldungen, Dokumentstatus und naechste Schritte.',
          'Hebt priorisierte Bewerbungen nach Frist und Mietpassung hervor.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Projektseite oeffnen',
      },
      {
        category: 'Ops-Automatisierung',
        kind: 'Internes Tool',
        title: 'Support Note Automator',
        summary:
          'Ein gemeinsamer Ops-Assistent, der unruhige Support-Gespraeche in strukturierte Problembeschreibungen, Repro-Schritte und Release-Note-Entwuerfe verwandelt.',
        highlights: [
          'Extrahiert Produktsignale aus langen Ticket- und Chat-Verlaeufen.',
          'Erstellt Uebergaben fuer Engineering, QA und Customer Success.',
          'Haelt wiederkehrende Muster ueber mehrere Vorfaelle sichtbar.',
        ],
        tech: [...sharedCards.support.tech],
        href: sharedCards.support.href,
        cta: 'Projektseite oeffnen',
      },
      {
        category: 'Reporting-Dashboard',
        kind: 'Kleines Task-System',
        title: 'Market Snapshot Studio',
        summary:
          'Ein einfaches Analytics-Workspace, das CSV-Exporte in KPI-Zusammenfassungen, Trendkarten und teilbare Executive-Summaries umwandelt.',
        highlights: [
          'Laedt Kampagnen- oder Umsatzdaten hoch und normalisiert sie.',
          'Erstellt Zusammenfassungen, Anomalie-Hinweise und Stakeholder-Notizen.',
          'Exportiert saubere Reports ohne zusaetzliche Tabellenpflege.',
        ],
        tech: [...sharedCards.analytics.tech],
        href: sharedCards.analytics.href,
        cta: 'Projektseite oeffnen',
      },
    ],
  },
  fr: {
    kicker: 'Projets',
    title: 'Mini-produits, experiences et outils de workflow.',
    text:
      'Une petite collection de projets conceptuels et doutils de workflow. Chaque carte ouvre un projet dedie dans un nouvel onglet avec une mise en page propre.',
    stats: [
      { value: '04', label: 'projets conceptuels' },
      { value: 'Web', label: 'tableaux de bord, automatisation et reporting' },
      { value: 'Nouvel onglet', label: 'chaque carte ouvre une page detaillee isolee' },
    ],
    cards: [
      {
        category: 'Application frontend',
        kind: 'Espace CRUD React',
        title: 'React CRUD Workspace',
        summary:
          'Un espace CRUD React uniquement frontend avec theme sombre, connexion epuree, persistance locale, recherche, filtres, actions de masse, export JSON et generation de donnees a grande echelle pour des flux admin realistes.',
        highlights: [
          'Comprend un ecran de connexion minimal, des stats de dashboard, des enregistrements modifiables et des vues tableau et cartes responsives.',
          'Utilise localStorage pour conserver la session, les donnees generees, les filtres et les enregistrements crees.',
          'Ajoute un generateur de donnees, des outils import export et un panneau detail pour imiter un vrai workspace interne.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Ouvrir la page projet',
      },
      {
        category: 'Workflow de recherche',
        kind: 'Micro-produit',
        title: 'Berlin Flat Tracker',
        summary:
          'Un tableau de bord de recherche de logement qui collecte les annonces, suit le statut des candidatures et garde visites, documents et relances dans une seule timeline.',
        highlights: [
          'Rassemble les annonces de plusieurs portails dans une shortlist unique.',
          'Suit les reponses des proprietaires, les documents et les prochaines actions.',
          'Met en avant les candidatures prioritaires selon delai et budget.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Ouvrir la page projet',
      },
      {
        category: 'Automatisation ops',
        kind: 'Outil interne',
        title: 'Support Note Automator',
        summary:
          'Un assistant ops partage qui transforme des conversations support bruyantes en resumes de probleme structures, etapes de reproduction et brouillons de release notes.',
        highlights: [
          'Extrait les signaux produit depuis de longs tickets et journaux de chat.',
          'Construit des notes de passation pour engineering, QA et customer success.',
          'Garde visibles les motifs recurrents sur plusieurs incidents.',
        ],
        tech: [...sharedCards.support.tech],
        href: sharedCards.support.href,
        cta: 'Ouvrir la page projet',
      },
      {
        category: 'Dashboard de reporting',
        kind: 'Petit systeme de taches',
        title: 'Market Snapshot Studio',
        summary:
          'Un espace analytique simple pour transformer des exports CSV en recits KPI, cartes de tendance et resumes executifs partageables.',
        highlights: [
          'Importe des exports de campagne ou de revenu puis les normalise.',
          'Genere des resumes, alertes danomalie et notes pour les parties prenantes.',
          'Exporte des vues de rapport propres sans nettoyage manuel lourd.',
        ],
        tech: [...sharedCards.analytics.tech],
        href: sharedCards.analytics.href,
        cta: 'Ouvrir la page projet',
      },
    ],
  },
  es: {
    kicker: 'Proyectos',
    title: 'Mini productos, experimentos y herramientas de flujo de trabajo.',
    text:
      'Una pequena coleccion de proyectos conceptuales y herramientas de flujo de trabajo. Cada tarjeta abre un proyecto dedicado en una nueva pestana con su propio diseno.',
    stats: [
      { value: '04', label: 'proyectos conceptuales' },
      { value: 'Web', label: 'dashboards, automatizacion y herramientas de reporte' },
      { value: 'Nueva pestana', label: 'cada tarjeta abre una pagina aislada' },
    ],
    cards: [
      {
        category: 'Aplicacion frontend',
        kind: 'Workspace CRUD React',
        title: 'React CRUD Workspace',
        summary:
          'Un espacio CRUD en React solo frontend con tema oscuro, login simplificado, persistencia local, busqueda, filtros, acciones masivas, exportacion JSON y generacion de datos a escala para flujos admin realistas.',
        highlights: [
          'Incluye una pantalla de login minima, metricas de dashboard, registros editables y vistas responsivas en tabla y tarjetas.',
          'Usa localStorage para guardar sesion, datos generados, filtros y registros creados por el usuario.',
          'Agrega generacion de datos, herramientas de importacion y exportacion, y un panel de detalle para simular un workspace interno real.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Abrir pagina del proyecto',
      },
      {
        category: 'Flujo de busqueda',
        kind: 'Micro producto',
        title: 'Berlin Flat Tracker',
        summary:
          'Un dashboard de busqueda de vivienda que recopila anuncios, sigue el estado de aplicaciones y mantiene visitas, documentos y seguimientos en una sola linea de tiempo.',
        highlights: [
          'Recopila anuncios de varios portales en una unica shortlist.',
          'Sigue respuestas de propietarios, documentos y siguientes acciones.',
          'Destaca aplicaciones prioritarias segun fecha limite y ajuste de renta.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Abrir pagina del proyecto',
      },
      {
        category: 'Automatizacion ops',
        kind: 'Herramienta interna',
        title: 'Support Note Automator',
        summary:
          'Un asistente compartido para operaciones que convierte conversaciones de soporte ruidosas en resumenes estructurados, pasos reproducibles y borradores de release notes.',
        highlights: [
          'Extrae senales de producto de tickets largos y registros de chat.',
          'Construye notas de traspaso para engineering, QA y customer success.',
          'Mantiene visibles los patrones recurrentes entre incidentes.',
        ],
        tech: [...sharedCards.support.tech],
        href: sharedCards.support.href,
        cta: 'Abrir pagina del proyecto',
      },
      {
        category: 'Dashboard de reporte',
        kind: 'Sistema pequeno de tareas',
        title: 'Market Snapshot Studio',
        summary:
          'Un espacio analitico sencillo para convertir exportaciones CSV en narrativas KPI, tarjetas de tendencia y resumenes ejecutivos compartibles.',
        highlights: [
          'Carga exportaciones de campana o ingresos y normaliza los datos.',
          'Crea resúmenes, alertas de anomalias y notas para stakeholders.',
          'Exporta vistas de reporte limpias sin limpieza manual en hojas de calculo.',
        ],
        tech: [...sharedCards.analytics.tech],
        href: sharedCards.analytics.href,
        cta: 'Abrir pagina del proyecto',
      },
    ],
  },
};
