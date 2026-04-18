export type ProjectDetailId = 'stockpilot' | 'neural-network-ids-in-p4-bmv2';

type ProjectDetail = {
  id: ProjectDetailId;
  category: string;
  kind: string;
  title: string;
  summary: string;
  repoUrl: string;
  stats: Array<{ title: string; description: string }>;
  overviewTitle: string;
  overviewText: string;
  bullets: string[];
  modulesTitle: string;
  modules: Array<{ title: string; description: string }>;
  stack: string[];
  outcomes: string[];
};

export const projectDetailsCopy: Record<ProjectDetailId, ProjectDetail> = {
  stockpilot: {
    id: 'stockpilot',
    category: 'Inventory operations app',
    kind: 'Stock management platform',
    title: 'StockPilot',
    summary:
      'StockPilot is a modern inventory operations app for small teams. It helps teams track stock levels, purchase orders, suppliers, alerts, and workspace access in one practical system with clear day-to-day workflows.',
    repoUrl: 'https://github.com/AnkitTalaviya/StockPilot',
    stats: [
      {
        title: 'Inventory control',
        description: 'on-hand and on-order tracking with receive, issue, and adjust operations',
      },
      {
        title: 'PO + supplier ops',
        description: 'PO lifecycle, supplier lead times, and overdue receiving visibility',
      },
      {
        title: 'Team + alerts',
        description: 'role-based access, approval flows, notifications, and audit history',
      },
    ],
    overviewTitle: 'What the project does',
    overviewText:
      'StockPilot centralizes inventory and purchasing operations. Teams can manage items, monitor low-stock risks, track purchase order progress, review receiving timelines, and maintain a full transaction record for accountability.',
    bullets: [
      'Includes signup and login with Firebase Authentication and role-aware workspace access.',
      'Supports inventory CRUD, stock movement operations, and PO statuses from ordered to received.',
      'Adds CSV import/export, JSON export, and notifications for low stock and overdue receipts.',
    ],
    modulesTitle: 'Core modules',
    modules: [
      {
        title: 'Inventory workspace',
        description: 'Teams create, edit, and manage stock while tracking on-hand and on-order quantities.',
      },
      {
        title: 'Suppliers and purchase orders',
        description: 'Supplier contacts, lead times, and PO status changes keep procurement work organized.',
      },
      {
        title: 'Notifications and audit log',
        description: 'Low-stock and delayed-delivery alerts plus transaction history improve daily operations.',
      },
    ],
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Firebase'],
    outcomes: [
      'Improves stock visibility and receiving coordination for small operations teams.',
      'Connects authentication, role-based access, and Firestore data into one practical workflow.',
      'Provides an extensible base for alerts, forecasting, barcode workflows, and reporting.',
    ],
  },
  'neural-network-ids-in-p4-bmv2': {
    id: 'neural-network-ids-in-p4-bmv2',
    category: 'Network security research',
    kind: 'In-network ML IDS',
    title: 'Neural-Network IDS in P4 (BMv2)',
    summary:
      'This repository implements an intrusion detection system where packet and flow features are converted into fixed-point values and evaluated directly in P4 data planes. It connects training, quantization, command generation, BMv2 deployment, and runtime metrics.',
    repoUrl: 'https://github.com/AnkitTalaviya/nn_p4_nids',
    stats: [
      {
        title: 'Inline IDS',
        description: 'classification inside BMv2 pipeline instead of external ML service',
      },
      {
        title: 'Model families',
        description: 'from compact 5-4-1 to larger 9-32-16-1 profiles',
      },
      {
        title: 'Reproducible runs',
        description: 'single-switch and multi-switch scripts with confusion-matrix outputs',
      },
    ],
    overviewTitle: 'What the repository contains',
    overviewText:
      'The project provides end-to-end artifacts for practical in-network ML inference in P4. Models are trained and quantized in Python, translated to BMv2 CLI commands, and then evaluated in single-switch and multi-switch runtime setups.',
    bullets: [
      'Model families: 5-4-1, 9-4-1, 9-8-1, 9-8-4-1, 9_32_1, and 9_32_16_1.',
      'Dynamic runtime template for profile-aware command and stage generation.',
      'Evaluation outputs with logs, CSV files, and confusion-matrix-driven metrics.',
    ],
    modulesTitle: 'End-to-end pipeline',
    modules: [
      {
        title: 'Train and quantize',
        description: 'Train/export neural models in notebooks and write quantized model JSON files.',
      },
      {
        title: 'Generate and deploy',
        description: 'Convert model JSON to BMv2 CLI commands, compile P4, and deploy simple_switch stages.',
      },
      {
        title: 'Replay and evaluate',
        description: 'Execute sample replays, collect runtime logs and CSVs, and compare offline and online metrics.',
      },
    ],
    stack: ['P4 (BMv2)', 'Python', 'Jupyter', 'p4c-bm2-ss', 'Fixed-point inference'],
    outcomes: [
      'Demonstrates practical in-network ML inference with deterministic integer arithmetic.',
      'Enables direct offline quantized vs online BMv2 behavior comparison.',
      'Surfaces deployment-stage effects across larger multi-switch architectures.',
    ],
  },
};
