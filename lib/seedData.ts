import { connectToDatabase } from './db';
import { User } from '@/models/User';
import { ImpactMetric } from '@/models/ImpactMetric';
import { LegalDocument } from '@/models/Document';
import { SiteSettings } from '@/models/SiteSettings';
import { hashPassword } from './auth';

export async function seedDatabase() {
  await connectToDatabase();

  // 1. Seed Admin User
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    const hashedPassword = await hashPassword('AdminPass@2026!');
    await User.create({
      name: 'Col. M.P. Sharma (Retd.) / System Admin',
      email: 'admin@vanprasthisamiti.org',
      password: hashedPassword,
      role: 'admin',
    });
  }

  // 2. Seed Default Impact Metrics (Zero Invention Policy: default is "—")
  const metricsCount = await ImpactMetric.countDocuments();
  if (metricsCount === 0) {
    await ImpactMetric.insertMany([
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
    ]);
  }

  // 3. Seed Verified Legal Document from Brochure
  const docCount = await LegalDocument.countDocuments();
  if (docCount === 0) {
    await LegalDocument.create({
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
    });
  }

  // 4. Seed Initial Site Settings
  const settingsExists = await SiteSettings.findOne();
  if (!settingsExists) {
    await SiteSettings.create({
      heroHeadline: {
        en: 'Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee',
        hi: 'वानप्रस्थी जन-जागृति अभियान समिति, रुड़की',
      },
      heroSubtext: {
        en: 'A non-political registered NGO in Roorkee dedicated to cleanliness drives, social education, anti-corruption awareness, and community service.',
        hi: 'वरिष्ठ नागरिकों व स्वयंसेवकों के अनुभव से स्वच्छ, स्वस्थ, शिक्षित व भ्रष्टाचार मुक्त समाज के निर्माण हेतु समर्पित गैर-राजनीतिक पंजीकृत संस्था।',
      },
      heroImage: '/images/hero-ngo.jpg',
      registrationNumber: '052/2016-2017',
      registrationDate: '06.06.2016',
      contactPhone1: '9897656698',
      contactPhone2: '9897042110',
      contactEmail: 'info@vanprasthisamiti.org',
      contactAddress: {
        en: 'Sheelanchal, 19 Bhagirath Kunj, Station Road, Roorkee - 247667, Dist. Haridwar, Uttarakhand',
        hi: 'मुख्यालय- शीलांचल, 19 भागीरथ कुंज, भागीरथी सहकारी आवास समिति, स्टेशन रोड, रुड़की-247667, जिला हरिद्वार (उत्तराखण्ड)',
      },
      presidentName: {
        en: 'Col. M.P. Sharma (Retd.)',
        hi: 'कर्नल एम०पी० शर्मा (से०नि०)',
      },
    });
  }
}
