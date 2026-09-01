import { siteProfile } from './siteConfig';

export type RouteMeta = {
  /** App-relative path, without the deployment base path. */
  path: string;
  /** Folder under dist/ that receives the generated index.html. Empty string is the site root. */
  outDir: string;
  title: string;
  description: string;
};

/** Every route that gets rendered to static HTML at build time. */
export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    outDir: '',
    title: 'Ankit Talaviya | Full-Stack AI Engineer',
    description:
      'Full-Stack AI Engineer in Erfurt. LLM applications with multi-provider failover, RAG on ChromaDB and Sentence-Transformers, quantised neural networks in P4.',
  },
  {
    path: '/projects',
    outDir: 'projects',
    title: 'Projects | Ankit Talaviya',
    description:
      'Three projects: the DeutschFlow AI / Sprako learning platform, a RAG chatbot for German vocabulary, and a neural network running as an IDS inside a P4 data plane.',
  },
  {
    path: '/projects/deutschflow-ai',
    outDir: 'projects/deutschflow-ai',
    title: 'DeutschFlow AI / Sprako | Ankit Talaviya',
    description:
      'German learning platform in beta at sprako.app. Multiple Gemini API keys with per-key validation, automatic failover, cooldowns and bounded retries, on an Appwrite backend.',
  },
  {
    path: '/projects/rag-chatbot-german',
    outDir: 'projects/rag-chatbot-german',
    title: 'RAG chatbot for German learning | Ankit Talaviya',
    description:
      'Retrieval-Augmented Generation over German vocabulary. OpenThesaurus and Tatoeba indexed in ChromaDB with multilingual Sentence-Transformers, generation via Anthropic API or local Qwen2.5.',
  },
  {
    path: '/projects/neural-network-ids-in-p4-bmv2',
    outDir: 'projects/neural-network-ids-in-p4-bmv2',
    title: 'Neural network as in-network IDS in P4 | Ankit Talaviya',
    description:
      'Packet and flow features quantised to fixed point and classified directly in the P4 data plane, with BMv2 runtime entries generated from the model JSON.',
  },
];

/** Absolute URL a route is canonically served from. */
export function canonicalUrl(outDir: string) {
  return outDir ? `${siteProfile.siteUrl}${outDir}/` : siteProfile.siteUrl;
}
