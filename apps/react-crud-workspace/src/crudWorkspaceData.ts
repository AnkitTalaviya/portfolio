export type CrudStatus = 'lead' | 'qualified' | 'proposal' | 'customer' | 'inactive';
export type CrudPriority = 'low' | 'medium' | 'high';

export type CrudRecord = {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  status: CrudStatus;
  priority: CrudPriority;
  owner: string;
  region: string;
  source: string;
  value: number;
  lastContact: string;
  nextAction: string;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type CrudSession = {
  name: string;
  email: string;
  role: string;
};

export const statusOptions: CrudStatus[] = ['lead', 'qualified', 'proposal', 'customer', 'inactive'];
export const priorityOptions: CrudPriority[] = ['low', 'medium', 'high'];
export const regionOptions = ['Germany', 'Netherlands', 'France', 'Remote EU', 'Nordics'] as const;
export const sourceOptions = ['LinkedIn', 'Referral', 'Direct', 'Website', 'Cold outreach'] as const;
export const ownerOptions = ['Ankit', 'Nina', 'Marco', 'Elena', 'Sophie'] as const;

export const workspaceCredentials = {
  username: 'ankit.admin',
  email: 'ankit@reactcrud.dev',
  password: 'CobaltDesk2026!',
};

export const workspaceSession: CrudSession = {
  name: 'Ankit T.',
  email: workspaceCredentials.email,
  role: 'Workspace Administrator',
};

export const generatorSizePresets = [25, 50, 100, 200, 500, 1000, 2500, 5000] as const;
export const pageSizeOptions = [10, 25, 50, 100] as const;

const firstNames = [
  'Anika',
  'Noah',
  'Sophie',
  'Mateo',
  'Lina',
  'Jonas',
  'Mila',
  'Elias',
  'Nora',
  'Leo',
  'Emma',
  'Aria',
  'Kai',
  'Lea',
  'David',
] as const;

const lastNames = [
  'Schmidt',
  'Muller',
  'Garcia',
  'Dubois',
  'Van Dijk',
  'Rossi',
  'Keller',
  'Singh',
  'Weber',
  'Martin',
  'Lopez',
  'Silva',
  'Becker',
  'Wagner',
  'Ahmed',
] as const;

const companyPrefixes = [
  'North',
  'Blue',
  'Peak',
  'Urban',
  'Prime',
  'Signal',
  'Vector',
  'Bright',
  'Nova',
  'Atlas',
  'Summit',
  'Cobalt',
  'Harbor',
  'Lumen',
  'Cedar',
] as const;

const companySuffixes = [
  'Works',
  'Labs',
  'Systems',
  'Partners',
  'Studio',
  'Collective',
  'Dynamics',
  'Cloud',
  'Logistics',
  'Advisory',
  'Networks',
  'Health',
  'Retail',
  'Finance',
  'Solutions',
] as const;

const rolePrefixes = [
  'Senior',
  'Lead',
  'Principal',
  'Regional',
  'Growth',
  'Customer',
  'Strategic',
  'Revenue',
  'Operations',
  'Partnerships',
] as const;

const roleTitles = [
  'Account Manager',
  'Product Lead',
  'Solutions Consultant',
  'Procurement Analyst',
  'Partnership Director',
  'Head of Operations',
  'Program Manager',
  'Commercial Manager',
  'Technical Buyer',
  'Customer Success Manager',
] as const;

const adjectives = [
  'stakeholder',
  'pipeline',
  'renewal',
  'priority',
  'regional',
  'compliance',
  'product',
  'quarterly',
  'expansion',
  'partner',
] as const;

const nouns = [
  'review',
  'alignment',
  'handoff',
  'brief',
  'signal',
  'followup',
  'upgrade',
  'checkin',
  'trial',
  'launch',
] as const;

const buzzVerbs = [
  'Schedule',
  'Review',
  'Confirm',
  'Align',
  'Prepare',
  'Advance',
  'Validate',
  'Update',
  'Share',
  'Close',
] as const;

const buzzAdjectives = [
  'commercial',
  'regional',
  'technical',
  'renewal',
  'onboarding',
  'pricing',
  'stakeholder',
  'adoption',
  'launch',
  'forecast',
] as const;

const buzzObjects = [
  'proposal',
  'timeline',
  'review',
  'roadmap',
  'summary',
  'brief',
  'handoff',
  'check-in',
  'expansion',
  'decision',
] as const;

const noteTemplates = [
  'Needs a tighter follow-up plan after the last discovery call.',
  'Asked for a pricing comparison before moving into proposal review.',
  'Internal champion is active, but procurement still needs validation.',
  'Product fit looks strong if onboarding questions are handled early.',
  'Waiting on stakeholder alignment before the next commercial step.',
  'Opportunity is healthy, but timeline confidence depends on legal review.',
  'Recent contact was positive and the account is open to expansion discussion.',
  'The team wants a concise executive summary before the next meeting.',
] as const;

const daysAgo = (days: number) => {
  const next = new Date();
  next.setDate(next.getDate() - days);
  return next;
};

const toIsoString = (value: Date) => value.toISOString();

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = <T,>(items: readonly T[]) => items[randomInt(0, items.length - 1)];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const randomDateBetween = (from: Date, to: Date) =>
  new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));

const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `record_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const createCompanyName = () => `${pick(companyPrefixes)} ${pick(companySuffixes)}`;

const createCompanyDomain = (company: string) => {
  const slug = slugify(company).replace(/-/g, '');
  return `${slug || 'workspace'}.com`;
};

const createJobTitle = () => `${pick(rolePrefixes)} ${pick(roleTitles)}`;

const createTags = (): string[] =>
  Array.from(
    new Set(
      Array.from({ length: randomInt(1, 3) }, () => slugify(`${pick(adjectives)} ${pick(nouns)}`)),
    ),
  );

const createTimeline = () => {
  const createdAt = randomDateBetween(daysAgo(72), daysAgo(18));
  const lastContact = randomDateBetween(createdAt, daysAgo(1));
  const updatedAt = randomDateBetween(lastContact, new Date());

  return {
    createdAt: toIsoString(createdAt),
    lastContact: toIsoString(lastContact),
    updatedAt: toIsoString(updatedAt),
  };
};

export const generateRandomRecord = (
  overrides: Partial<Pick<CrudRecord, 'status' | 'priority' | 'owner'>> = {},
): CrudRecord => {
  const firstName = pick(firstNames);
  const lastName = pick(lastNames);
  const name = `${firstName} ${lastName}`;
  const company = createCompanyName();
  const { createdAt, lastContact, updatedAt } = createTimeline();
  const status = overrides.status ?? pick(statusOptions);
  const priority = overrides.priority ?? pick(priorityOptions);

  return {
    id: createId(),
    name,
    email: `${slugify(`${firstName}.${lastName}`)}@${createCompanyDomain(company)}`,
    company,
    title: createJobTitle(),
    status,
    priority,
    owner: overrides.owner ?? pick(ownerOptions),
    region: pick(regionOptions),
    source: pick(sourceOptions),
    value: randomInt(1500, 22000),
    lastContact,
    nextAction: `${pick(buzzVerbs)} ${pick(buzzAdjectives)} ${pick(buzzObjects)}`,
    notes: pick(noteTemplates),
    tags: createTags(),
    createdAt,
    updatedAt,
  };
};

export const generateRandomRecords = (
  count: number,
  overrides: Partial<Pick<CrudRecord, 'status' | 'priority' | 'owner'>> = {},
) =>
  Array.from({ length: count }, () => generateRandomRecord(overrides));

export const createSeedRecords = (): CrudRecord[] => [
  generateRandomRecord({ status: 'qualified', priority: 'high', owner: 'Ankit' }),
  generateRandomRecord({ status: 'proposal', priority: 'medium', owner: 'Nina' }),
  generateRandomRecord({ status: 'customer', priority: 'high', owner: 'Elena' }),
  generateRandomRecord({ status: 'lead', priority: 'low', owner: 'Marco' }),
  ...generateRandomRecords(8),
];
