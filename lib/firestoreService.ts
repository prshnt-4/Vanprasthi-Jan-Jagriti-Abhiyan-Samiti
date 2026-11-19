import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ─── Helpers ──────────────────────────────────────────────
function normalizeDoc<T>(id: string, data: any): T {
  return {
    ...data,
    id,
    _id: id,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || new Date().toISOString(),
  } as T;
}

async function safeGetDocs(col: string): Promise<any[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, col), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => normalizeDoc(d.id, d.data()));
  } catch {
    try {
      const snap = await getDocs(collection(db, col));
      return snap.docs.map((d) => normalizeDoc(d.id, d.data()));
    } catch {
      return [];
    }
  }
}

async function addToCollection(col: string, data: any): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, col), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

async function deleteFromCollection(col: string, id: string): Promise<void> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  await deleteDoc(doc(db, col, id));
}

// ─── Campaigns ────────────────────────────────────────────
export const getCampaigns = () => safeGetDocs('campaigns');
export const addCampaign = (data: any) => addToCollection('campaigns', data);
export const deleteCampaign = (id: string) => deleteFromCollection('campaigns', id);

// ─── Events ───────────────────────────────────────────────
export const getEvents = () => safeGetDocs('events');
export const addEvent = (data: any) => addToCollection('events', data);
export const deleteEvent = (id: string) => deleteFromCollection('events', id);

export async function registerForEvent(data: any): Promise<string> {
  return addToCollection('event_registrations', data);
}

// ─── News ─────────────────────────────────────────────────
export const getNews = () => safeGetDocs('news_posts');
export const addNews = (data: any) => addToCollection('news_posts', data);
export const deleteNews = (id: string) => deleteFromCollection('news_posts', id);

// ─── Gallery ──────────────────────────────────────────────
export const getGalleryImages = () => safeGetDocs('gallery_images');
export const addGalleryImage = (data: any) => addToCollection('gallery_images', data);
export const deleteGalleryImage = (id: string) => deleteFromCollection('gallery_images', id);

// ─── Legal Documents ──────────────────────────────────────
export async function getLegalDocuments(): Promise<any[]> {
  const list = await safeGetDocs('legal_documents');
  if (list.length === 0) {
    return [
      {
        _id: 'default-reg-doc',
        id: 'default-reg-doc',
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
      },
    ];
  }
  return list;
}
export const addLegalDocument = (data: any) => addToCollection('legal_documents', data);
export const deleteLegalDocument = (id: string) => deleteFromCollection('legal_documents', id);

// ─── Impact Metrics ───────────────────────────────────────
const DEFAULT_METRICS = [
  {
    metricId: 'cleanliness_drives',
    label: { en: 'Cleanliness Drives Conducted', hi: 'स्वच्छता अभियान' },
    value: '—',
    description: { en: 'Neighborhood cleanup drives and waste management workshops', hi: 'गली-मोहल्ला सफाई व कचरा निस्तारण जनजागृति अभियान' },
    iconName: 'Sparkles',
    order: 1,
    isVisible: true,
  },
  {
    metricId: 'social_education_programs',
    label: { en: 'Social Education Programs', hi: 'सामाजिक शिक्षा कार्यक्रम' },
    value: '—',
    description: { en: 'Moral values, elder respect, and street child schooling drives', hi: 'संस्कार, बुजुर्गों का सम्मान व बालक शिक्षा अभियान' },
    iconName: 'BookOpen',
    order: 2,
    isVisible: true,
  },
  {
    metricId: 'volunteers_registered',
    label: { en: 'Registered Volunteers', hi: 'सक्रिय स्वयंसेवक' },
    value: '—',
    description: { en: 'Citizens dedicated to selfless social service', hi: 'निस्वार्थ समाज सेवा में समर्पित नागरिक व वरिष्ठ जन' },
    iconName: 'Users',
    order: 3,
    isVisible: true,
  },
  {
    metricId: 'disadvantaged_assisted',
    label: { en: 'Welfare Scheme Guidance', hi: 'सरकारी योजना सहायता' },
    value: '—',
    description: { en: 'Assisting disadvantaged families in accessing welfare benefits', hi: 'जन-कल्याणकारी योजनाओं का लाभ दिलाने का मार्गदर्शन' },
    iconName: 'HeartHandshake',
    order: 4,
    isVisible: true,
  },
];

export async function getImpactMetrics(): Promise<any[]> {
  if (!db) return DEFAULT_METRICS;
  try {
    const snap = await getDocs(collection(db, 'impact_metrics'));
    if (snap.empty) return DEFAULT_METRICS;
    const list = snap.docs.map((d) => normalizeDoc(d.id, d.data()));
    return (list as any[]).sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch {
    return DEFAULT_METRICS;
  }
}

export async function updateImpactMetric(id: string, update: any): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, 'impact_metrics', id), {
    ...update,
    updatedAt: serverTimestamp(),
  });
}

// ─── Volunteers ───────────────────────────────────────────
export const getVolunteers = () => safeGetDocs('volunteers');
export async function createVolunteer(data: any): Promise<string> {
  return addToCollection('volunteers', { ...data, status: 'pending' });
}
export async function updateVolunteerStatus(id: string, status: string): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, 'volunteers', id), { status });
}
export const deleteVolunteer = (id: string) => deleteFromCollection('volunteers', id);

// ─── Donations ────────────────────────────────────────────
export const getDonations = () => safeGetDocs('donations');
export const createDonation = (data: any) => addToCollection('donations', data);

// ─── Contact Messages ────────────────────────────────────
export async function createContactMessage(data: any): Promise<string> {
  return addToCollection('contact_messages', { ...data, status: 'unread', adminNote: '' });
}
export const getContactMessages = () => safeGetDocs('contact_messages');
export async function updateContactMessage(id: string, update: any): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, 'contact_messages', id), {
    ...update,
    updatedAt: serverTimestamp(),
  });
}
export const deleteContactMessage = (id: string) => deleteFromCollection('contact_messages', id);
