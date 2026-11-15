/**
 * Firebase Seed Script — Vanprasthi Jan-Jagriti Abhiyan Samiti
 *
 * Run ONCE after Firebase setup:
 *   npm run seed
 *
 * Requirements:
 *   Download serviceAccountKey.json from Firebase Console →
 *   Project Settings → Service Accounts → Generate new private key
 *   Place it in the project root (same folder as package.json)
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// ── ESM-compatible firebase-admin import ──────────────────────────────────────
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load service account ──────────────────────────────────────────────────────
let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    console.log('✅ Loaded service account from env var');
  } catch (e) {
    console.error('❌ Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', e.message);
    process.exit(1);
  }
} else {
  const keyPath = path.join(__dirname, '..', 'serviceAccountKey.json');
  if (!existsSync(keyPath)) {
    console.error('\n❌ serviceAccountKey.json not found!\n');
    console.error('Steps to fix:');
    console.error('  1. Firebase Console → Project Settings → Service Accounts');
    console.error('  2. Click "Generate new private key"');
    console.error('  3. Save it as serviceAccountKey.json in the project root\n');
    process.exit(1);
  }
  serviceAccount = JSON.parse(readFileSync(keyPath, 'utf8'));
  console.log('✅ Loaded service account from serviceAccountKey.json');
}

// ── Init Firebase Admin ───────────────────────────────────────────────────────
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const auth = getAuth();
const db   = getFirestore();

// ── Config ────────────────────────────────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@vanprasthisamiti.org';
const ADMIN_PASSWORD = 'vanprasthiji';
const ADMIN_NAME     = 'Admin — Vanprasthi Samiti';

const now = FieldValue.serverTimestamp();

// ── Create Admin User ─────────────────────────────────────────────────────────
async function createAdminUser() {
  console.log('\n── Creating Admin User ──────────────────────────────────');
  try {
    const existing = await auth.getUserByEmail(ADMIN_EMAIL).catch(() => null);
    if (existing) {
      console.log(`⚠️  User already exists: ${ADMIN_EMAIL} (uid: ${existing.uid})`);
      await auth.updateUser(existing.uid, { password: ADMIN_PASSWORD, displayName: ADMIN_NAME });
      console.log('✅ Password updated.');
      return existing.uid;
    }

    const user = await auth.createUser({
      email:         ADMIN_EMAIL,
      password:      ADMIN_PASSWORD,
      displayName:   ADMIN_NAME,
      emailVerified: true,
    });
    console.log('✅ Admin user created!');
    console.log(`   Email    : ${ADMIN_EMAIL}`);
    console.log(`   Password : ${ADMIN_PASSWORD}`);
    console.log(`   UID      : ${user.uid}`);
    return user.uid;
  } catch (err) {
    console.error('❌ Failed to create admin user:', err.message);
    throw err;
  }
}

// ── Seed Impact Metrics ───────────────────────────────────────────────────────
async function seedImpactMetrics() {
  console.log('\n── Seeding Impact Metrics ───────────────────────────────');
  const metrics = [
    { metricId: 'cleanliness_drives',          title: 'Cleanliness Drives',              titleHi: 'स्वच्छता अभियान',         value: '—', icon: 'cleanliness', isVisible: true, order: 1 },
    { metricId: 'social_education_programs',   title: 'Social Education Programs',       titleHi: 'सामाजिक शिक्षा कार्यक्रम', value: '—', icon: 'education',   isVisible: true, order: 2 },
    { metricId: 'volunteers_registered',       title: 'Volunteers Registered',           titleHi: 'स्वयंसेवक पंजीकृत',        value: '—', icon: 'volunteers',  isVisible: true, order: 3 },
    { metricId: 'disadvantaged_assisted',      title: 'Disadvantaged People Assisted',   titleHi: 'वंचितों को सहायता',         value: '—', icon: 'people',      isVisible: true, order: 4 },
  ];

  const batch = db.batch();
  let queued = 0;

  for (const metric of metrics) {
    const ref  = db.collection('impact_metrics').doc(metric.metricId);
    const snap = await ref.get();
    if (snap.exists) {
      console.log(`   ⚠️  impact_metrics/${metric.metricId} already exists — skipping`);
      continue;
    }
    batch.set(ref, { ...metric, createdAt: now, updatedAt: now });
    console.log(`   ✅ Queued: ${metric.metricId}`);
    queued++;
  }

  if (queued > 0) await batch.commit();
  console.log('✅ Impact metrics done.');
}

// ── Seed Legal Documents ──────────────────────────────────────────────────────
async function seedLegalDocuments() {
  console.log('\n── Seeding Legal Documents ──────────────────────────────');

  const snap = await db.collection('legal_documents')
    .where('title', '==', 'Registration Certificate').limit(1).get();

  if (!snap.empty) {
    console.log('   ⚠️  Registration Certificate already exists — skipping');
  } else {
    const ref = db.collection('legal_documents').doc();
    await ref.set({
      title:       'Registration Certificate',
      description: 'Society Registration Certificate — Reg. No. 052/2016-2017',
      category:    'registration',
      fileUrl:     '',
      isPublic:    true,
      order:       1,
      createdAt:   now,
      updatedAt:   now,
    });
    console.log('   ✅ Registration Certificate seeded.');
  }
  console.log('✅ Legal documents done.');
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 Vanprasthi Samiti — Firebase Seed Script');
  console.log('============================================');

  await createAdminUser();
  await seedImpactMetrics();
  await seedLegalDocuments();

  console.log('\n============================================');
  console.log('✅ All done! Log in at:');
  console.log('   http://localhost:3000/admin/login/');
  console.log(`   Email    : ${ADMIN_EMAIL}`);
  console.log(`   Password : ${ADMIN_PASSWORD}`);
  console.log('\n📌 Next: npm run dev\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Seed failed:', err.message);
  process.exit(1);
});
