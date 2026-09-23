import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  heroHeadline: { en: string; hi: string };
  heroSubtext: { en: string; hi: string };
  heroImage: string;
  aboutText: { en: string; hi: string };
  contactPhone1: string;
  contactPhone2: string;
  contactEmail: string;
  contactAddress: { en: string; hi: string };
  registrationNumber: string;
  registrationDate: string;
  presidentName: { en: string; hi: string };
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    heroHeadline: {
      en: { type: String, default: 'Vanprasthi Jan-Jagriti Abhiyan Samiti, Roorkee' },
      hi: { type: String, default: 'वानप्रस्थी जन-जागृति अभियान समिति, रुड़की' },
    },
    heroSubtext: {
      en: {
        type: String,
        default:
          'Dedicated to Swachhata drives, social education, anti-corruption awareness, and community service in Roorkee and Uttarakhand.',
      },
      hi: {
        type: String,
        default:
          'वरिष्ठ नागरिकों व स्वयंसेवकों के अनुभव से स्वच्छ, स्वस्थ, शिक्षित व भ्रष्टाचार मुक्त समाज के निर्माण हेतु समर्पित गैर-राजनीतिक पंजीकृत संस्था।',
      },
    },
    heroImage: { type: String, default: '/images/hero-vanprasthi.jpg' },
    aboutText: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
    },
    contactPhone1: { type: String, default: '9897656698' },
    contactPhone2: { type: String, default: '9897042110' },
    contactEmail: { type: String, default: 'info@vanprasthisamiti.org' },
    contactAddress: {
      en: {
        type: String,
        default:
          'Sheelanchal, 19 Bhagirath Kunj, Station Road, Roorkee - 247667, Dist. Haridwar, Uttarakhand',
      },
      hi: {
        type: String,
        default:
          'मुख्यालय- शीलांचल, 19 भागीरथ कुंज, भागीरथी सहकारी आवास समिति, स्टेशन रोड, रुड़की-247667, जिला हरिद्वार (उत्तराखण्ड)',
      },
    },
    registrationNumber: { type: String, default: '052/2016-2017' },
    registrationDate: { type: String, default: '06.06.2016' },
    presidentName: {
      en: { type: String, default: 'Col. M.P. Sharma (Retd.)' },
      hi: { type: String, default: 'कर्नल एम०पी० शर्मा (से०नि०)' },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
