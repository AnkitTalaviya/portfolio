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
    Bold: 'KrÃ¤ftig',
    Green: 'GrÃ¼n',
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

export const getInitialLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') {
    return 'en';
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

  return 'en';
};

const englishCopy: AppCopy = {
  htmlLang: 'en',
  nav: {
    menu: 'Menu',
    about: 'About',
    experience: 'Experience',
    portfolio: 'Portfolio',
    project: 'Project',
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
    eyebrow: 'Full Stack Software Developer | M.Sc. Student | TU Ilmenau',
    title: 'Full stack software developer focused on JavaScript, React, Node.js, and MongoDB.',
    text:
      'I am Ankit Talaviya, a master\'s student in Research in Computer and Systems Engineering at TU Ilmenau with hands-on experience in ReactJS, React Native, ElectronJS, Three.js, JavaScript, Node.js, and MongoDB. I work as a full stack software developer and I am currently looking for a working student role in software development where I can keep building practical, high-quality user experiences across both frontend and backend systems.',
    quickFacts: [
      'Based in Ilmenau, Thuringia, Germany',
      'Open to working student software roles',
      'Full stack JavaScript developer with Node.js and MongoDB skills',
    ],
    stats: [
      { value: '3+', label: 'years in professional product teams' },
      { value: '07', label: 'projects across desktop, web, and mobile' },
      {
        value: '06',
        label: 'core stack: JavaScript, React, Node.js, MongoDB, ElectronJS, Three.js',
      },
    ],
    actions: {
      email: 'Email me',
      linkedIn: 'LinkedIn',
      resume: 'Resume PDF',
    },
  },
  about: {
    kicker: 'About',
    title: 'Full stack software developer.',
    text:
      'I build web, desktop, and mobile applications with JavaScript. My work includes frontend interfaces, backend integration, state management, and product features used by real teams.',
    cards: [
      {
        title: 'Current focus',
        copy:
          'Master\'s student at TU Ilmenau, looking for a working student role in software development.',
      },
      {
        title: 'Project types',
        copy:
          'Experience with web applications, React Native mobile apps, Electron desktop software, and Three.js-based 3D interfaces.',
      },
      {
        title: 'Full stack work',
        copy:
          'Comfortable with React on the frontend and Node.js, REST APIs, and MongoDB on the backend.',
      },
    ],
  },
  experience: {
    kicker: 'Experience',
    title: 'Work experience.',
    text:
      'Professional experience across desktop software, admin systems, mobile apps, and 3D product interfaces.',
    items: [
      {
        company: 'Addicted Technologies',
        role: 'Frontend Developer, Team Leader',
        period: 'Jul 2023 - Jul 2024',
        location: 'Gandhinagar, India',
        summary:
          'Delivered desktop-first product experiences with ReactJS, ElectronJS, and Three.js, including immersive 3D visualization and finance tooling.',
        achievements: [
          'Built 3D-Emp, a house remodeling desktop app that loads Blender models, supports wall selection, and updates materials in real time.',
          'Implemented FiMA finance workflows for expenses, income, categorization, charts, and Google Drive backup inside a React and Electron environment.',
          'Led a small delivery team and coordinated design, QA, and code reviews to keep releases stable and maintainable.',
        ],
      },
      {
        company: 'Crest Infotech',
        role: 'Working Student, Frontend Developer',
        period: 'Jul 2021 - Jun 2023',
        location: 'Ahmedabad, India',
        summary:
          'Grew from working student to frontend contributor across ElectronJS, ReactJS, and React Native products, with a strong focus on debugging and shipping practical features.',
        achievements: [
          'Maintained CrestPMS activity-tracking software with multi-monitor screenshot capture, auto-logout handling, and stable mouse and keyboard tracking across Linux, Mac, and Windows.',
          'Built responsive React and Bootstrap admin experiences with real-time chat, notifications, and infinite scrolling in the Pawfect Admin Panel.',
          'Contributed to ProductY, Room Key, and CrestMeds through React migration, API integration, role-based access, navigation flows, and UI implementation.',
        ],
      },
    ],
  },
  projects: {
    kicker: 'Portfolio',
    title: 'Portfolio.',
    text: 'Selected product and delivery work across Addicted Technologies and Crest Infotech.',
    items: [
      {
        title: '3D-Emp',
        company: 'Addicted Technologies',
        category: 'Desktop software',
        summary:
          'Interactive house remodeling software that loads Blender-built homes into a Three.js scene so users can preview renovation textures in real time.',
        highlights: [
          'Loaded 3D models, added camera controls, and enabled scene exploration.',
          'Used raycasting to identify wall meshes and update textures dynamically without interrupting the experience.',
          'Improved rendering performance with lower polygon models, LOD thinking, and profiling-led fixes.',
        ],
        tech: ['ReactJS', 'ElectronJS', 'Three.js', 'Blender', 'Redux'],
      },
      {
        title: 'FiMA Finance Management',
        company: 'Addicted Technologies',
        category: 'Desktop software',
        summary:
          'Personal finance desktop application for tracking income and expenses, categorizing transactions, and visualizing patterns with dynamic charts.',
        highlights: [
          'Created the application structure, navigation shell, and responsive layouts for desktop use.',
          'Built transaction forms, validation, category flows, and chart updates tied to user-entered data and date ranges.',
          'Added Google Drive backup integration for safer recovery and long-term accessibility.',
        ],
        tech: ['ReactJS', 'ElectronJS', 'Redux', 'Charts', 'Google Drive API'],
      },
      {
        title: 'CrestPMS',
        company: 'Crest Infotech',
        category: 'Desktop software',
        summary:
          'Productivity and project management software that captures screenshots, tracks activity, and helps teams monitor engagement across devices.',
        highlights: [
          'Investigated Electron desktopCapturer limitations and rebuilt support for multi-monitor screenshot capture.',
          'Fixed ioHook-based keyboard and mouse activity tracking across Mac, Linux, and Windows configurations.',
          'Helped test and stabilize newer Electron builds to improve cross-platform reliability.',
        ],
        tech: ['ElectronJS', 'desktopCapturer', 'ioHook', 'Redux'],
        links: [{ label: 'Visit crestpms.com', href: 'https://www.crestpms.com/' }],
      },
      {
        title: 'Pawfect Admin Panel',
        company: 'Crest Infotech',
        category: 'Web application',
        summary:
          'Responsive admin dashboard for customer and employee management, built around real-time communication and operational visibility.',
        highlights: [
          'Set up the project structure and implemented the UI with ReactJS and Bootstrap from scratch.',
          'Integrated ioSocket for instant chat and notifications between administrators, employees, and customers.',
          'Added infinite scrolling and resolved production issues to keep large datasets usable and responsive.',
        ],
        tech: ['ReactJS', 'Bootstrap', 'ioSocket', 'Redux'],
      },
      {
        title: 'CrestMeds Clone',
        company: 'Crest Infotech',
        category: 'Mobile application',
        summary:
          'React Native pharmacy clone inspired by Netmeds, designed to support browsing, search, cart flows, and a polished cross-platform layout.',
        highlights: [
          'Initialized the mobile architecture and configured key development dependencies.',
          'Implemented React Navigation stacks, tab flows, and screen transitions for an intuitive mobile experience.',
          'Translated product and account journeys into responsive React Native UI components.',
        ],
        tech: ['React Native', 'React Navigation', 'Redux'],
        links: [
          {
            label: 'View project page',
            href: 'https://www.crestinfotech.com/netmeds-pharmacy-clone-app/',
          },
        ],
      },
      {
        title: 'Room Key Hotel Management System',
        company: 'Crest Infotech',
        category: 'Web application',
        summary:
          'Hotel booking and room management platform for admins and branch managers with role-aware workflows and centralized room data.',
        highlights: [
          'Integrated room and booking APIs to keep availability and booking data synchronized with the frontend.',
          'Used Redux to coordinate complex shared state and dynamic updates across the application.',
          'Implemented role-based access so administrators and branch managers only saw the actions relevant to them.',
        ],
        tech: ['ReactJS', 'Redux', 'API Integration', 'Access Control'],
      },
      {
        title: 'ProductY',
        company: 'Crest Infotech',
        category: 'Web application',
        summary:
          'Web-based product and catalog management platform that helps teams create, manage, and publish product information online.',
        highlights: [
          'Started with bug resolution work and grew into broader product development and optimization.',
          'Contributed to the project\'s migration into ReactJS for better maintainability and performance.',
          'Built a vector graphics editor and full CRUD pages for product data management.',
        ],
        tech: ['ReactJS', 'Redux', 'CRUD', 'Vector Graphics'],
        links: [
          { label: 'Product website', href: 'https://producty.com/' },
          { label: 'Open app', href: 'https://app.producty.com/' },
        ],
      },
    ],
  },
  skills: {
    kicker: 'Technical Skills',
    title: 'Skills.',
    text:
      'Main technologies: JavaScript, TypeScript, React, Node.js, Express.js, MongoDB, React Native, ElectronJS, Three.js, and REST APIs.',
    groups: [
      {
        title: 'Frontend',
        items: ['ReactJS', 'React Native', 'Three.js', 'ElectronJS', 'Bootstrap', 'Redux'],
      },
      {
        title: 'Backend',
        items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'API Integration'],
      },
      {
        title: 'Tools & Platforms',
        items: [
          'Docker',
          'Git',
          'GitHub',
          'Firebase',
          'Linux',
          'Blender',
          'Jira',
          'Postman',
          'Swagger',
        ],
      },
      {
        title: 'Programming',
        items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'C++'],
      },
    ],
  },
  education: {
    kicker: 'Education & Languages',
    title: 'Education and languages.',
    items: [
      {
        title: 'M.Sc. Research in Computer and Systems Engineering',
        place: 'Technische Universitat Ilmenau',
        period: 'Oct 2024 - Present',
        notes: [
          'Currently studying in Ilmenau, Germany.',
          'Member of Internationale Ingenieure fur Thuringen, a BMBF-funded initiative.',
        ],
      },
      {
        title: 'B.E. Computer Science and Engineering',
        place: 'Government Engineering College, Patan / Gujarat Technological University',
        period: 'Jul 2019 - Jun 2023',
        notes: [
          'Graduated with a 2.1 GPA equivalent.',
          'Bachelor project: CrestMeds clone in React Native.',
        ],
      },
    ],
    languagesTitle: 'Languages',
    spokenLanguages: [
      'English - C1',
      'German - A2, currently improving',
      'Hindi - Native',
      'Gujarati - Native',
    ],
    documentsTitle: 'Documents',
    documentsText: 'Resume and project details.',
    documents: [
      { label: 'Resume PDF', href: '/documents/ankit-talaviya-resume.pdf' },
      { label: 'Project details PDF', href: '/documents/ankit-talaviya-project-details.pdf' },
    ],
  },
  contact: {
    kicker: 'Contact',
    title: 'Open to software development opportunities.',
    text:
      'If you are hiring for a working student role or a full stack software role, I would be happy to connect.',
    location: 'Ilmenau, Thuringia, Germany',
    actions: {
      email: 'Send email',
      linkedIn: 'LinkedIn',
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
    menu: 'MenÃ¼',
    about: 'Ãœber mich',
    experience: 'Erfahrung',
    portfolio: 'Portfolio',
    project: 'Projekt',
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
    selectorAriaLabel: 'Thema auswÃ¤hlen',
    groups: {
      dark: 'Dunkel',
      light: 'Hell',
    },
    tones: {
      warm: 'Warm',
      cool: 'KÃ¼hl',
      calm: 'Ruhig',
      clean: 'Klar',
      earthy: 'NatÃ¼rlich',
    },
  },
  hero: {
    eyebrow: 'Full-Stack-Softwareentwickler | M.Sc.-Student | TU Ilmenau',
    title: 'Full-Stack-Softwareentwickler mit Fokus auf JavaScript, React, Node.js und MongoDB.',
    text:
      'Ich bin Ankit Talaviya, Masterstudent im Studiengang Research in Computer and Systems Engineering an der TU Ilmenau. Ich habe praktische Erfahrung mit ReactJS, React Native, ElectronJS, Three.js, JavaScript, Node.js und MongoDB. Aktuell suche ich eine Werkstudentenstelle in der Softwareentwicklung, in der ich weiterhin praxisnahe und hochwertige Nutzererlebnisse im Frontend und Backend entwickeln kann.',
    quickFacts: [
      'Wohnhaft in Ilmenau, ThÃ¼ringen, Deutschland',
      'Offen fÃ¼r Werkstudentenstellen in der Softwareentwicklung',
      'Full-Stack-JavaScript-Entwickler mit Kenntnissen in Node.js und MongoDB',
    ],
    stats: [
      { value: '3+', label: 'Jahre Erfahrung in professionellen Produktteams' },
      { value: '07', label: 'Projekte fÃ¼r Desktop, Web und Mobile' },
      {
        value: '06',
        label: 'Kern-Stack: JavaScript, React, Node.js, MongoDB, ElectronJS, Three.js',
      },
    ],
    actions: {
      email: 'E-Mail senden',
      linkedIn: 'LinkedIn',
      resume: 'Lebenslauf PDF',
    },
  },
  about: {
    kicker: 'Ãœber mich',
    title: 'Full-Stack-Softwareentwickler.',
    text:
      'Ich entwickle Web-, Desktop- und Mobile-Anwendungen mit JavaScript. Meine Arbeit umfasst Frontend-OberflÃ¤chen, Backend-Integration, State Management und Produktfunktionen, die von echten Teams genutzt werden.',
    cards: [
      {
        title: 'Aktueller Fokus',
        copy:
          'Masterstudent an der TU Ilmenau und auf der Suche nach einer Werkstudentenstelle in der Softwareentwicklung.',
      },
      {
        title: 'Projekttypen',
        copy:
          'Erfahrung mit Webanwendungen, React-Native-Apps, Electron-Desktop-Software und 3D-OberflÃ¤chen auf Basis von Three.js.',
      },
      {
        title: 'Full-Stack-Arbeit',
        copy:
          'Sicher im Umgang mit React im Frontend sowie Node.js, REST-APIs und MongoDB im Backend.',
      },
    ],
  },
  experience: {
    kicker: 'Erfahrung',
    title: 'Berufserfahrung.',
    text:
      'Berufserfahrung in Desktop-Software, Admin-Systemen, mobilen Apps und 3D-ProduktoberflÃ¤chen.',
    items: [
      {
        company: 'Addicted Technologies',
        role: 'Frontend Developer, Team Leader',
        period: 'Jul 2023 - Jul 2024',
        location: 'Gandhinagar, Indien',
        summary:
          'Entwicklung von Desktop-orientierten Produkterlebnissen mit ReactJS, ElectronJS und Three.js, einschlieÃŸlich immersiver 3D-Visualisierung und Finance-Tools.',
        achievements: [
          '3D-Emp entwickelt, eine Desktop-App fÃ¼r Hausumbau, die Blender-Modelle lÃ¤dt, WÃ¤nde auswÃ¤hlbar macht und Materialien in Echtzeit aktualisiert.',
          'FiMA-Workflows fÃ¼r Ausgaben, Einnahmen, Kategorisierung, Diagramme und Google-Drive-Backup in einer React- und Electron-Umgebung umgesetzt.',
          'Ein kleines Team geleitet sowie Design, QA und Code Reviews koordiniert, um Releases stabil und wartbar zu halten.',
        ],
      },
      {
        company: 'Crest Infotech',
        role: 'Werkstudent, Frontend Developer',
        period: 'Jul 2021 - Jun 2023',
        location: 'Ahmedabad, Indien',
        summary:
          'Vom Werkstudenten zum Frontend-Entwickler fÃ¼r ElectronJS-, ReactJS- und React-Native-Produkte gewachsen, mit starkem Fokus auf Debugging und praxisnahe Features.',
        achievements: [
          'CrestPMS gepflegt, inklusive Multi-Monitor-Screenshot-Erfassung, Auto-Logout-Handling sowie stabiler Maus- und Tastaturverfolgung unter Linux, Mac und Windows.',
          'Responsive Admin-OberflÃ¤chen mit React und Bootstrap aufgebaut, inklusive Echtzeit-Chat, Benachrichtigungen und Infinite Scrolling im Pawfect Admin Panel.',
          'Zu ProductY, Room Key und CrestMeds durch React-Migration, API-Integration, rollenbasierte Zugriffe, NavigationsflÃ¼sse und UI-Implementierung beigetragen.',
        ],
      },
    ],
  },
  projects: {
    kicker: 'Portfolio',
    title: 'Portfolio.',
    text:
      'Ausgewaehlte Arbeiten aus meiner Zeit bei Addicted Technologies und Crest Infotech.',
    items: [
      {
        title: '3D-Emp',
        company: 'Addicted Technologies',
        category: 'Desktop-Software',
        summary:
          'Interaktive Software fÃ¼r Hausumbau, die mit Blender erstellte HÃ¤user in eine Three.js-Szene lÃ¤dt, damit Nutzer Renovierungstexturen in Echtzeit sehen kÃ¶nnen.',
        highlights: [
          '3D-Modelle geladen, Kamerasteuerung ergÃ¤nzt und die Szenenerkundung ermÃ¶glicht.',
          'Raycasting genutzt, um Wand-Meshes zu identifizieren und Texturen dynamisch zu aktualisieren.',
          'Rendering-Leistung durch polygonÃ¤rmere Modelle, LOD-AnsÃ¤tze und profilgestÃ¼tzte Optimierungen verbessert.',
        ],
        tech: ['ReactJS', 'ElectronJS', 'Three.js', 'Blender', 'Redux'],
      },
      {
        title: 'FiMA Finance Management',
        company: 'Addicted Technologies',
        category: 'Desktop-Software',
        summary:
          'Desktop-Anwendung fÃ¼r persÃ¶nliche Finanzen zum Erfassen von Einnahmen und Ausgaben, Kategorisieren von Transaktionen und Visualisieren von Mustern mit dynamischen Diagrammen.',
        highlights: [
          'Anwendungsstruktur, Navigation und responsive Layouts fÃ¼r den Desktop erstellt.',
          'Transaktionsformulare, Validierung, KategorienflÃ¼sse und Diagrammaktualisierungen anhand von Benutzerdaten und Datumsbereichen entwickelt.',
          'Google-Drive-Backup fÃ¼r sicherere Wiederherstellung und langfristige VerfÃ¼gbarkeit integriert.',
        ],
        tech: ['ReactJS', 'ElectronJS', 'Redux', 'Charts', 'Google Drive API'],
      },
      {
        title: 'CrestPMS',
        company: 'Crest Infotech',
        category: 'Desktop-Software',
        summary:
          'ProduktivitÃ¤ts- und Projektmanagement-Software, die Screenshots erfasst, AktivitÃ¤t verfolgt und Teams bei der Beobachtung der Nutzung auf verschiedenen GerÃ¤ten unterstÃ¼tzt.',
        highlights: [
          'EinschrÃ¤nkungen von Electron desktopCapturer untersucht und die UnterstÃ¼tzung fÃ¼r Multi-Monitor-Screenshots neu aufgebaut.',
          'Maus- und Tastaturtracking mit ioHook fÃ¼r Mac, Linux und Windows stabilisiert.',
          'Neuere Electron-Versionen getestet und stabilisiert, um die plattformÃ¼bergreifende ZuverlÃ¤ssigkeit zu verbessern.',
        ],
        tech: ['ElectronJS', 'desktopCapturer', 'ioHook', 'Redux'],
        links: [{ label: 'crestpms.com besuchen', href: 'https://www.crestpms.com/' }],
      },
      {
        title: 'Pawfect Admin Panel',
        company: 'Crest Infotech',
        category: 'Webanwendung',
        summary:
          'Responsives Admin-Dashboard fÃ¼r Kunden- und Mitarbeitermanagement mit Fokus auf Echtzeitkommunikation und operative Transparenz.',
        highlights: [
          'Projektstruktur aufgebaut und die UI mit ReactJS und Bootstrap von Grund auf umgesetzt.',
          'ioSocket fÃ¼r Sofort-Chat und Benachrichtigungen zwischen Administratoren, Mitarbeitenden und Kunden integriert.',
          'Infinite Scrolling ergÃ¤nzt und Produktionsprobleme behoben, damit groÃŸe Datenmengen performant nutzbar bleiben.',
        ],
        tech: ['ReactJS', 'Bootstrap', 'ioSocket', 'Redux'],
      },
      {
        title: 'CrestMeds Clone',
        company: 'Crest Infotech',
        category: 'Mobile Anwendung',
        summary:
          'React-Native-Apothekenklon nach dem Vorbild von Netmeds, entwickelt fÃ¼r Browsing, Suche, WarenkorbablÃ¤ufe und ein sauberes plattformÃ¼bergreifendes Layout.',
        highlights: [
          'Mobile Architektur initialisiert und zentrale EntwicklungsabhÃ¤ngigkeiten konfiguriert.',
          'React-Navigation-Stacks, Tabs und BildschirmÃ¼bergÃ¤nge fÃ¼r eine intuitive mobile Nutzung umgesetzt.',
          'Produkt- und Account-Journeys in responsive React-Native-Komponenten Ã¼bersetzt.',
        ],
        tech: ['React Native', 'React Navigation', 'Redux'],
        links: [
          {
            label: 'Projektseite ansehen',
            href: 'https://www.crestinfotech.com/netmeds-pharmacy-clone-app/',
          },
        ],
      },
      {
        title: 'Room Key Hotel Management System',
        company: 'Crest Infotech',
        category: 'Webanwendung',
        summary:
          'Plattform fÃ¼r Hotelbuchung und Zimmermanagement fÃ¼r Administratoren und Filialleiter mit rollenbasierten AblÃ¤ufen und zentralen Zimmordaten.',
        highlights: [
          'Zimmer- und Buchungs-APIs integriert, damit VerfÃ¼gbarkeit und Buchungsdaten mit dem Frontend synchron bleiben.',
          'Redux verwendet, um komplexen gemeinsamen State und dynamische Aktualisierungen in der Anwendung zu steuern.',
          'Rollenbasierte Zugriffe umgesetzt, damit Administratoren und Filialleiter nur relevante Aktionen sehen.',
        ],
        tech: ['ReactJS', 'Redux', 'API Integration', 'Access Control'],
      },
      {
        title: 'ProductY',
        company: 'Crest Infotech',
        category: 'Webanwendung',
        summary:
          'Webbasierte Plattform fÃ¼r Produkt- und Katalogmanagement, mit der Teams Produktinformationen erstellen, verwalten und verÃ¶ffentlichen kÃ¶nnen.',
        highlights: [
          'Mit Fehlerbehebung gestartet und anschlieÃŸend an breiterer Produktentwicklung und Optimierung mitgearbeitet.',
          'Zur Migration des Projekts nach ReactJS beigetragen, um Wartbarkeit und Performance zu verbessern.',
          'Einen Vektorgrafik-Editor und vollstÃ¤ndige CRUD-Seiten fÃ¼r das Produktdatenmanagement entwickelt.',
        ],
        tech: ['ReactJS', 'Redux', 'CRUD', 'Vector Graphics'],
        links: [
          { label: 'Produktwebsite', href: 'https://producty.com/' },
          { label: 'App Ã¶ffnen', href: 'https://app.producty.com/' },
        ],
      },
    ],
  },
  skills: {
    kicker: 'Technische Skills',
    title: 'Skills.',
    text:
      'Wichtige Technologien: JavaScript, TypeScript, React, Node.js, Express.js, MongoDB, React Native, ElectronJS, Three.js und REST-APIs.',
    groups: [
      {
        title: 'Frontend',
        items: ['ReactJS', 'React Native', 'Three.js', 'ElectronJS', 'Bootstrap', 'Redux'],
      },
      {
        title: 'Backend',
        items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'API Integration'],
      },
      {
        title: 'Tools & Plattformen',
        items: ['Docker', 'Git', 'GitHub', 'Firebase', 'Linux', 'Blender', 'Jira', 'Postman', 'Swagger'],
      },
      {
        title: 'Programmierung',
        items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'C++'],
      },
    ],
  },
  education: {
    kicker: 'Ausbildung & Sprachen',
    title: 'Ausbildung und Sprachen.',
    items: [
      {
        title: 'M.Sc. Research in Computer and Systems Engineering',
        place: 'Technische UniversitÃ¤t Ilmenau',
        period: 'Okt 2024 - Heute',
        notes: [
          'Derzeit Studium in Ilmenau, Deutschland.',
          'Mitglied bei Internationale Ingenieure fÃ¼r ThÃ¼ringen, einer vom BMBF gefÃ¶rderten Initiative.',
        ],
      },
      {
        title: 'B.E. Computer Science and Engineering',
        place: 'Government Engineering College, Patan / Gujarat Technological University',
        period: 'Jul 2019 - Jun 2023',
        notes: [
          'Abschluss mit einem GPA-Ã„quivalent von 2,1.',
          'Bachelorprojekt: CrestMeds Clone in React Native.',
        ],
      },
    ],
    languagesTitle: 'Sprachen',
    spokenLanguages: [
      'Englisch - C1',
      'Deutsch - A2, aktuell im Ausbau',
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
    title: 'Offen fÃ¼r MÃ¶glichkeiten in der Softwareentwicklung.',
    text:
      'Wenn Sie eine Werkstudentenstelle oder eine Full-Stack-Softwareposition besetzen, freue ich mich Ã¼ber eine Nachricht.',
    location: 'Ilmenau, ThÃ¼ringen, Deutschland',
    actions: {
      email: 'E-Mail senden',
      linkedIn: 'LinkedIn',
      backToTop: 'Nach oben',
    },
  },
  scene: {
    paletteAriaLabel: 'Farbpaletten fÃ¼r den Avatar',
    paletteSuffix: 'Palette',
    maximize: 'Ansicht vergroessern',
    restore: 'Ansicht wiederherstellen',
    loading: '3D-Modell wird geladen...',
    error: 'Das 3D-Modell konnte nicht geladen werden.',
    tailoringTitle: 'Outfit wird angepasst',
    tailoringText: 'Deine ausgewÃ¤hlte Palette wird angewendet',
  },
};

const frenchCopy: AppCopy = {
  ...englishCopy,
  htmlLang: 'fr',
  nav: {
    menu: 'Menu',
    about: 'A propos',
    experience: 'Experience',
    portfolio: 'Portfolio',
    project: 'Projet',
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
    eyebrow: 'Developpeur logiciel full stack | Etudiant en M.Sc. | TU Ilmenau',
    title: 'Developpeur logiciel full stack axe sur JavaScript, React, Node.js et MongoDB.',
    text:
      "Je suis Ankit Talaviya, etudiant en master en Research in Computer and Systems Engineering a TU Ilmenau. J'ai une experience pratique avec ReactJS, React Native, ElectronJS, Three.js, JavaScript, Node.js et MongoDB. Je recherche actuellement un poste de working student en developpement logiciel pour continuer a creer des experiences utiles et de haute qualite cote frontend et backend.",
    quickFacts: [
      'Base a Ilmenau, Thuringe, Allemagne',
      'Ouvert aux postes de working student en developpement logiciel',
      'Developpeur JavaScript full stack avec competences Node.js et MongoDB',
    ],
    stats: [
      { value: '3+', label: 'annees dans des equipes produit professionnelles' },
      { value: '07', label: 'projets sur desktop, web et mobile' },
      {
        value: '06',
        label: 'stack principale : JavaScript, React, Node.js, MongoDB, ElectronJS, Three.js',
      },
    ],
    actions: {
      email: "M'envoyer un email",
      linkedIn: 'LinkedIn',
      resume: 'CV PDF',
    },
  },
  about: {
    kicker: 'A propos',
    title: 'Developpeur logiciel full stack.',
    text:
      "Je construis des applications web, desktop et mobiles avec JavaScript. Mon travail couvre les interfaces frontend, l'integration backend, le state management et des fonctionnalites produit utilisees par de vraies equipes.",
    cards: [
      {
        title: 'Focus actuel',
        copy: "Etudiant en master a TU Ilmenau, a la recherche d'un poste de working student en developpement logiciel.",
      },
      {
        title: 'Types de projets',
        copy: 'Experience avec les applications web, les apps mobiles React Native, les logiciels desktop Electron et les interfaces 3D basees sur Three.js.',
      },
      {
        title: 'Travail full stack',
        copy: 'A l aise avec React au frontend et avec Node.js, les API REST et MongoDB au backend.',
      },
    ],
  },
  experience: {
    ...englishCopy.experience,
    kicker: 'Experience',
    title: 'Experience professionnelle.',
    text:
      'Experience professionnelle sur les logiciels desktop, les systemes admin, les apps mobiles et les interfaces produit 3D.',
  },
  projects: {
    ...englishCopy.projects,
    kicker: 'Portfolio',
    title: 'Portfolio.',
    text: 'Une selection de travaux realises chez Addicted Technologies et Crest Infotech.',
  },
  skills: {
    ...englishCopy.skills,
    kicker: 'Competences techniques',
    title: 'Competences.',
    text:
      'Technologies principales : JavaScript, TypeScript, React, Node.js, Express.js, MongoDB, React Native, ElectronJS, Three.js et API REST.',
  },
  education: {
    ...englishCopy.education,
    kicker: 'Formation et langues',
    title: 'Formation et langues.',
    languagesTitle: 'Langues',
    spokenLanguages: [
      'Anglais - C1',
      'Allemand - A2, en progression',
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
    title: 'Disponible pour des opportunites en developpement logiciel.',
    text:
      "Si vous recrutez pour un poste de working student ou un role full stack software, je serais heureux d'echanger.",
    location: 'Ilmenau, Thuringe, Allemagne',
    actions: {
      email: 'Envoyer un email',
      linkedIn: 'LinkedIn',
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
    portfolio: 'Portafolio',
    project: 'Proyecto',
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
    eyebrow: 'Desarrollador de software full stack | Estudiante de M.Sc. | TU Ilmenau',
    title: 'Desarrollador de software full stack enfocado en JavaScript, React, Node.js y MongoDB.',
    text:
      'Soy Ankit Talaviya, estudiante de master en Research in Computer and Systems Engineering en TU Ilmenau. Tengo experiencia practica con ReactJS, React Native, ElectronJS, Three.js, JavaScript, Node.js y MongoDB. Actualmente busco un puesto de working student en desarrollo de software para seguir creando experiencias utiles y de alta calidad tanto en frontend como en backend.',
    quickFacts: [
      'Ubicado en Ilmenau, Turingia, Alemania',
      'Disponible para puestos de working student en software',
      'Desarrollador JavaScript full stack con experiencia en Node.js y MongoDB',
    ],
    stats: [
      { value: '3+', label: 'anos en equipos de producto profesionales' },
      { value: '07', label: 'proyectos en desktop, web y mobile' },
      {
        value: '06',
        label: 'stack principal: JavaScript, React, Node.js, MongoDB, ElectronJS, Three.js',
      },
    ],
    actions: {
      email: 'Enviar email',
      linkedIn: 'LinkedIn',
      resume: 'CV PDF',
    },
  },
  about: {
    kicker: 'Sobre mi',
    title: 'Desarrollador de software full stack.',
    text:
      'Construyo aplicaciones web, desktop y mobile con JavaScript. Mi trabajo incluye interfaces frontend, integracion backend, gestion de estado y funcionalidades de producto usadas por equipos reales.',
    cards: [
      {
        title: 'Enfoque actual',
        copy: 'Estudiante de master en TU Ilmenau, buscando un puesto de working student en desarrollo de software.',
      },
      {
        title: 'Tipos de proyectos',
        copy: 'Experiencia con aplicaciones web, apps moviles React Native, software desktop con Electron e interfaces 3D basadas en Three.js.',
      },
      {
        title: 'Trabajo full stack',
        copy: 'Comodo con React en frontend y con Node.js, APIs REST y MongoDB en backend.',
      },
    ],
  },
  experience: {
    ...englishCopy.experience,
    kicker: 'Experiencia',
    title: 'Experiencia profesional.',
    text:
      'Experiencia profesional en software desktop, sistemas admin, apps moviles e interfaces de producto 3D.',
  },
  projects: {
    ...englishCopy.projects,
    kicker: 'Portafolio',
    title: 'Portafolio.',
    text: 'Trabajos seleccionados realizados en Addicted Technologies y Crest Infotech.',
  },
  skills: {
    ...englishCopy.skills,
    kicker: 'Habilidades tecnicas',
    title: 'Habilidades.',
    text:
      'Tecnologias principales: JavaScript, TypeScript, React, Node.js, Express.js, MongoDB, React Native, ElectronJS, Three.js y APIs REST.',
  },
  education: {
    ...englishCopy.education,
    kicker: 'Educacion e idiomas',
    title: 'Educacion e idiomas.',
    languagesTitle: 'Idiomas',
    spokenLanguages: [
      'Ingles - C1',
      'Aleman - A2, en mejora continua',
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
    title: 'Disponible para oportunidades en desarrollo de software.',
    text:
      'Si estas contratando para un puesto de working student o un rol full stack software, estare encantado de conectar.',
    location: 'Ilmenau, Turingia, Alemania',
    actions: {
      email: 'Enviar email',
      linkedIn: 'LinkedIn',
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
