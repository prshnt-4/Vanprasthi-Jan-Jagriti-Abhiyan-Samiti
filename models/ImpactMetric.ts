import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IImpactMetric extends Document {
  metricId: string;
  label: { en: string; hi: string };
  value: string; // e.g. "—" or verified number from admin
  description: { en: string; hi: string };
  iconName: string;
  isVisible: boolean;
  order: number;
}

const ImpactMetricSchema = new Schema<IImpactMetric>(
  {
    metricId: { type: String, required: true, unique: true },
    label: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    value: { type: String, required: true, default: '—' },
    description: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    iconName: { type: String, default: 'Heart' },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ImpactMetric: Model<IImpactMetric> =
  mongoose.models.ImpactMetric || mongoose.model<IImpactMetric>('ImpactMetric', ImpactMetricSchema);
