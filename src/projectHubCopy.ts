import type { LanguageCode } from './i18n';

export type ProjectHubCardLink = {
  label: string;
  href: string;
};

export type ProjectHubCard = {
  category: string;
  kind: string;
  title: string;
  summary: string;
  highlights: string[];
  tech: string[];
  links: ProjectHubCardLink[];
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

const projectPaths = {
  deutschflow: '/projects/deutschflow-ai',
  ragChatbot: '/projects/rag-chatbot-german',
  p4Ids: '/projects/neural-network-ids-in-p4-bmv2',
} as const;

const projectStacks = {
  deutschflow: [
    'ReactJS 19',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Capacitor 8',
    'Appwrite',
    'Google Gemini API',
  ],
  ragChatbot: ['Python', 'ChromaDB', 'Sentence-Transformers', 'Anthropic API', 'Ollama', 'Qwen2.5'],
  p4Ids: ['Python', 'P4', 'BMv2', 'Mininet', 'PyTorch'],
} as const;

const repoUrls = {
  p4Ids: 'https://github.com/AnkitTalaviya/nn_p4_nids',
} as const;

const productUrl = 'https://sprako.app';

export const projectHubCopy: Record<LanguageCode, ProjectHubCopy> = {
  en: {
    kicker: 'Project pages',
    title: 'LLM applications, retrieval pipelines, and machine learning in the data plane.',
    text:
      'The three projects from my CV, each with its own page. The first is a product in beta, the second a retrieval pipeline that runs offline, the third a neural network that classifies packets inside a P4 switch.',
    skillsHeading: 'Tech stack and skills',
    skillsText: 'Grouped the same way as on my CV.',
    skillGroups: [
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
    cards: [
      {
        category: 'Own project, concept to operation',
        kind: 'German learning platform, A1 to C2',
        title: 'DeutschFlow AI / Sprako',
        summary:
          'A German learning platform I built and run myself. It is in beta at sprako.app with 10 to 15 users.',
        highlights: [
          'Management of multiple Gemini API keys with per-key validation, automatic failover, cooldowns and bounded retries. The application stays fully usable with no key configured.',
          'Six-level grammar path from A1 to C2, vocabulary generated via Gemini, and a spaced repetition system with XP, streaks and weak-area tracking.',
          'Appwrite backend with authentication, learning state, follow function and notifications.',
        ],
        tech: [...projectStacks.deutschflow],
        links: [
          { label: 'Open sprako.app', href: productUrl },
          { label: 'Project page', href: projectPaths.deutschflow },
        ],
      },
      {
        category: 'Retrieval-Augmented Generation',
        kind: 'German vocabulary, runs offline',
        title: 'RAG chatbot for German learning',
        summary:
          'Retrieval-Augmented Generation over German vocabulary. It runs without an internet connection.',
        highlights: [
          'Vocabulary and example sentences from OpenThesaurus and Tatoeba indexed in ChromaDB using multilingual Sentence-Transformer embeddings.',
          'The retrieval pipeline returns semantically similar vocabulary and usage examples for a learner query.',
          'Generation via the Anthropic API, with local Qwen2.5 through Ollama as an offline fallback.',
        ],
        tech: [...projectStacks.ragChatbot],
        links: [
          { label: 'Open sprako.app', href: productUrl },
          { label: 'Project page', href: projectPaths.ragChatbot },
        ],
      },
      {
        category: 'Machine learning in programmable data planes',
        kind: 'In-network intrusion detection',
        title: 'Neural network as in-network IDS in P4 (BMv2)',
        summary:
          'Packet and flow features are quantised to fixed point and classified directly inside the P4 data plane, from model training to runtime metrics under BMv2.',
        highlights: [
          'Packet and flow features quantised to fixed point and evaluated directly in the P4 data plane. Covers model training, deployment and collection of runtime metrics under BMv2.',
          'BMv2 CLI runtime entries generated automatically from the model JSON. Deployed on single-switch and multi-switch topologies.',
          'Evaluation through reproducible scripts with confusion matrices and a comparison of offline and online metrics.',
        ],
        tech: [...projectStacks.p4Ids],
        links: [
          { label: 'GitHub repo', href: repoUrls.p4Ids },
          { label: 'Project page', href: projectPaths.p4Ids },
        ],
      },
    ],
  },
  de: {
    kicker: 'Projektseiten',
    title: 'LLM-Anwendungen, Retrieval-Pipelines und maschinelles Lernen in der Datenebene.',
    text:
      'Die drei Projekte aus meinem Lebenslauf, jeweils mit eigener Seite. Das erste ist ein Produkt in der Beta, das zweite eine Retrieval-Pipeline, die offline läuft, das dritte ein neuronales Netz, das Pakete direkt in einem P4-Switch klassifiziert.',
    skillsHeading: 'Tech-Stack und Skills',
    skillsText: 'Gruppiert wie in meinem Lebenslauf.',
    skillGroups: [
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
    cards: [
      {
        category: 'Eigenes Projekt, von der Idee bis zum Betrieb',
        kind: 'Deutschlernplattform, A1 bis C2',
        title: 'DeutschFlow AI / Sprako',
        summary:
          'Eine Deutschlernplattform, die ich selbst gebaut habe und betreibe. Sie ist als Beta unter sprako.app mit 10 bis 15 Nutzern erreichbar.',
        highlights: [
          'Verwaltung mehrerer Gemini-API-Schlüssel mit Validierung pro Schlüssel, automatischem Failover, Cooldowns und begrenzten Retries. Die Anwendung bleibt ohne konfigurierten Schlüssel vollständig nutzbar.',
          'Sechsstufiger Grammatikpfad von A1 bis C2, über Gemini generierter Wortschatz und ein Spaced-Repetition-System mit XP, Streaks und Tracking schwacher Bereiche.',
          'Appwrite-Backend mit Authentifizierung, Lernstand, Follow-Funktion und Benachrichtigungen.',
        ],
        tech: [...projectStacks.deutschflow],
        links: [
          { label: 'sprako.app öffnen', href: productUrl },
          { label: 'Projektseite', href: projectPaths.deutschflow },
        ],
      },
      {
        category: 'Retrieval-Augmented Generation',
        kind: 'Deutscher Wortschatz, offline lauffähig',
        title: 'RAG-Chatbot für das Deutschlernen',
        summary:
          'Retrieval-Augmented Generation über deutschen Wortschatz. Läuft ohne Internetverbindung.',
        highlights: [
          'Wortschatz und Beispielsätze aus OpenThesaurus und Tatoeba werden mit mehrsprachigen Sentence-Transformer-Embeddings in ChromaDB indexiert.',
          'Die Retrieval-Pipeline liefert semantisch ähnlichen Wortschatz und Verwendungsbeispiele zu einer Lernanfrage.',
          'Generierung über die Anthropic-API, mit lokalem Qwen2.5 über Ollama als Offline-Fallback.',
        ],
        tech: [...projectStacks.ragChatbot],
        links: [
          { label: 'sprako.app öffnen', href: productUrl },
          { label: 'Projektseite', href: projectPaths.ragChatbot },
        ],
      },
      {
        category: 'Maschinelles Lernen in programmierbaren Datenebenen',
        kind: 'In-Network Intrusion Detection',
        title: 'Neuronales Netz als In-Network-IDS in P4 (BMv2)',
        summary:
          'Paket- und Flow-Features werden auf Festkomma quantisiert und direkt in der P4-Datenebene klassifiziert, vom Modelltraining bis zu Laufzeitmetriken unter BMv2.',
        highlights: [
          'Paket- und Flow-Features auf Festkomma quantisiert und direkt in der P4-Datenebene ausgewertet. Umfasst Modelltraining, Deployment und Erhebung von Laufzeitmetriken unter BMv2.',
          'BMv2-CLI-Runtime-Einträge werden automatisch aus dem Modell-JSON erzeugt. Deployment auf Single-Switch- und Multi-Switch-Topologien.',
          'Evaluation über reproduzierbare Skripte mit Confusion-Matrizen und einem Vergleich von Offline- und Online-Metriken.',
        ],
        tech: [...projectStacks.p4Ids],
        links: [
          { label: 'GitHub-Repo', href: repoUrls.p4Ids },
          { label: 'Projektseite', href: projectPaths.p4Ids },
        ],
      },
    ],
  },
  fr: {
    kicker: 'Pages projet',
    title: 'Applications LLM, pipelines de recherche et machine learning dans le plan de donnees.',
    text:
      'Les trois projets de mon CV, chacun avec sa page. Le premier est un produit en beta, le deuxieme un pipeline de recherche qui fonctionne hors ligne, le troisieme un reseau de neurones qui classe les paquets dans un switch P4.',
    skillsHeading: 'Stack technique et competences',
    skillsText: 'Groupees comme sur mon CV.',
    skillGroups: [
      {
        title: 'AI, ML & LLM',
        items: [
          'Machine Learning',
          'Google Gemini (multi-cles, bascule)',
          'Anthropic API',
          'Prompt et context engineering',
          'Quantification de modeles',
        ],
      },
      {
        title: 'RAG et modeles locaux',
        items: [
          'ChromaDB',
          'Sentence-Transformers (multilingue)',
          'Embeddings',
          'Pipelines de recherche',
          'Ollama (Qwen2.5)',
        ],
      },
      {
        title: 'Programmation et frontend',
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
        title: 'Backend et donnees',
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
        title: 'DevOps et reseau',
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
    cards: [
      {
        category: 'Projet personnel, de l idee a l exploitation',
        kind: 'Plateforme d apprentissage de l allemand, A1 a C2',
        title: 'DeutschFlow AI / Sprako',
        summary:
          'Une plateforme d apprentissage de l allemand que j ai construite et que j exploite moi-meme. Elle est en beta sur sprako.app avec 10 a 15 utilisateurs.',
        highlights: [
          "Gestion de plusieurs cles d API Gemini avec validation par cle, bascule automatique, cooldowns et retries limites. L'application reste entierement utilisable sans cle configuree.",
          'Parcours de grammaire a six niveaux de A1 a C2, vocabulaire genere via Gemini, et un systeme de repetition espacee avec XP, series et suivi des points faibles.',
          'Backend Appwrite avec authentification, etat d apprentissage, fonction de suivi et notifications.',
        ],
        tech: [...projectStacks.deutschflow],
        links: [
          { label: 'Ouvrir sprako.app', href: productUrl },
          { label: 'Page projet', href: projectPaths.deutschflow },
        ],
      },
      {
        category: 'Retrieval-Augmented Generation',
        kind: 'Vocabulaire allemand, fonctionne hors ligne',
        title: 'Chatbot RAG pour apprendre l allemand',
        summary:
          'Retrieval-Augmented Generation sur du vocabulaire allemand. Fonctionne sans connexion internet.',
        highlights: [
          'Vocabulaire et phrases d exemple d OpenThesaurus et Tatoeba indexes dans ChromaDB avec des embeddings Sentence-Transformer multilingues.',
          'Le pipeline de recherche renvoie du vocabulaire et des exemples d usage semantiquement proches de la requete.',
          "Generation via l'API Anthropic, avec Qwen2.5 en local via Ollama comme repli hors ligne.",
        ],
        tech: [...projectStacks.ragChatbot],
        links: [
          { label: 'Ouvrir sprako.app', href: productUrl },
          { label: 'Page projet', href: projectPaths.ragChatbot },
        ],
      },
      {
        category: 'Machine learning dans les plans de donnees programmables',
        kind: 'Detection d intrusion in-network',
        title: 'Reseau de neurones comme IDS in-network en P4 (BMv2)',
        summary:
          'Les features de paquets et de flux sont quantifiees en virgule fixe et classees directement dans le plan de donnees P4, de l entrainement aux metriques runtime sous BMv2.',
        highlights: [
          'Features de paquets et de flux quantifiees en virgule fixe et evaluees directement dans le plan de donnees P4. Couvre entrainement, deploiement et collecte de metriques runtime sous BMv2.',
          'Entrees runtime BMv2 CLI generees automatiquement a partir du JSON du modele. Deploye sur des topologies single-switch et multi-switch.',
          'Evaluation par scripts reproductibles avec matrices de confusion et comparaison des metriques offline et online.',
        ],
        tech: [...projectStacks.p4Ids],
        links: [
          { label: 'Depot GitHub', href: repoUrls.p4Ids },
          { label: 'Page projet', href: projectPaths.p4Ids },
        ],
      },
    ],
  },
  es: {
    kicker: 'Paginas de proyecto',
    title: 'Aplicaciones LLM, pipelines de recuperacion y machine learning en el plano de datos.',
    text:
      'Los tres proyectos de mi CV, cada uno con su pagina. El primero es un producto en beta, el segundo un pipeline de recuperacion que funciona sin conexion, el tercero una red neuronal que clasifica paquetes dentro de un switch P4.',
    skillsHeading: 'Stack tecnico y habilidades',
    skillsText: 'Agrupadas igual que en mi CV.',
    skillGroups: [
      {
        title: 'AI, ML & LLM',
        items: [
          'Machine Learning',
          'Google Gemini (multiclave, conmutacion)',
          'Anthropic API',
          'Prompt y context engineering',
          'Cuantizacion de modelos',
        ],
      },
      {
        title: 'RAG y modelos locales',
        items: [
          'ChromaDB',
          'Sentence-Transformers (multilingue)',
          'Embeddings',
          'Pipelines de recuperacion',
          'Ollama (Qwen2.5)',
        ],
      },
      {
        title: 'Programacion y frontend',
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
        title: 'Backend y datos',
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
        title: 'DevOps y redes',
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
    cards: [
      {
        category: 'Proyecto propio, de la idea a la operacion',
        kind: 'Plataforma para aprender aleman, A1 a C2',
        title: 'DeutschFlow AI / Sprako',
        summary:
          'Una plataforma para aprender aleman que construi y opero yo mismo. Esta en beta en sprako.app con 10 a 15 usuarios.',
        highlights: [
          'Gestion de varias claves de la API de Gemini con validacion por clave, conmutacion automatica, cooldowns y reintentos limitados. La aplicacion sigue siendo plenamente utilizable sin ninguna clave configurada.',
          'Ruta de gramatica de seis niveles de A1 a C2, vocabulario generado con Gemini y un sistema de repeticion espaciada con XP, rachas y seguimiento de puntos debiles.',
          'Backend en Appwrite con autenticacion, estado de aprendizaje, funcion de seguir y notificaciones.',
        ],
        tech: [...projectStacks.deutschflow],
        links: [
          { label: 'Abrir sprako.app', href: productUrl },
          { label: 'Pagina del proyecto', href: projectPaths.deutschflow },
        ],
      },
      {
        category: 'Retrieval-Augmented Generation',
        kind: 'Vocabulario aleman, funciona sin conexion',
        title: 'Chatbot RAG para aprender aleman',
        summary:
          'Retrieval-Augmented Generation sobre vocabulario aleman. Funciona sin conexion a internet.',
        highlights: [
          'Vocabulario y frases de ejemplo de OpenThesaurus y Tatoeba indexados en ChromaDB con embeddings multilingues de Sentence-Transformers.',
          'El pipeline de recuperacion devuelve vocabulario y ejemplos de uso semanticamente similares a la consulta.',
          'Generacion mediante la API de Anthropic, con Qwen2.5 local a traves de Ollama como respaldo sin conexion.',
        ],
        tech: [...projectStacks.ragChatbot],
        links: [
          { label: 'Abrir sprako.app', href: productUrl },
          { label: 'Pagina del proyecto', href: projectPaths.ragChatbot },
        ],
      },
      {
        category: 'Machine learning en planos de datos programables',
        kind: 'Deteccion de intrusiones in-network',
        title: 'Red neuronal como IDS in-network en P4 (BMv2)',
        summary:
          'Las caracteristicas de paquetes y flujos se cuantizan a punto fijo y se clasifican directamente dentro del plano de datos P4, del entrenamiento a las metricas de ejecucion en BMv2.',
        highlights: [
          'Caracteristicas de paquetes y flujos cuantizadas a punto fijo y evaluadas directamente en el plano de datos P4. Cubre entrenamiento, despliegue y recogida de metricas de ejecucion en BMv2.',
          'Entradas de runtime de la CLI de BMv2 generadas automaticamente a partir del JSON del modelo. Desplegado en topologias de un switch y de varios switches.',
          'Evaluacion mediante scripts reproducibles con matrices de confusion y comparacion de metricas offline y online.',
        ],
        tech: [...projectStacks.p4Ids],
        links: [
          { label: 'Repositorio GitHub', href: repoUrls.p4Ids },
          { label: 'Pagina del proyecto', href: projectPaths.p4Ids },
        ],
      },
    ],
  },
};
