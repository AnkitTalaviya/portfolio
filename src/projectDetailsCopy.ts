export type ProjectDetailId =
  | 'deutschflow-ai'
  | 'rag-chatbot-german'
  | 'neural-network-ids-in-p4-bmv2';

type ProjectDetailLink = {
  label: string;
  href: string;
};

type ProjectDetail = {
  id: ProjectDetailId;
  category: string;
  kind: string;
  title: string;
  summary: string;
  links: ProjectDetailLink[];
  stats: Array<{ title: string; description: string }>;
  overviewTitle: string;
  overviewText: string;
  bullets: string[];
  modulesTitle: string;
  modules: Array<{ title: string; description: string }>;
  stack: string[];
  outcomes: string[];
};

export const projectDetailOrder: ProjectDetailId[] = [
  'deutschflow-ai',
  'rag-chatbot-german',
  'neural-network-ids-in-p4-bmv2',
];

export const projectDetailsCopy: Record<ProjectDetailId, ProjectDetail> = {
  'deutschflow-ai': {
    id: 'deutschflow-ai',
    category: 'Own project, concept to operation',
    kind: 'German learning platform, A1 to C2',
    title: 'DeutschFlow AI / Sprako',
    summary:
      'A German learning platform I built and run myself. It is in beta at sprako.app with 10 to 15 users. The app pairs a six-level grammar path with a spaced repetition system and optional Gemini-generated content.',
    links: [{ label: 'Open sprako.app', href: 'https://sprako.app' }],
    stats: [
      {
        title: 'Multi-key Gemini access',
        description: 'per-key validation, automatic failover, cooldowns and bounded retries',
      },
      {
        title: 'A1 to C2 grammar path',
        description: 'six levels, Gemini-generated vocabulary, spaced repetition with XP and streaks',
      },
      {
        title: 'Appwrite backend',
        description: 'authentication, learning state, follow function and notifications',
      },
    ],
    overviewTitle: 'What the app does',
    overviewText:
      'Learners work through a grammar path from A1 to C2, review vocabulary on a spaced repetition schedule, and track XP, streaks and weak areas. Gemini generates vocabulary and explanations. Every key is validated on its own, and the application stays fully usable when no key is configured.',
    bullets: [
      'Management of multiple Gemini API keys with per-key validation, automatic failover, cooldowns and bounded retries.',
      'Six-level grammar path from A1 to C2, with vocabulary generated via Gemini.',
      'Spaced repetition system with XP, streaks and weak-area tracking.',
      'Appwrite backend with authentication, learning state, follow function and notifications.',
    ],
    modulesTitle: 'Core modules',
    modules: [
      {
        title: 'Grammar path',
        description: 'Six levels from A1 to C2, with lessons and exercises per level.',
      },
      {
        title: 'Spaced repetition',
        description: 'Review scheduling for vocabulary, with XP, streaks and weak-area tracking.',
      },
      {
        title: 'Gemini key management',
        description:
          'Several keys are held locally, validated one by one, and swapped automatically on failure with cooldowns and bounded retries.',
      },
      {
        title: 'Appwrite backend',
        description:
          'Authentication, learning state, the follow function between learners, and notifications.',
      },
    ],
    stack: [
      'ReactJS 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Capacitor 8',
      'Appwrite',
      'Google Gemini API',
    ],
    outcomes: [
      'The application is in beta at sprako.app with 10 to 15 users.',
      'Learning stays available when no Gemini key is configured, so the app does not depend on an AI provider being reachable.',
      'Built and operated end to end, from concept through to running the deployed app.',
    ],
  },
  'rag-chatbot-german': {
    id: 'rag-chatbot-german',
    category: 'Retrieval-Augmented Generation',
    kind: 'German vocabulary, runs offline',
    title: 'RAG chatbot for German learning',
    summary:
      'Retrieval-Augmented Generation over German vocabulary. Vocabulary and example sentences are indexed in ChromaDB with multilingual Sentence-Transformer embeddings, and the chatbot runs without an internet connection.',
    links: [{ label: 'Open sprako.app', href: 'https://sprako.app' }],
    stats: [
      {
        title: 'Vector index',
        description: 'OpenThesaurus and Tatoeba data in ChromaDB',
      },
      {
        title: 'Multilingual embeddings',
        description: 'Sentence-Transformer embeddings for semantic retrieval',
      },
      {
        title: 'Offline fallback',
        description: 'local Qwen2.5 through Ollama when the Anthropic API is not reachable',
      },
    ],
    overviewTitle: 'What the project does',
    overviewText:
      'A learner asks a question about a German word or phrase. The retrieval pipeline searches the vector index and returns semantically similar vocabulary and usage examples. Those results are passed to the generation step, which answers the question.',
    bullets: [
      'Vocabulary and example sentences from OpenThesaurus and Tatoeba indexed in ChromaDB using multilingual Sentence-Transformer embeddings.',
      'The retrieval pipeline returns semantically similar vocabulary and usage examples for a learner query.',
      'Generation via the Anthropic API, with local Qwen2.5 through Ollama as an offline fallback.',
      'Runs without an internet connection.',
    ],
    modulesTitle: 'Pipeline',
    modules: [
      {
        title: 'Index',
        description:
          'OpenThesaurus and Tatoeba entries are embedded with a multilingual Sentence-Transformer model and written to ChromaDB.',
      },
      {
        title: 'Retrieve',
        description:
          'A learner query is embedded with the same model and matched against the index for semantically similar vocabulary and usage examples.',
      },
      {
        title: 'Generate',
        description:
          'Retrieved context is passed to the Anthropic API, or to local Qwen2.5 through Ollama when running offline.',
      },
    ],
    stack: ['Python', 'ChromaDB', 'Sentence-Transformers', 'Anthropic API', 'Ollama', 'Qwen2.5'],
    outcomes: [
      'Answers are grounded in retrieved vocabulary and real example sentences rather than in the model alone.',
      'The same pipeline runs against a hosted API or a local model, so it works without an internet connection.',
    ],
  },
  'neural-network-ids-in-p4-bmv2': {
    id: 'neural-network-ids-in-p4-bmv2',
    category: 'Machine learning in programmable data planes',
    kind: 'In-network intrusion detection',
    title: 'Neural network as in-network IDS in P4 (BMv2)',
    summary:
      'Packet and flow features are quantised to fixed point and evaluated directly in the P4 data plane. The project covers model training, deployment and the collection of runtime metrics under BMv2.',
    links: [{ label: 'GitHub repo', href: 'https://github.com/AnkitTalaviya/nn_p4_nids' }],
    stats: [
      {
        title: 'Inference in the data plane',
        description: 'fixed-point classification inside the BMv2 pipeline',
      },
      {
        title: 'Generated runtime entries',
        description: 'BMv2 CLI entries produced automatically from the model JSON',
      },
      {
        title: 'Reproducible evaluation',
        description: 'confusion matrices and offline versus online metric comparison',
      },
    ],
    overviewTitle: 'What the project does',
    overviewText:
      'A neural network is trained in Python and quantised to fixed point. The weights are turned into BMv2 CLI runtime entries, which are loaded into a P4 program so that classification happens inside the switch pipeline instead of in an external service.',
    bullets: [
      'Packet and flow features quantised to fixed point and evaluated directly in the P4 data plane.',
      'Covers model training, deployment and collection of runtime metrics under BMv2.',
      'BMv2 CLI runtime entries generated automatically from the model JSON.',
      'Deployed on single-switch and multi-switch topologies.',
      'Evaluation through reproducible scripts with confusion matrices and a comparison of offline and online metrics.',
    ],
    modulesTitle: 'End-to-end pipeline',
    modules: [
      {
        title: 'Train and quantise',
        description:
          'The model is trained in PyTorch and its weights are quantised to fixed point, then written to a model JSON file.',
      },
      {
        title: 'Generate and deploy',
        description:
          'BMv2 CLI runtime entries are generated from the model JSON, the P4 program is compiled, and the switch is loaded on single-switch and multi-switch topologies in Mininet.',
      },
      {
        title: 'Replay and evaluate',
        description:
          'Reproducible scripts replay traffic, collect runtime metrics, and produce confusion matrices comparing offline and online results.',
      },
    ],
    stack: ['Python', 'P4', 'BMv2', 'Mininet', 'PyTorch'],
    outcomes: [
      'Classification runs inside the switch pipeline with fixed-point integer arithmetic instead of in an external service.',
      'Offline quantised results and online BMv2 results can be compared directly from the same scripts.',
      'The same model deploys on single-switch and multi-switch topologies.',
    ],
  },
};
