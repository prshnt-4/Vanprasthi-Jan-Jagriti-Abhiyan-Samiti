import mongoose, { Schema, Document as MongooseDoc, Model } from 'mongoose';

export interface IDocument extends MongooseDoc {
  title: { en: string; hi: string };
  fileUrl: string;
  category: 'Registration' | 'Annual Report' | 'Financial Report' | 'Certificate' | 'Brochure';
  description?: { en: string; hi: string };
  uploadDate: string;
  createdAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    fileUrl: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Registration', 'Annual Report', 'Financial Report', 'Certificate', 'Brochure'],
    },
    description: {
      en: { type: String },
      hi: { type: String },
    },
    uploadDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const LegalDocument: Model<IDocument> =
  mongoose.models.LegalDocument || mongoose.model<IDocument>('LegalDocument', DocumentSchema);
