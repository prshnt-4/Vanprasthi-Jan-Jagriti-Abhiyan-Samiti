import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { hashPassword } from './auth';

const DATA_DIR = path.join(process.cwd(), '.local-trial');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

export type StoreKey =
  | 'users'
  | 'donations'
  | 'volunteers'
  | 'impactMetrics'
  | 'newsPosts'
  | 'campaigns'
  | 'events'
  | 'galleryImages'
  | 'legalDocuments'
  | 'contactMessages'
  | 'eventRegistrations';

type Store = Record<StoreKey, Record<string, unknown>[]>;

function emptyStore(): Store {
  return {
    users: [],
    donations: [],
    volunteers: [],
    impactMetrics: [],
    newsPosts: [],
    campaigns: [],
    events: [],
    galleryImages: [],
    legalDocuments: [],
    contactMessages: [],
    eventRegistrations: [],
  };
}

function newId() {
  return crypto.randomBytes(12).toString('hex');
}

function matches(doc: Record<string, unknown>, filter: Record<string, unknown>): boolean {
  if (!filter || Object.keys(filter).length === 0) return true;

  for (const [key, expected] of Object.entries(filter)) {
    const actual = doc[key];

    if (expected && typeof expected === 'object' && '$ne' in (expected as object)) {
      if (actual === (expected as { $ne: unknown }).$ne) return false;
      continue;
    }

    if (typeof expected === 'string' && typeof actual === 'string') {
      if (actual.toLowerCase() !== expected.toLowerCase()) return false;
      continue;
    }

    if (actual !== expected) return false;
  }

  return true;
}

export class LocalQuery<T extends Record<string, unknown>> {
  private items: Promise<T[]>;

  constructor(items: T[] | Promise<T[]>) {
    this.items = Promise.resolve(items);
  }

  sort(spec: Record<string, 1 | -1>) {
    const [key, dir] = Object.entries(spec)[0] as [string, 1 | -1];
    return new LocalQuery(
      this.items.then((items) =>
        [...items].sort((a, b) => {
          const av = a[key];
          const bv = b[key];
          if (av === bv) return 0;
          if (av == null) return 1;
          if (bv == null) return -1;
          if (av < bv) return dir === 1 ? -1 : 1;
          if (av > bv) return dir === 1 ? 1 : -1;
          return 0;
        })
      )
    );
  }

  then<TResult1 = T[], TResult2 = never>(
    onfulfilled?: ((value: T[]) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ) {
    return this.items.then(onfulfilled, onrejected);
  }
}

let storeCache: Store | null = null;
let writeChain: Promise<void> = Promise.resolve();

async function persist(store: Store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  storeCache = store;
}

async function loadStore(): Promise<Store> {
  if (storeCache) return storeCache;

  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    storeCache = JSON.parse(raw) as Store;
    return storeCache;
  } catch {
    const store = emptyStore();
    await seedStore(store);
    await persist(store);
    return store;
  }
}

async function withWrite<T>(fn: (store: Store) => Promise<T> | T): Promise<T> {
  let result!: T;
  writeChain = writeChain.then(async () => {
    const store = await loadStore();
    result = await fn(store);
    await persist(store);
  });
  await writeChain;
  return result;
}

function stampNew(doc: Record<string, unknown>) {
  const now = new Date().toISOString();
  return {
    ...doc,
    _id: doc._id ?? newId(),
    createdAt: doc.createdAt ?? now,
    updatedAt: now,
  };
}

async function seedStore(store: Store) {
  const adminExists = store.users.some((u) => u.role === 'admin');
  if (!adminExists) {
    const hashedPassword = await hashPassword('AdminPass@2026!');
    store.users.push(
      stampNew({
        name: 'Col. M.P. Sharma (Retd.) / System Admin',
        email: 'admin@vanprasthisamiti.org',
        password: hashedPassword,
        role: 'admin',
      })
    );
  }

  if (store.impactMetrics.length === 0) {
    store.impactMetrics.push(
      ...[
        {
          metricId: 'cleanliness_drives',
          label: { en: 'Cleanliness Drives Conducted', hi: 'स्वच्छता अभियान' },
          value: '—',
          description: {
            en: 'Neighborhood cleanup drives and waste management workshops',
            hi: 'गली-मोहल्ला सफाई व कचरा निस्तारण जनजागृति अभियान',
          },
          iconName: 'Sparkles',
          isVisible: true,
          order: 1,
        },
        {
          metricId: 'social_education_programs',
          label: { en: 'Social Education Programs', hi: 'सामाजिक शिक्षा कार्यक्रम' },
          value: '—',
          description: {
            en: 'Moral values, elder respect, and street child schooling drives',
            hi: 'संस्कार, बुजुर्गों का सम्मान व बालक शिक्षा अभियान',
          },
          iconName: 'BookOpen',
          isVisible: true,
          order: 2,
        },
        {
          metricId: 'volunteers_registered',
          label: { en: 'Registered Volunteers', hi: 'सक्रिय स्वयंसेवक' },
          value: '—',
          description: {
            en: 'Citizens dedicated to selfless social service',
            hi: 'निस्वार्थ समाज सेवा में समर्पित नागरिक व वरिष्ठ जन',
          },
          iconName: 'Users',
          isVisible: true,
          order: 3,
        },
        {
          metricId: 'disadvantaged_assisted',
          label: { en: 'Welfare Scheme Guidance', hi: 'सरकारी योजना सहायता' },
          value: '—',
          description: {
            en: 'Assisting disadvantaged families in accessing welfare benefits',
            hi: 'जन-कल्याणकारी योजनाओं का लाभ दिलाने का मार्गदर्शन',
          },
          iconName: 'HeartHandshake',
          isVisible: true,
          order: 4,
        },
      ].map((m) => stampNew(m))
    );
  }

  if (store.legalDocuments.length === 0) {
    store.legalDocuments.push(
      stampNew({
        title: {
          en: 'Society Registration Certificate (Reg. No. 052/2016-2017)',
          hi: 'गैर-राजनीतिक संस्था पंजीकरण प्रमाण पत्र (संख्या 052/2016-2017)',
        },
        fileUrl: '/docs/registration-052-2016-2017.pdf',
        category: 'Registration',
        description: {
          en: 'Official registration document issued on 06.06.2016 in Roorkee, Uttarakhand.',
          hi: 'दिनांक 06.06.2016 को पंजीकृत आधिकारिक संस्था पंजीकरण दस्तावेज।',
        },
        uploadDate: '06.06.2016',
      })
    );
  }
}

export async function ensureLocalTrialStore() {
  const store = await loadStore();
  if (store.users.length === 0 && store.impactMetrics.length === 0) {
    await withWrite(async (s) => {
      await seedStore(s);
    });
  }
}

function createLocalCollection(key: StoreKey) {
  return {
    find(filter: Record<string, unknown> = {}) {
      const items = loadStore().then((store) =>
        store[key].filter((doc) => matches(doc, filter)) as Record<string, unknown>[]
      );
      return new LocalQuery(items);
    },

    async findOne(filter: Record<string, unknown>) {
      const store = await loadStore();
      return (store[key].find((doc) => matches(doc, filter)) as Record<string, unknown>) ?? null;
    },

    async create(data: Record<string, unknown>) {
      return withWrite((store) => {
        const doc = stampNew(data);
        store[key].push(doc);
        return doc;
      });
    },

    async findByIdAndUpdate(id: string, update: Record<string, unknown>, _opts?: { new?: boolean }) {
      return withWrite((store) => {
        const idx = store[key].findIndex((d) => String(d._id) === String(id));
        if (idx === -1) return null;
        const now = new Date().toISOString();
        store[key][idx] = { ...store[key][idx], ...update, updatedAt: now };
        return store[key][idx];
      });
    },

    async findByIdAndDelete(id: string) {
      return withWrite((store) => {
        const idx = store[key].findIndex((d) => String(d._id) === String(id));
        if (idx === -1) return null;
        const [removed] = store[key].splice(idx, 1);
        return removed;
      });
    },

    async countDocuments() {
      const store = await loadStore();
      return store[key].length;
    },

    async insertMany(items: Record<string, unknown>[]) {
      return withWrite((store) => {
        const created = items.map((item) => stampNew(item));
        store[key].push(...created);
        return created;
      });
    },
  };
}

export type LocalCollection = ReturnType<typeof createLocalCollection>;

export const localStore = {
  users: createLocalCollection('users'),
  donations: createLocalCollection('donations'),
  volunteers: createLocalCollection('volunteers'),
  impactMetrics: createLocalCollection('impactMetrics'),
  newsPosts: createLocalCollection('newsPosts'),
  campaigns: createLocalCollection('campaigns'),
  events: createLocalCollection('events'),
  galleryImages: createLocalCollection('galleryImages'),
  legalDocuments: createLocalCollection('legalDocuments'),
  contactMessages: createLocalCollection('contactMessages'),
  eventRegistrations: createLocalCollection('eventRegistrations'),
};
