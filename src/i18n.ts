export const languageOptions = [
  { code: 'en', nativeLabel: 'English' },
  { code: 'de', nativeLabel: 'Deutsch' },
  { code: 'fr', nativeLabel: 'Francais' },
  { code: 'es', nativeLabel: 'Espanol' },
] as const;

export type LanguageCode = (typeof languageOptions)[number]['code'];

export type ThemeToneKey = 'warm' | 'cool' | 'calm' | 'clean' | 'earthy';

type Stat = {
  value: string;
  label: string;
};

type FocusCard = {
  title: string;
  copy: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
};

type SkillGroup = {
  title: string;
  items: string[];
};

type ProjectLink = {
  label: string;
  href: string;
};

type ProjectItem = {
  title: string;
  company: string;
  category: string;
  summary: string;
  highlights: string[];
  tech: string[];
  links?: ProjectLink[];
};

type EducationItem = {
  title: string;
  place: string;
  period: string;
  notes: string[];
};

export type AppCopy = {
  htmlLang: string;
  nav: {
    menu: string;
    about: string;
    experience: string;
    portfolio: string;
    project: string;
    skills: string;
    contact: string;
  };
  languageSwitcher: {
    label: string;
    ariaLabel: string;
  };
  theme: {
    label: string;
    panelTitle: string;
    selectorAriaLabel: string;
    groups: Record<'dark' | 'light', string>;
    tones: Record<ThemeToneKey, string>;
  };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    quickFacts: string[];
    stats: Stat[];
    actions: {
      email: string;
      linkedIn: string;
      gitHub: string;
      resume: string;
    };
  };
  about: {
    kicker: string;
    title: string;
    text: string;
    cards: FocusCard[];
  };
  experience: {
    kicker: string;
    title: string;
    text: string;
    items: ExperienceItem[];
  };
  projects: {
    kicker: string;
    title: string;
    text: string;
    items: ProjectItem[];
  };
  skills: {
    kicker: string;
    title: string;
    text: string;
    groups: SkillGroup[];
  };
  education: {
    kicker: string;
    title: string;
    items: EducationItem[];
    languagesTitle: string;
    spokenLanguages: string[];
    documentsTitle: string;
    documentsText: string;
    documents: ProjectLink[];
  };
  contact: {
    kicker: string;
    title: string;
    text: string;
    location: string;
    actions: {
      email: string;
      linkedIn: string;
      gitHub: string;
      backToTop: string;
    };
  };
  scene: {
    paletteAriaLabel: string;
    paletteSuffix: string;
    maximize: string;
    restore: string;
    loading: string;
    error: string;
    tailoringTitle: string;
    tailoringText: string;
  };
};

export const paletteToneLabels: Record<LanguageCode, Record<string, string>> = {
  en: {
    Blue: 'Blue',
    Neutral: 'Neutral',
    Bold: 'Bold',
    Green: 'Green',
    Light: 'Light',
  },
  de: {
    Blue: 'Blau',
    Neutral: 'Neutral',
    Bold: 'Kräftig',
    Green: 'Grün',
    Light: 'Hell',
  },
  fr: {
    Blue: 'Bleu',
    Neutral: 'Neutre',
    Bold: 'Affirme',
    Green: 'Vert',
    Light: 'Clair',
  },
  es: {
    Blue: 'Azul',
    Neutral: 'Neutro',
    Bold: 'Intenso',
    Green: 'Verde',
    Light: 'Claro',
  },
};

export const defaultLanguage: LanguageCode = 'en';

export const getPreferredLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  const savedLanguage = window.localStorage.getItem('portfolio-language');
  if (languageOptions.some((option) => option.code === savedLanguage)) {
    return savedLanguage as LanguageCode;
  }

  const preferredLanguages = [window.navigator.language, ...(window.navigator.languages ?? [])];
  for (const locale of preferredLanguages) {
    const matchedLanguage = languageOptions.find((option) =>
      locale.toLowerCase().startsWith(option.code),
    );

    if (matchedLanguage) {
      return matchedLanguage.code;
    }
  }

  return defaultLanguage;
};

const englishCopy: AppCopy = {
  htmlLang: 'en',
  nav: {
    menu: 'Menu',
    about: 'About',
    experience: 'Experience',
    portfolio: 'Projects',
    project: 'Project pages',
    skills: 'Skills',
    contact: 'Contact',
  },
  languageSwitcher: {
    label: 'Language',
    ariaLabel: 'Language switcher',
  },
  theme: {
    label: 'Theme',
    panelTitle: 'Themes',
    selectorAriaLabel: 'Theme selector',
    groups: {
      dark: 'Dark',
      light: 'Light',
    },
    tones: {
      warm: 'Warm',
      cool: 'Cool',
      calm: 'Calm',
      clean: 'Clean',
      earthy: 'Earthy',
    },
  },
  hero: {
    eyebrow: 'Full-Stack AI Engineer | M.Sc. Student | TU Ilmenau',
    title:
      'Full-Stack AI Engineer building LLM applications, RAG pipelines, and machine learning for programmable networks.',
    text:
      'I am Ankit Talaviya. I have three years of professional software development experience and I am studying for an M.Sc. in Research in Computer and Systems Engineering at TU Ilmenau. I work on LLM applications with multi-provider failover, RAG pipelines built on ChromaDB and Sentence-Transformers, and quantised neural networks for P4 data planes. My own product, sprako.app, is in beta.',
    quickFacts: [
      'Based in Erfurt, Germany',
      'Three years of professional software development',
      'sprako.app is in beta',
    ],
    stats: [
      { value: '3', label: 'years of professional software development' },
      { value: '10-15', label: 'beta users on sprako.app' },
      { value: '2027', label: 'expected M.Sc. completion at TU Ilmenau' },
    ],
    actions: {
      email: 'Email me',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      resume: 'Resume PDF',
    },
  },
  about: {
    kicker: 'About',
    title: 'What I work on.',
    text:
      'Three years of professional software development, now applied to LLM applications, retrieval pipelines, and machine learning inside network data planes.',
    cards: [
      {
        title: 'LLM applications',
        copy:
          'Sprako runs on the Google Gemini API. Keys are validated one by one, with automatic failover, cooldowns and bounded retries. The application stays fully usable with no key configured.',
      },
      {
        title: 'RAG and local models',
        copy:
          'German vocabulary and example sentences indexed in ChromaDB with multilingual Sentence-Transformer embeddings. Generation runs through the Anthropic API, with local Qwen2.5 on Ollama as an offline fallback.',
      },
      {
        title: 'ML in programmable networks',
        copy:
          'Packet and flow features quantised to fixed point and evaluated directly in the P4 data plane. Covers model training, deployment and runtime metrics under BMv2.',
      },
    ],
  },
  projects: {
    kicker: 'Projects',
    title: 'Projects.',
    text:
      'A German learning platform in beta, a RAG chatbot for German vocabulary, and a neural network that runs as an intrusion detection system inside a P4 data plane.',
    items: [
      {
        title: 'DeutschFlow AI / Sprako',
        company: 'Own project, concept to operation',
        category: 'German learning platform, A1 to C2',
        summary:
          'A German learning platform I built and run myself. It is in beta at sprako.app with 10 to 15 users.',
        highlights: [
          'Management of multiple Gemini API keys with per-key validation, automatic failover, cooldowns and bounded retries. The application stays fully usable with no key configured.',
          'Six-level grammar path from A1 to C2, vocabulary generated via Gemini, and a spaced repetition system with XP, streaks and weak-area tracking.',
          'Appwrite backend with authentication, learning state, follow function and notifications.',
        ],
        tech: [
          'ReactJS 19',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'Capacitor 8',
          'Appwrite',
          'Google Gemini API',
        ],
        links: [
          { label: 'Open sprako.app', href: 'https://sprako.app' },
          { label: 'Project page', href: '/projects/deutschflow-ai' },
        ],
      },
      {
        title: 'RAG chatbot for German learning',
        company: 'Retrieval-Augmented Generation',
        category: 'German vocabulary, runs offline',
        summary:
          'Retrieval-Augmented Generation over German vocabulary. It runs without an internet connection.',
        highlights: [
          'Vocabulary and example sentences from OpenThesaurus and Tatoeba indexed in ChromaDB using multilingual Sentence-Transformer embeddings.',
          'The retrieval pipeline returns semantically similar vocabulary and usage examples for a learner query.',
          'Generation via the Anthropic API, with local Qwen2.5 through Ollama as an offline fallback.',
        ],
        tech: ['Python', 'ChromaDB', 'Sentence-Transformers', 'Anthropic API', 'Ollama', 'Qwen2.5'],
        links: [
          { label: 'Open sprako.app', href: 'https://sprako.app' },
          { label: 'Project page', href: '/projects/rag-chatbot-german' },
        ],
      },
      {
        title: 'Neural network as in-network IDS in P4 (BMv2)',
        company: 'Machine learning in programmable data planes',
        category: 'In-network intrusion detection',
        summary:
          'Packet and flow features are quantised to fixed point and classified directly inside the P4 data plane, from model training to runtime metrics under BMv2.',
        highlights: [
          'Packet and flow features quantised to fixed point and evaluated directly in the P4 data plane. Covers model training, deployment and collection of runtime metrics under BMv2.',
          'BMv2 CLI runtime entries generated automatically from the model JSON. Deployed on single-switch and multi-switch topologies.',
          'Evaluation through reproducible scripts with confusion matrices and a comparison of offline and online metrics.',
        ],
        tech: ['Python', 'P4', 'BMv2', 'Mininet', 'PyTorch'],
        links: [
          { label: 'GitHub repo', href: 'https://github.com/AnkitTalaviya/nn_p4_nids' },
          { label: 'Project page', href: '/projects/neural-network-ids-in-p4-bmv2' },
        ],
      },
    ],
  },
  experience: {
    kicker: 'Experience',
    title: 'Professional experience.',
    text:
      'Three years as a frontend developer in India, across desktop, web and mobile products.',
    items: [
      {
        company: 'Addicted Technologies',
        role: 'Frontend Developer & Team Lead',
        period: 'Jul 2023 - Jul 2024',
        location: 'Gandhinagar, India',
        summary: 'Desktop products built with ElectronJS, ReactJS and Three.js.',
        achievements: [
          '3D-Emp (ElectronJS, Three.js): loaded GLTF house models from Blender, wall selection via raycasting and runtime texture swaps (MeshStandardMaterial) without interrupting the render loop. Level of Detail against framerate drops.',
          'FiMA (ElectronJS, ReactJS): personal finance desktop application with charts, category analysis and backup via the Google Drive API.',
          'Introduced LLM-assisted development tooling in the team, including code review support and test case generation.',
          'Led a four-person development team (two developers, one designer, one QA), including sprint planning and code reviews across both products.',
        ],
      },
      {
        company: 'Crest Infotech',
        role: 'Frontend Developer, initially part-time',
        period: 'Jul 2021 - Jun 2023',
        location: 'Ahmedabad, India',
        summary: 'ElectronJS, ReactJS and React Native work across several client products.',
        achievements: [
          "CrestPMS: fixed multi-monitor screenshot failures by reconfiguring Electron's desktopCapturer API. Restored keyboard and mouse tracking via ioHook on macOS (M1 and Intel), Linux and Windows.",
          "CrestMeds: built entirely in React Native with React Navigation stacks, tab flows and deep linking. Submitted as bachelor's final project.",
          'Pawfect Admin Panel (ReactJS, Socket.IO): real-time chat, infinite scrolling, booking API and role-based access control.',
          'Contributed to the Room Key hotel management system, migrated ProductY to ReactJS and built an SVG vector graphics editor.',
          'Integrated external AI APIs for image and text processing into client projects, including OCR-based document capture.',
        ],
      },
    ],
  },
  skills: {
    kicker: 'Skills',
    title: 'Skills.',
    text: 'Grouped the same way as on my CV.',
    groups: [
      {
        title: 'AI, ML & LLM',
        items: [
          'Machine Learning',
          'Google Gemini (multi-key, failover)',
          'Anthropic API',
          'Prompt and context engineering',
          'Model quantisation',
        ],
      },
      {
        title: 'RAG & local models',
        items: [
          'ChromaDB',
          'Sentence-Transformers (multilingual)',
          'Embeddings',
          'Retrieval pipelines',
          'Ollama (Qwen2.5)',
        ],
      },
      {
        title: 'Programming & frontend',
        items: [
          'Python',
          'JavaScript',
          'TypeScript',
          'C++',
          'HTML/CSS',
          'ReactJS',
          'React Native',
          'Three.js',
          'ElectronJS',
          'Capacitor 8',
          'Vite',
          'Tailwind CSS',
          'Redux',
        ],
      },
      {
        title: 'Backend & data',
        items: [
          'Node.js',
          'Express.js',
          'MongoDB',
          'Mongoose',
          'PostgreSQL',
          'MySQL',
          'Appwrite',
          'Firebase',
          'REST APIs',
        ],
      },
      {
        title: 'DevOps & networking',
        items: [
          'Git',
          'GitHub',
          'Docker',
          'Docker Compose',
          'Linux',
          'Jira',
          'P4',
          'BMv2',
          'Mininet',
        ],
      },
    ],
  },
  education: {
    kicker: 'Education & Languages',
    title: 'Education and languages.',
    items: [
      {
        title: 'M.Sc. Research in Computer and Systems Engineering',
        place: 'Technische Universität Ilmenau',
        period: 'Oct 2024 - expected 2027',
        notes: [
          'Focus on network intrusion detection systems and machine learning in programmable networks.',
          'Member of the BMBF-funded programme Internationale Ingenieure für Thüringen.',
        ],
      },
      {
        title: 'B.E. Computer Science and Engineering',
        place: 'Gujarat Technological University, India',
        period: 'Jul 2019 - Jun 2023',
        notes: [
          'CGPA 7,8 out of 10, First Class with Distinction. German equivalent about 2,3.',
        ],
      },
    ],
    languagesTitle: 'Languages',
    spokenLanguages: [
      'German - B1, working towards B2',
      'English - C1',
      'Hindi - Native',
      'Gujarati - Native',
    ],
    documentsTitle: 'Documents',
    documentsText: 'CV and project details.',
    documents: [
      { label: 'CV PDF', href: '/documents/ankit-talaviya-resume.pdf' },
      { label: 'Project details PDF', href: '/documents/ankit-talaviya-project-details.pdf' },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Open to Full-Stack AI Engineer roles.',
    text: 'Email is the quickest way to reach me.',
    location: 'Erfurt, Germany',
    actions: {
      email: 'Send email',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      backToTop: 'Back to top',
    },
  },
  scene: {
    paletteAriaLabel: 'Avatar clothes colors',
    paletteSuffix: 'palette',
    maximize: 'Maximize view',
    restore: 'Restore view',
    loading: 'Loading 3D model...',
    error: 'The 3D model could not be loaded.',
    tailoringTitle: 'Tailoring outfit',
    tailoringText: 'Applying your selected palette',
  },
};

const germanCopy: AppCopy = {
  htmlLang: 'de',
  nav: {
    menu: 'Menü',
    about: 'Über mich',
    experience: 'Erfahrung',
    portfolio: 'Projekte',
    project: 'Projektseiten',
    skills: 'Skills',
    contact: 'Kontakt',
  },
  languageSwitcher: {
    label: 'Sprache',
    ariaLabel: 'Sprachauswahl',
  },
  theme: {
    label: 'Thema',
    panelTitle: 'Themen',
    selectorAriaLabel: 'Thema auswählen',
    groups: {
      dark: 'Dunkel',
      light: 'Hell',
    },
    tones: {
      warm: 'Warm',
      cool: 'Kühl',
      calm: 'Ruhig',
      clean: 'Klar',
      earthy: 'Natürlich',
    },
  },
  hero: {
    eyebrow: 'Full-Stack AI Engineer | M.Sc.-Student | TU Ilmenau',
    title:
      'Full-Stack AI Engineer für LLM-Anwendungen, RAG-Pipelines und maschinelles Lernen in programmierbaren Netzen.',
    text:
      'Ich bin Ankit Talaviya. Ich habe drei Jahre Berufserfahrung in der Softwareentwicklung und studiere im M.Sc. Research in Computer and Systems Engineering an der TU Ilmenau. Ich arbeite an LLM-Anwendungen mit Multi-Provider-Failover, RAG-Pipelines auf Basis von ChromaDB und Sentence-Transformers sowie quantisierten neuronalen Netzen für P4-Datenebenen. Mein eigenes Produkt, sprako.app, ist in der Beta.',
    quickFacts: [
      'Wohnhaft in Erfurt, Deutschland',
      'Drei Jahre Berufserfahrung in der Softwareentwicklung',
      'sprako.app ist in der Beta',
    ],
    stats: [
      { value: '3', label: 'Jahre Berufserfahrung in der Softwareentwicklung' },
      { value: '10-15', label: 'Beta-Nutzer auf sprako.app' },
      { value: '2027', label: 'voraussichtlicher M.Sc.-Abschluss an der TU Ilmenau' },
    ],
    actions: {
      email: 'E-Mail senden',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      resume: 'Lebenslauf PDF',
    },
  },
  about: {
    kicker: 'Über mich',
    title: 'Woran ich arbeite.',
    text:
      'Drei Jahre Berufserfahrung in der Softwareentwicklung, heute angewendet auf LLM-Anwendungen, Retrieval-Pipelines und maschinelles Lernen in Netzwerk-Datenebenen.',
    cards: [
      {
        title: 'LLM-Anwendungen',
        copy:
          'Sprako läuft über die Google-Gemini-API. Schlüssel werden einzeln validiert, mit automatischem Failover, Cooldowns und begrenzten Retries. Die Anwendung bleibt ohne konfigurierten Schlüssel vollständig nutzbar.',
      },
      {
        title: 'RAG und lokale Modelle',
        copy:
          'Deutscher Wortschatz und Beispielsätze werden mit mehrsprachigen Sentence-Transformer-Embeddings in ChromaDB indexiert. Die Generierung läuft über die Anthropic-API, mit lokalem Qwen2.5 über Ollama als Offline-Fallback.',
      },
      {
        title: 'ML in programmierbaren Netzen',
        copy:
          'Paket- und Flow-Features werden auf Festkomma quantisiert und direkt in der P4-Datenebene ausgewertet. Umfasst Modelltraining, Deployment und Laufzeitmetriken unter BMv2.',
      },
    ],
  },
  projects: {
    kicker: 'Projekte',
    title: 'Projekte.',
    text:
      'Eine Deutschlernplattform in der Beta, ein RAG-Chatbot für deutschen Wortschatz und ein neuronales Netz, das als Intrusion Detection System in einer P4-Datenebene läuft.',
    items: [
      {
        title: 'DeutschFlow AI / Sprako',
        company: 'Eigenes Projekt, von der Idee bis zum Betrieb',
        category: 'Deutschlernplattform, A1 bis C2',
        summary:
          'Eine Deutschlernplattform, die ich selbst gebaut habe und betreibe. Sie ist als Beta unter sprako.app mit 10 bis 15 Nutzern erreichbar.',
        highlights: [
          'Verwaltung mehrerer Gemini-API-Schlüssel mit Validierung pro Schlüssel, automatischem Failover, Cooldowns und begrenzten Retries. Die Anwendung bleibt ohne konfigurierten Schlüssel vollständig nutzbar.',
          'Sechsstufiger Grammatikpfad von A1 bis C2, über Gemini generierter Wortschatz und ein Spaced-Repetition-System mit XP, Streaks und Tracking schwacher Bereiche.',
          'Appwrite-Backend mit Authentifizierung, Lernstand, Follow-Funktion und Benachrichtigungen.',
        ],
        tech: [
          'ReactJS 19',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'Capacitor 8',
          'Appwrite',
          'Google Gemini API',
        ],
        links: [
          { label: 'sprako.app öffnen', href: 'https://sprako.app' },
          { label: 'Projektseite', href: '/projects/deutschflow-ai' },
        ],
      },
      {
        title: 'RAG-Chatbot für das Deutschlernen',
        company: 'Retrieval-Augmented Generation',
        category: 'Deutscher Wortschatz, offline lauffähig',
        summary:
          'Retrieval-Augmented Generation über deutschen Wortschatz. Läuft ohne Internetverbindung.',
        highlights: [
          'Wortschatz und Beispielsätze aus OpenThesaurus und Tatoeba werden mit mehrsprachigen Sentence-Transformer-Embeddings in ChromaDB indexiert.',
          'Die Retrieval-Pipeline liefert semantisch ähnlichen Wortschatz und Verwendungsbeispiele zu einer Lernanfrage.',
          'Generierung über die Anthropic-API, mit lokalem Qwen2.5 über Ollama als Offline-Fallback.',
        ],
        tech: ['Python', 'ChromaDB', 'Sentence-Transformers', 'Anthropic API', 'Ollama', 'Qwen2.5'],
        links: [
          { label: 'sprako.app öffnen', href: 'https://sprako.app' },
          { label: 'Projektseite', href: '/projects/rag-chatbot-german' },
        ],
      },
      {
        title: 'Neuronales Netz als In-Network-IDS in P4 (BMv2)',
        company: 'Maschinelles Lernen in programmierbaren Datenebenen',
        category: 'In-Network Intrusion Detection',
        summary:
          'Paket- und Flow-Features werden auf Festkomma quantisiert und direkt in der P4-Datenebene klassifiziert, vom Modelltraining bis zu Laufzeitmetriken unter BMv2.',
        highlights: [
          'Paket- und Flow-Features auf Festkomma quantisiert und direkt in der P4-Datenebene ausgewertet. Umfasst Modelltraining, Deployment und Erhebung von Laufzeitmetriken unter BMv2.',
          'BMv2-CLI-Runtime-Einträge werden automatisch aus dem Modell-JSON erzeugt. Deployment auf Single-Switch- und Multi-Switch-Topologien.',
          'Evaluation über reproduzierbare Skripte mit Confusion-Matrizen und einem Vergleich von Offline- und Online-Metriken.',
        ],
        tech: ['Python', 'P4', 'BMv2', 'Mininet', 'PyTorch'],
        links: [
          { label: 'GitHub-Repo', href: 'https://github.com/AnkitTalaviya/nn_p4_nids' },
          { label: 'Projektseite', href: '/projects/neural-network-ids-in-p4-bmv2' },
        ],
      },
    ],
  },
  experience: {
    kicker: 'Erfahrung',
    title: 'Berufserfahrung.',
    text:
      'Drei Jahre als Frontend-Entwickler in Indien, für Desktop-, Web- und Mobile-Produkte.',
    items: [
      {
        company: 'Addicted Technologies',
        role: 'Frontend Developer & Team Lead',
        period: 'Jul 2023 - Jul 2024',
        location: 'Gandhinagar, Indien',
        summary: 'Desktop-Produkte mit ElectronJS, ReactJS und Three.js.',
        achievements: [
          '3D-Emp (ElectronJS, Three.js): GLTF-Hausmodelle aus Blender geladen, Wandauswahl per Raycasting und Texturwechsel zur Laufzeit (MeshStandardMaterial), ohne die Render-Schleife zu unterbrechen. Level of Detail gegen Framerate-Einbrüche.',
          'FiMA (ElectronJS, ReactJS): Desktop-Anwendung für persönliche Finanzen mit Diagrammen, Kategorienanalyse und Backup über die Google-Drive-API.',
          'LLM-gestützte Entwicklungswerkzeuge im Team eingeführt, unter anderem für Code-Review-Unterstützung und Testfallgenerierung.',
          'Ein vierköpfiges Entwicklungsteam geleitet (zwei Entwickler, ein Designer, ein QA), inklusive Sprint-Planung und Code Reviews über beide Produkte hinweg.',
        ],
      },
      {
        company: 'Crest Infotech',
        role: 'Frontend Developer, initially part-time',
        period: 'Jul 2021 - Jun 2023',
        location: 'Ahmedabad, Indien',
        summary: 'ElectronJS-, ReactJS- und React-Native-Arbeit an mehreren Kundenprodukten.',
        achievements: [
          'CrestPMS: Fehler bei Multi-Monitor-Screenshots durch Neukonfiguration der desktopCapturer-API von Electron behoben. Tastatur- und Maus-Tracking über ioHook auf macOS (M1 und Intel), Linux und Windows wiederhergestellt.',
          'CrestMeds: vollständig in React Native gebaut, mit React-Navigation-Stacks, Tab-Flows und Deep Linking. Eingereicht als Bachelor-Abschlussprojekt.',
          'Pawfect Admin Panel (ReactJS, Socket.IO): Echtzeit-Chat, Infinite Scrolling, Buchungs-API und rollenbasierte Zugriffskontrolle.',
          'Am Room-Key-Hotelmanagementsystem mitgearbeitet, ProductY nach ReactJS migriert und einen SVG-Vektorgrafik-Editor gebaut.',
          'Externe KI-APIs für Bild- und Textverarbeitung in Kundenprojekte integriert, unter anderem OCR-gestützte Dokumentenerfassung.',
        ],
      },
    ],
  },
  skills: {
    kicker: 'Skills',
    title: 'Skills.',
    text: 'Gruppiert wie in meinem Lebenslauf.',
    groups: [
      {
        title: 'AI, ML & LLM',
        items: [
          'Machine Learning',
          'Google Gemini (Multi-Key, Failover)',
          'Anthropic API',
          'Prompt- und Context-Engineering',
          'Modellquantisierung',
        ],
      },
      {
        title: 'RAG & lokale Modelle',
        items: [
          'ChromaDB',
          'Sentence-Transformers (mehrsprachig)',
          'Embeddings',
          'Retrieval-Pipelines',
          'Ollama (Qwen2.5)',
        ],
      },
      {
        title: 'Programmierung & Frontend',
        items: [
          'Python',
          'JavaScript',
          'TypeScript',
          'C++',
          'HTML/CSS',
          'ReactJS',
          'React Native',
          'Three.js',
          'ElectronJS',
          'Capacitor 8',
          'Vite',
          'Tailwind CSS',
          'Redux',
        ],
      },
      {
        title: 'Backend & Daten',
        items: [
          'Node.js',
          'Express.js',
          'MongoDB',
          'Mongoose',
          'PostgreSQL',
          'MySQL',
          'Appwrite',
          'Firebase',
          'REST APIs',
        ],
      },
      {
        title: 'DevOps & Netzwerke',
        items: [
          'Git',
          'GitHub',
          'Docker',
          'Docker Compose',
          'Linux',
          'Jira',
          'P4',
          'BMv2',
          'Mininet',
        ],
      },
    ],
  },
  education: {
    kicker: 'Ausbildung & Sprachen',
    title: 'Ausbildung und Sprachen.',
    items: [
      {
        title: 'M.Sc. Research in Computer and Systems Engineering',
        place: 'Technische Universität Ilmenau',
        period: 'Okt 2024 - voraussichtlich 2027',
        notes: [
          'Schwerpunkt Network Intrusion Detection Systems und maschinelles Lernen in programmierbaren Netzen.',
          'Mitglied im BMBF-geförderten Programm Internationale Ingenieure für Thüringen.',
        ],
      },
      {
        title: 'B.E. Computer Science and Engineering',
        place: 'Gujarat Technological University, Indien',
        period: 'Jul 2019 - Jun 2023',
        notes: [
          'CGPA 7,8 von 10, First Class with Distinction. Deutsche Entsprechung etwa 2,3.',
        ],
      },
    ],
    languagesTitle: 'Sprachen',
    spokenLanguages: [
      'Deutsch - B1, auf dem Weg zu B2',
      'Englisch - C1',
      'Hindi - Muttersprache',
      'Gujarati - Muttersprache',
    ],
    documentsTitle: 'Dokumente',
    documentsText: 'Lebenslauf und Projektdetails.',
    documents: [
      { label: 'Lebenslauf PDF', href: '/documents/ankit-talaviya-resume.pdf' },
      { label: 'Projektdetails PDF', href: '/documents/ankit-talaviya-project-details.pdf' },
    ],
  },
  contact: {
    kicker: 'Kontakt',
    title: 'Offen für Rollen als Full-Stack AI Engineer.',
    text: 'Per E-Mail erreichen Sie mich am schnellsten.',
    location: 'Erfurt, Deutschland',
    actions: {
      email: 'E-Mail senden',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      backToTop: 'Nach oben',
    },
  },
  scene: {
    paletteAriaLabel: 'Farbpaletten für den Avatar',
    paletteSuffix: 'Palette',
    maximize: 'Ansicht vergrößern',
    restore: 'Ansicht wiederherstellen',
    loading: '3D-Modell wird geladen...',
    error: 'Das 3D-Modell konnte nicht geladen werden.',
    tailoringTitle: 'Outfit wird angepasst',
    tailoringText: 'Deine ausgewählte Palette wird angewendet',
  },
};

const frenchCopy: AppCopy = {
  ...englishCopy,
  htmlLang: 'fr',
  nav: {
    menu: 'Menu',
    about: 'A propos',
    experience: 'Experience',
    portfolio: 'Projets',
    project: 'Pages projet',
    skills: 'Competences',
    contact: 'Contact',
  },
  languageSwitcher: {
    label: 'Langue',
    ariaLabel: 'Choix de la langue',
  },
  theme: {
    label: 'Theme',
    panelTitle: 'Themes',
    selectorAriaLabel: 'Selection du theme',
    groups: {
      dark: 'Sombre',
      light: 'Clair',
    },
    tones: {
      warm: 'Chaleureux',
      cool: 'Frais',
      calm: 'Calme',
      clean: 'Net',
      earthy: 'Naturel',
    },
  },
  hero: {
    eyebrow: 'Full-Stack AI Engineer | Etudiant en M.Sc. | TU Ilmenau',
    title:
      'Full-Stack AI Engineer sur les applications LLM, les pipelines RAG et le machine learning dans les reseaux programmables.',
    text:
      "Je suis Ankit Talaviya. J'ai trois ans d'experience professionnelle en developpement logiciel et je prepare un M.Sc. Research in Computer and Systems Engineering a TU Ilmenau. Je travaille sur des applications LLM avec bascule multi-fournisseurs, des pipelines RAG bases sur ChromaDB et Sentence-Transformers, et des reseaux de neurones quantifies pour les plans de donnees P4. Mon produit, sprako.app, est en beta.",
    quickFacts: [
      'Base a Erfurt, Allemagne',
      'Trois ans d experience professionnelle en developpement logiciel',
      'sprako.app est en beta',
    ],
    stats: [
      { value: '3', label: 'ans d experience professionnelle en developpement logiciel' },
      { value: '10-15', label: 'utilisateurs beta sur sprako.app' },
      { value: '2027', label: 'fin de M.Sc. prevue a TU Ilmenau' },
    ],
    actions: {
      email: "M'envoyer un email",
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      resume: 'CV PDF',
    },
  },
  about: {
    kicker: 'A propos',
    title: 'Sur quoi je travaille.',
    text:
      'Trois ans de developpement logiciel professionnel, appliques aujourd hui aux applications LLM, aux pipelines de recherche et au machine learning dans les plans de donnees reseau.',
    cards: [
      {
        title: 'Applications LLM',
        copy:
          "Sprako fonctionne avec l'API Google Gemini. Les cles sont validees une par une, avec bascule automatique, cooldowns et retries limites. L'application reste entierement utilisable sans cle configuree.",
      },
      {
        title: 'RAG et modeles locaux',
        copy:
          "Vocabulaire allemand et phrases d'exemple indexes dans ChromaDB avec des embeddings Sentence-Transformer multilingues. La generation passe par l'API Anthropic, avec Qwen2.5 en local via Ollama comme repli hors ligne.",
      },
      {
        title: 'ML dans les reseaux programmables',
        copy:
          'Features de paquets et de flux quantifiees en virgule fixe et evaluees directement dans le plan de donnees P4. Couvre entrainement, deploiement et metriques runtime sous BMv2.',
      },
    ],
  },
  experience: {
    ...englishCopy.experience,
    kicker: 'Experience',
    title: 'Experience professionnelle.',
    text: 'Trois ans comme developpeur frontend en Inde, sur des produits desktop, web et mobiles.',
  },
  projects: {
    ...englishCopy.projects,
    kicker: 'Projets',
    title: 'Projets.',
    text:
      'Une plateforme d apprentissage de l allemand en beta, un chatbot RAG pour le vocabulaire allemand, et un reseau de neurones qui fait office de systeme de detection d intrusion dans un plan de donnees P4.',
  },
  skills: {
    ...englishCopy.skills,
    kicker: 'Competences',
    title: 'Competences.',
    text: 'Groupees comme sur mon CV.',
  },
  education: {
    ...englishCopy.education,
    kicker: 'Formation et langues',
    title: 'Formation et langues.',
    languagesTitle: 'Langues',
    spokenLanguages: [
      'Allemand - B1, en route vers B2',
      'Anglais - C1',
      'Hindi - langue maternelle',
      'Gujarati - langue maternelle',
    ],
    documentsTitle: 'Documents',
    documentsText: 'CV et details des projets.',
    documents: [
      { label: 'CV PDF', href: '/documents/ankit-talaviya-resume.pdf' },
      { label: 'Details des projets PDF', href: '/documents/ankit-talaviya-project-details.pdf' },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Ouvert aux postes de Full-Stack AI Engineer.',
    text: 'Le plus simple est de me joindre par email.',
    location: 'Erfurt, Allemagne',
    actions: {
      email: 'Envoyer un email',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      backToTop: 'Retour en haut',
    },
  },
  scene: {
    paletteAriaLabel: "Couleurs des vetements de l'avatar",
    paletteSuffix: 'palette',
    maximize: 'Agrandir la scene',
    restore: 'Restaurer la scene',
    loading: 'Chargement du modele 3D...',
    error: 'Le modele 3D na pas pu etre charge.',
    tailoringTitle: 'Ajustement de la tenue',
    tailoringText: 'Application de la palette selectionnee',
  },
};

const spanishCopy: AppCopy = {
  ...englishCopy,
  htmlLang: 'es',
  nav: {
    menu: 'Menu',
    about: 'Sobre mi',
    experience: 'Experiencia',
    portfolio: 'Proyectos',
    project: 'Paginas de proyecto',
    skills: 'Habilidades',
    contact: 'Contacto',
  },
  languageSwitcher: {
    label: 'Idioma',
    ariaLabel: 'Selector de idioma',
  },
  theme: {
    label: 'Tema',
    panelTitle: 'Temas',
    selectorAriaLabel: 'Selector de tema',
    groups: {
      dark: 'Oscuro',
      light: 'Claro',
    },
    tones: {
      warm: 'Calido',
      cool: 'Fresco',
      calm: 'Sereno',
      clean: 'Limpio',
      earthy: 'Natural',
    },
  },
  hero: {
    eyebrow: 'Full-Stack AI Engineer | Estudiante de M.Sc. | TU Ilmenau',
    title:
      'Full-Stack AI Engineer en aplicaciones LLM, pipelines RAG y machine learning en redes programables.',
    text:
      'Soy Ankit Talaviya. Tengo tres anos de experiencia profesional en desarrollo de software y estudio el M.Sc. Research in Computer and Systems Engineering en TU Ilmenau. Trabajo en aplicaciones LLM con conmutacion entre varios proveedores, pipelines RAG basados en ChromaDB y Sentence-Transformers, y redes neuronales cuantizadas para planos de datos P4. Mi propio producto, sprako.app, esta en beta.',
    quickFacts: [
      'Ubicado en Erfurt, Alemania',
      'Tres anos de experiencia profesional en desarrollo de software',
      'sprako.app esta en beta',
    ],
    stats: [
      { value: '3', label: 'anos de experiencia profesional en desarrollo de software' },
      { value: '10-15', label: 'usuarios beta en sprako.app' },
      { value: '2027', label: 'finalizacion prevista del M.Sc. en TU Ilmenau' },
    ],
    actions: {
      email: 'Enviar email',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      resume: 'CV PDF',
    },
  },
  about: {
    kicker: 'Sobre mi',
    title: 'En que trabajo.',
    text:
      'Tres anos de desarrollo de software profesional, aplicados hoy a aplicaciones LLM, pipelines de recuperacion y machine learning dentro de planos de datos de red.',
    cards: [
      {
        title: 'Aplicaciones LLM',
        copy:
          'Sprako funciona sobre la API de Google Gemini. Las claves se validan una a una, con conmutacion automatica, cooldowns y reintentos limitados. La aplicacion sigue siendo plenamente utilizable sin ninguna clave configurada.',
      },
      {
        title: 'RAG y modelos locales',
        copy:
          'Vocabulario aleman y frases de ejemplo indexados en ChromaDB con embeddings multilingues de Sentence-Transformers. La generacion pasa por la API de Anthropic, con Qwen2.5 local mediante Ollama como respaldo sin conexion.',
      },
      {
        title: 'ML en redes programables',
        copy:
          'Caracteristicas de paquetes y flujos cuantizadas a punto fijo y evaluadas directamente en el plano de datos P4. Cubre entrenamiento, despliegue y metricas de ejecucion en BMv2.',
      },
    ],
  },
  experience: {
    ...englishCopy.experience,
    kicker: 'Experiencia',
    title: 'Experiencia profesional.',
    text: 'Tres anos como desarrollador frontend en India, en productos desktop, web y moviles.',
  },
  projects: {
    ...englishCopy.projects,
    kicker: 'Proyectos',
    title: 'Proyectos.',
    text:
      'Una plataforma para aprender aleman en beta, un chatbot RAG para vocabulario aleman y una red neuronal que funciona como sistema de deteccion de intrusiones dentro de un plano de datos P4.',
  },
  skills: {
    ...englishCopy.skills,
    kicker: 'Habilidades',
    title: 'Habilidades.',
    text: 'Agrupadas igual que en mi CV.',
  },
  education: {
    ...englishCopy.education,
    kicker: 'Educacion e idiomas',
    title: 'Educacion e idiomas.',
    languagesTitle: 'Idiomas',
    spokenLanguages: [
      'Aleman - B1, camino a B2',
      'Ingles - C1',
      'Hindi - lengua materna',
      'Gujarati - lengua materna',
    ],
    documentsTitle: 'Documentos',
    documentsText: 'CV y detalles de proyectos.',
    documents: [
      { label: 'CV PDF', href: '/documents/ankit-talaviya-resume.pdf' },
      { label: 'Detalles de proyectos PDF', href: '/documents/ankit-talaviya-project-details.pdf' },
    ],
  },
  contact: {
    kicker: 'Contacto',
    title: 'Abierto a puestos de Full-Stack AI Engineer.',
    text: 'La via mas rapida para contactarme es el email.',
    location: 'Erfurt, Alemania',
    actions: {
      email: 'Enviar email',
      linkedIn: 'LinkedIn',
      gitHub: 'GitHub',
      backToTop: 'Volver arriba',
    },
  },
  scene: {
    paletteAriaLabel: 'Colores de ropa del avatar',
    paletteSuffix: 'paleta',
    maximize: 'Ampliar escena',
    restore: 'Restaurar escena',
    loading: 'Cargando modelo 3D...',
    error: 'No se pudo cargar el modelo 3D.',
    tailoringTitle: 'Ajustando atuendo',
    tailoringText: 'Aplicando la paleta seleccionada',
  },
};

export const appCopy: Record<LanguageCode, AppCopy> = {
  en: englishCopy,
  de: germanCopy,
  fr: frenchCopy,
  es: spanishCopy,
};
