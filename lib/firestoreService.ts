import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

export interface BilingualText {
  en: string;
  hi: string;
}

export interface CampaignItem {
  id?: string;
  _id?: string;
  title: BilingualText;
  description: BilingualText;
  coverImage: string;
  location?: string;
  startDate: string;
  endDate?: string;
  category: string;
  goalAmount?: number;
  raisedAmount?: number;
  status: 'active' | 'completed' | 'draft';
  createdAt?: any;
}

export interface EventItem {
  id?: string;
  _id?: string;
  title: BilingualText;
  description: BilingualText;
  date: string;
  time: string;
  location: string;
  images?: string[];
  category: string;
  status: 'upcoming' | 'past';
  createdAt?: any;
}

export interface NewsItem {
  id?: string;
  _id?: string;
  slug?: string;
  title: BilingualText;
  content: BilingualText;
  publishDate: string;
  publishedDate?: string;
  author?: string;
  category?: string;
  coverImage?: string;
  tags?: string[];
  createdAt?: any;
}

export interface GalleryItem {
  id?: string;
  _id?: string;
  title: BilingualText;
  description?: BilingualText;
  imageUrl: string;
  category: string;
  date?: string;
  createdAt?: any;
}

export interface DocumentItem {
  id?: string;
  _id?: string;
  title: BilingualText;
  fileUrl: string;
  category: string;
  description?: BilingualText;
  uploadDate?: string;
  createdAt?: any;
}

export interface ImpactMetricItem {
  id?: string;
  _id?: string;
  metricId: string;
  label: BilingualText;
  value: string;
  description: BilingualText;
  iconName?: string;
  order?: number;
  isVisible?: boolean;
}

export interface VolunteerItem {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  occupation?: string;
  interestAreas?: string[];
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: any;
}

export interface DonationItem {
  id?: string;
  _id?: string;
  transactionId: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  panNumber?: string;
  amount: number;
  purpose: string;
  status: string;
  paymentMode: string;
  isAnonymous?: boolean;
  address?: string;
  createdAt?: any;
}

export interface ContactMessageItem {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: string;
  createdAt?: any;
}

export interface EventRegistrationItem {
  id?: string;
  _id?: string;
  eventId?: string;
  eventTitle?: string;
  name: string;
  email: string;
  phone: string;
  isVolunteering?: boolean;
  createdAt?: any;
}

// Fallback Initial Seed Metrics
const DEFAULT_METRICS: ImpactMetricItem[] = [
  {
    metricId: 'cleanliness_drives',
    label: { en: 'Cleanliness Drives Conducted', hi: 'स्वच्छता अभियान' },
    value: '—',
    description: {
      en: 'Neighborhood cleanup drives and waste management workshops',
      hi: 'गली-मोहल्ला सफाई व कचरा निस्तारण जनजागृति अभियान',
    },
    iconName: 'Sparkles',
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
    order: 4,
  },
];

// Helper to normalize Firestore doc
function normalizeDoc<T>(id: string, data: any): T {
  return {
    ...data,
    id,
    _id: id,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString(),
  } as T;
}

// ==================== CAMPAIGNS ====================
export async function getCampaigns(): Promise<CampaignItem[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => normalizeDoc<CampaignItem>(d.id, d.data()));
  } catch (e) {
    // If index or query fails, try plain getDocs
    try {
      const snapshot = await getDocs(collection(db, 'campaigns'));
      return snapshot.docs.map((d) => normalizeDoc<CampaignItem>(d.id, d.data()));
    } catch {
      return [];
    }
  }
}

export async function addCampaign(data: Omit<CampaignItem, 'id' | '_id'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'campaigns'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteCampaign(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, 'campaigns', id));
}

// ==================== EVENTS ====================
export async function getEvents(): Promise<EventItem[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'events'));
    return snapshot.docs.map((d) => normalizeDoc<EventItem>(d.id, d.data()));
  } catch {
    return [];
  }
}

export async function addEvent(data: Omit<EventItem, 'id' | '_id'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'events'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteEvent(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, 'events', id));
}

export async function registerForEvent(data: EventRegistrationItem): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'event_registrations'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// ==================== NEWS POSTS ====================
export async function getNews(): Promise<NewsItem[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'news_posts'));
    return snapshot.docs.map((d) => normalizeDoc<NewsItem>(d.id, d.data()));
  } catch {
    return [];
  }
}

export async function addNews(data: Omit<NewsItem, 'id' | '_id'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'news_posts'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteNews(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, 'news_posts', id));
}

// ==================== GALLERY ====================
export async function getGalleryImages(): Promise<GalleryItem[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'gallery_images'));
    return snapshot.docs.map((d) => normalizeDoc<GalleryItem>(d.id, d.data()));
  } catch {
    return [];
  }
}

export async function addGalleryImage(data: Omit<GalleryItem, 'id' | '_id'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'gallery_images'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, 'gallery_images', id));
}

// ==================== LEGAL DOCUMENTS ====================
export async function getLegalDocuments(): Promise<DocumentItem[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'legal_documents'));
    const list = snapshot.docs.map((d) => normalizeDoc<DocumentItem>(d.id, d.data()));
    if (list.length === 0) {
      // Default verified registration doc fallback
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
  } catch {
    return [];
  }
}

export async function addLegalDocument(data: Omit<DocumentItem, 'id' | '_id'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'legal_documents'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteLegalDocument(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, 'legal_documents', id));
}

// ==================== IMPACT METRICS ====================
export async function getImpactMetrics(): Promise<ImpactMetricItem[]> {
  if (!db) return DEFAULT_METRICS;
  try {
    const snapshot = await getDocs(collection(db, 'impact_metrics'));
    if (snapshot.empty) return DEFAULT_METRICS;
    const list = snapshot.docs.map((d) => normalizeDoc<ImpactMetricItem>(d.id, d.data()));
    return list.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch {
    return DEFAULT_METRICS;
  }
}

export async function updateImpactMetric(id: string, update: Partial<ImpactMetricItem>): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, 'impact_metrics', id), {
    ...update,
    updatedAt: serverTimestamp(),
  });
}

export async function seedInitialImpactMetrics(): Promise<void> {
  if (!db) return;
  const snapshot = await getDocs(collection(db, 'impact_metrics'));
  if (snapshot.empty) {
    for (const metric of DEFAULT_METRICS) {
      await addDoc(collection(db, 'impact_metrics'), {
        ...metric,
        createdAt: serverTimestamp(),
      });
    }
  }
}

// ==================== VOLUNTEERS ====================
export async function getVolunteers(): Promise<VolunteerItem[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'volunteers'));
    return snapshot.docs.map((d) => normalizeDoc<VolunteerItem>(d.id, d.data()));
  } catch {
    return [];
  }
}

export async function createVolunteer(data: Omit<VolunteerItem, 'id' | '_id' | 'status'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'volunteers'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateVolunteerStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<void> {
  if (!db) return;
  await updateDoc(doc(db, 'volunteers', id), { status });
}

export async function deleteVolunteer(id: string): Promise<void> {
  if (!db) return;
  await deleteDoc(doc(db, 'volunteers', id));
}

// ==================== DONATIONS ====================
export async function getDonations(): Promise<DonationItem[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'donations'));
    return snapshot.docs.map((d) => normalizeDoc<DonationItem>(d.id, d.data()));
  } catch {
    return [];
  }
}

export async function createDonation(data: Omit<DonationItem, 'id' | '_id'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'donations'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// ==================== CONTACT MESSAGES ====================
export async function createContactMessage(data: Omit<ContactMessageItem, 'id' | '_id'>): Promise<string> {
  if (!db) throw new Error('Firebase Firestore not initialized');
  const docRef = await addDoc(collection(db, 'contact_messages'), {
    ...data,
    status: 'unread',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getContactMessages(): Promise<ContactMessageItem[]> {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'contact_messages'));
    return snapshot.docs.map((d) => normalizeDoc<ContactMessageItem>(d.id, d.data()));
  } catch {
    return [];
  }
}
