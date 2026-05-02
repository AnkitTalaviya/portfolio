import type { LanguageCode } from './i18n';

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

export type ProjectHubSkillGroup = {
  title: string;
  items: string[];
};

export type ProjectHubCopy = {
  kicker: string;
  title: string;
  text: string;
  skillsHeading: string;
  skillsText: string;
  skillGroups: ProjectHubSkillGroup[];
  cards: ProjectHubCard[];
};

const sharedCards = {
  taskflow: {
    href: '/projects/stockpilot',
    tech: ['React 19 + Vite', 'Firebase', 'Tailwind CSS'],
  },
  deutschflow: {
    href: '/projects/deutschflow-ai',
    tech: ['React 19 + TypeScript', 'Appwrite', 'Google Gemini', 'Capacitor 8'],
  },
  housing: {
    href: '/projects/neural-network-ids-in-p4-bmv2',
    tech: ['P4 (BMv2)', 'Python', 'Quantized Neural Networks'],
  },
} as const;

export const projectHubCopy: Record<LanguageCode, ProjectHubCopy> = {
  en: {
    kicker: 'Projects',
    title: 'Mini products, experiments, and workflow builds.',
    text:
      'A small collection of concept builds and workflow tools. Each card opens a dedicated project tab with its own focused layout.',
    skillsHeading: 'Tech Stack and Skills',
    skillsText:
      'Core technologies and tools I actively use across frontend, backend, networking, automation, and delivery workflows.',
    skillGroups: [
      {
        title: 'Programming Languages',
        items: ['JavaScript', 'TypeScript', 'Python', 'P4'],
      },
      {
        title: 'Frameworks and Libraries',
        items: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Redux', 'React Native', 'Three.js'],
      },
      {
        title: 'Databases and Cloud',
        items: ['Appwrite', 'Firebase', 'MongoDB'],
      },
      {
        title: 'Tools and Platforms',
        items: ['BMv2', 'p4c-bm2-ss', 'ElectronJS', 'Jupyter', 'Postman', 'Docker', 'GitHub'],
      },
    ],
    cards: [
      {
        category: 'Inventory operations app',
        kind: 'Stock management platform',
        title: 'StockPilot',
        summary:
          'A modern inventory operations app for small teams that centralizes stock, purchase orders, suppliers, alerts, audit logs, and team access in one workspace.',
        highlights: [
          'Supports inventory CRUD, stock receive/issue/adjust flows, and PO status tracking across none, ordered, partial, received, and cancelled.',
          'Adds supplier directory management, lead-time visibility, low-stock and overdue receipt notifications, and a complete transaction history.',
          'Implements team access with admin/manager/viewer roles, approval flows, CSV import/export, JSON export, and light-dark themes.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Open project page',
      },
      {
        category: 'AI language learning app',
        kind: 'Mobile-first German learning platform',
        title: 'DeutschFlow AI',
        summary:
          'A German learning app with spaced repetition, CEFR grammar paths, stories, dictionary tools, phrasebook practice, social learning, and Gemini-only AI features.',
        highlights: [
          'Keeps static flashcards, grammar, phrasebook, dictionary, manual cards, and social learning available without any AI key.',
          'Uses Gemini for story generation, grammar deep dives, daily vocabulary, dictionary enrichment, flashcard autofill, and word suggestions.',
          'Supports multiple local Gemini keys with labels, validation states, default model selection, automatic fallback, cooldowns, and bounded retries.',
        ],
        tech: [...sharedCards.deutschflow.tech],
        href: sharedCards.deutschflow.href,
        cta: 'Open project page',
      },
      {
        category: 'Network security research',
        kind: 'In-network ML IDS',
        title: 'Neural-Network IDS in P4 (BMv2)',
        summary:
          'An end-to-end IDS repository where packet and flow features are quantized to fixed-point values and evaluated directly inside P4 data planes, from model training to BMv2 runtime metrics.',
        highlights: [
          'Combines quantized neural-network model families with dynamic command generation from model JSON to BMv2 CLI entries.',
          'Supports both single-switch and multi-switch BMv2 deployments, including profile-aware dynamic runtime templates.',
          'Provides reproducible evaluation scripts with confusion-matrix outputs and side-by-side offline versus online metric comparison.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Open project page',
      },
    ],
  },
  de: {
    kicker: 'Projekte',
    title: 'Kleine Produkte, Experimente und Workflow-Bausteine.',
    text:
      'Eine kleine Sammlung aus Konzeptprojekten und Workflow-Tools. Jede Karte oeffnet ein eigenes Projekt in einem neuen Tab mit fokussiertem Layout.',
    skillsHeading: 'Tech-Stack und Skills',
    skillsText:
      'Zentrale Technologien und Tools, die ich in Frontend-, Backend-, Netzwerk-, Automatisierungs- und Delivery-Workflows nutze.',
    skillGroups: [
      {
        title: 'Programmiersprachen',
        items: ['JavaScript', 'TypeScript', 'Python', 'P4'],
      },
      {
        title: 'Frameworks und Bibliotheken',
        items: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Redux', 'React Native', 'Three.js'],
      },
      {
        title: 'Datenbanken und Cloud',
        items: ['Appwrite', 'Firebase', 'MongoDB'],
      },
      {
        title: 'Tools und Plattformen',
        items: ['BMv2', 'p4c-bm2-ss', 'ElectronJS', 'Jupyter', 'Postman', 'Docker', 'GitHub'],
      },
    ],
    cards: [
      {
        category: 'Inventory-Ops-Anwendung',
        kind: 'Bestandsmanagement-Plattform',
        title: 'StockPilot',
        summary:
          'Eine moderne Inventory-Ops-Anwendung fuer kleine Teams, die Bestand, Bestellungen, Lieferanten, Alerts, Audit-Log und Teamzugriff in einem Workspace vereint.',
        highlights: [
          'Unterstuetzt Inventory-CRUD, Wareneingang, Ausgabe und Korrekturen sowie PO-Status von none bis cancelled.',
          'Bietet Lieferantenverwaltung mit Lead Times, Low-Stock und Overdue Alerts sowie vollstaendige Transaktionshistorie.',
          'Enthaelt Rollen und Zugriffsfreigaben fuer admin, manager und viewer plus CSV-Import/Export, JSON-Export und Light-Dark-Mode.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Projektseite oeffnen',
      },
      {
        category: 'KI-Sprachlern-App',
        kind: 'Mobile-first-Plattform fuer Deutschlernen',
        title: 'DeutschFlow AI',
        summary:
          'Eine Deutschlern-App mit Spaced Repetition, CEFR-Grammatikpfad, Stories, Woerterbuch-Tools, Phrasebook-Uebungen, Social Learning und Gemini-only-KI-Funktionen.',
        highlights: [
          'Statische Flashcards, Grammatik, Phrasebook, Woerterbuch, manuelle Karten und Social Learning funktionieren ohne KI-Key.',
          'Nutzt Gemini fuer Story-Generierung, Grammatik-Deep-Dives, Tagesvokabeln, Woerterbuch-Ergaenzung, Flashcard-Autofill und Wortvorschlaege.',
          'Unterstuetzt mehrere lokale Gemini-Keys mit Labels, Validierungsstatus, Standardmodell, automatischem Fallback, Cooldowns und begrenzten Retries.',
        ],
        tech: [...sharedCards.deutschflow.tech],
        href: sharedCards.deutschflow.href,
        cta: 'Projektseite oeffnen',
      },
      {
        category: 'Netzwerksicherheitsforschung',
        kind: 'In-Network-ML-IDS',
        title: 'Neural-Network IDS in P4 (BMv2)',
        summary:
          'Ein End-to-End-IDS-Repository, bei dem Paket- und Flow-Features in Fixed-Point-Werte quantisiert und direkt in P4-Datenebenen ausgewertet werden, von Training bis BMv2-Runtime-Metriken.',
        highlights: [
          'Kombiniert quantisierte neuronale Modelle mit dynamischer Kommando-Generierung von Model-JSON zu BMv2-CLI-Eintraegen.',
          'Unterstuetzt Single-Switch- und Multi-Switch-BMv2-Deployments inklusive profilbasierter dynamischer Runtime-Templates.',
          'Bietet reproduzierbare Evaluationsskripte mit Confusion-Matrix-Ausgaben und Vergleich von Offline- zu Online-Metriken.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Projektseite oeffnen',
      },
    ],
  },
  fr: {
    kicker: 'Projets',
    title: 'Mini-produits, experiences et outils de workflow.',
    text:
      'Une petite collection de projets conceptuels et doutils de workflow. Chaque carte ouvre un projet dedie dans un nouvel onglet avec une mise en page propre.',
    skillsHeading: 'Stack technique et competences',
    skillsText:
      'Technologies et outils principaux utilises au quotidien sur des workflows frontend, backend, reseau, automatisation et delivery.',
    skillGroups: [
      {
        title: 'Langages de programmation',
        items: ['JavaScript', 'TypeScript', 'Python', 'P4'],
      },
      {
        title: 'Frameworks et bibliotheques',
        items: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Redux', 'React Native', 'Three.js'],
      },
      {
        title: 'Bases de donnees et cloud',
        items: ['Appwrite', 'Firebase', 'MongoDB'],
      },
      {
        title: 'Outils et plateformes',
        items: ['BMv2', 'p4c-bm2-ss', 'ElectronJS', 'Jupyter', 'Postman', 'Docker', 'GitHub'],
      },
    ],
    cards: [
      {
        category: 'Application operations stock',
        kind: 'Plateforme de gestion inventaire',
        title: 'StockPilot',
        summary:
          'Une application moderne pour petites equipes qui regroupe stock, bons de commande, fournisseurs, alertes, historique et acces equipe dans un seul espace.',
        highlights: [
          'Couvre CRUD inventaire, reception, sortie, ajustement de stock et suivi de statut PO.',
          'Ajoute annuaire fournisseurs avec lead times, notifications low stock et retards de reception, et historique complet.',
          'Gere les roles admin, manager, viewer avec approbation d acces, export CSV/JSON et mode clair/sombre.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Ouvrir la page projet',
      },
      {
        category: 'Application d apprentissage avec IA',
        kind: 'Plateforme mobile-first pour apprendre l allemand',
        title: 'DeutschFlow AI',
        summary:
          'Une app d apprentissage de l allemand avec repetition espacee, parcours grammaire CEFR, histoires, dictionnaire, phrasebook, social learning et IA Gemini-only.',
        highlights: [
          'Les flashcards, la grammaire, le phrasebook, le dictionnaire, les cartes manuelles et le social learning restent disponibles sans cle IA.',
          'Utilise Gemini pour les histoires, les explications de grammaire, le vocabulaire quotidien, l enrichissement dictionnaire, l autofill des flashcards et les suggestions de mots.',
          'Gere plusieurs cles Gemini locales avec labels, validation, modele par defaut, fallback automatique, cooldowns et retries limites.',
        ],
        tech: [...sharedCards.deutschflow.tech],
        href: sharedCards.deutschflow.href,
        cta: 'Ouvrir la page projet',
      },
      {
        category: 'Recherche securite reseau',
        kind: 'IDS ML in-network',
        title: 'Neural-Network IDS in P4 (BMv2)',
        summary:
          'Un depot IDS de bout en bout ou les features paquets et flux sont quantifiees en fixed-point et evaluees directement dans le plan de donnees P4, du training aux metriques BMv2.',
        highlights: [
          'Combine des familles de modeles quantifies avec generation dynamique de commandes depuis model JSON vers BMv2 CLI.',
          'Supporte des deploiements BMv2 single-switch et multi-switch avec templates runtime dynamiques par profil.',
          'Fournit des scripts reproductibles avec sorties confusion-matrix et comparaison metriques offline versus online.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Ouvrir la page projet',
      },
    ],
  },
  es: {
    kicker: 'Proyectos',
    title: 'Mini productos, experimentos y herramientas de flujo de trabajo.',
    text:
      'Una pequena coleccion de proyectos conceptuales y herramientas de flujo de trabajo. Cada tarjeta abre un proyecto dedicado en una nueva pestana con su propio diseno.',
    skillsHeading: 'Stack tecnico y habilidades',
    skillsText:
      'Tecnologias y herramientas principales que uso en flujos de frontend, backend, redes, automatizacion y entrega.',
    skillGroups: [
      {
        title: 'Lenguajes de programacion',
        items: ['JavaScript', 'TypeScript', 'Python', 'P4'],
      },
      {
        title: 'Frameworks y bibliotecas',
        items: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'Redux', 'React Native', 'Three.js'],
      },
      {
        title: 'Bases de datos y cloud',
        items: ['Appwrite', 'Firebase', 'MongoDB'],
      },
      {
        title: 'Herramientas y plataformas',
        items: ['BMv2', 'p4c-bm2-ss', 'ElectronJS', 'Jupyter', 'Postman', 'Docker', 'GitHub'],
      },
    ],
    cards: [
      {
        category: 'Aplicacion de operaciones de inventario',
        kind: 'Plataforma de gestion de stock',
        title: 'StockPilot',
        summary:
          'Una app moderna para equipos pequenos que unifica inventario, ordenes de compra, proveedores, alertas, historial y acceso del equipo en un solo lugar.',
        highlights: [
          'Incluye CRUD de inventario, flujos de recibir/emitir/ajustar stock y seguimiento del estado de PO.',
          'Agrega directorio de proveedores con lead times, alertas de bajo stock y recepciones retrasadas, e historial completo.',
          'Soporta roles admin/manager/viewer, aprobaciones de acceso, importacion-exportacion CSV, exportacion JSON y modo claro/oscuro.',
        ],
        tech: [...sharedCards.taskflow.tech],
        href: sharedCards.taskflow.href,
        cta: 'Abrir pagina del proyecto',
      },
      {
        category: 'App de aprendizaje con IA',
        kind: 'Plataforma mobile-first para aprender aleman',
        title: 'DeutschFlow AI',
        summary:
          'Una app para aprender aleman con repeticion espaciada, ruta gramatical CEFR, historias, diccionario, practica de frases, aprendizaje social y funciones IA solo con Gemini.',
        highlights: [
          'Flashcards, gramatica, phrasebook, diccionario, tarjetas manuales y aprendizaje social siguen disponibles sin clave de IA.',
          'Usa Gemini para historias, explicaciones gramaticales, vocabulario diario, enriquecimiento del diccionario, autofill de flashcards y sugerencias de palabras.',
          'Gestiona varias claves Gemini locales con etiquetas, validacion, modelo predeterminado, fallback automatico, cooldowns y reintentos limitados.',
        ],
        tech: [...sharedCards.deutschflow.tech],
        href: sharedCards.deutschflow.href,
        cta: 'Abrir pagina del proyecto',
      },
      {
        category: 'Investigacion de seguridad de red',
        kind: 'IDS ML in-network',
        title: 'Neural-Network IDS in P4 (BMv2)',
        summary:
          'Un repositorio IDS de extremo a extremo donde las caracteristicas de paquetes y flujos se cuantizan a fixed-point y se evalua la inferencia dentro del plano de datos P4, del entrenamiento a metricas BMv2.',
        highlights: [
          'Combina familias de modelos cuantizados con generacion dinamica de comandos desde model JSON hacia BMv2 CLI.',
          'Soporta despliegues BMv2 single-switch y multi-switch con plantillas runtime dinamicas segun perfil.',
          'Incluye scripts reproducibles con salidas de confusion matrix y comparacion de metricas offline frente a online.',
        ],
        tech: [...sharedCards.housing.tech],
        href: sharedCards.housing.href,
        cta: 'Abrir pagina del proyecto',
      },
    ],
  },
};
