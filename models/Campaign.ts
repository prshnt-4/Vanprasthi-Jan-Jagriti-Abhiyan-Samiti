import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICampaign extends Document {
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  coverImage: string;
  location: string;
  startDate: string;
  endDate?: string;
  category: string;
  goalAmount?: number;
  raisedAmount?: number;
  status: 'active' | 'completed' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    coverImage: { type: String, required: true },
    location: { type: String, default: 'Roorkee, Uttarakhand' },
    startDate: { type: String, required: true },
    endDate: { type: String },
    category: { type: String, required: true },
    goalAmount: { type: Number },
    raisedAmount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'completed', 'draft'], default: 'active' },
  },
  { timestamps: true }
);

export const Campaign: Model<ICampaign> = mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema);
