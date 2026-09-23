import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  date: string;
  time: string;
  location: string;
  images: string[];
  category: string;
  status: 'upcoming' | 'past';
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    status: { type: String, enum: ['upcoming', 'past'], default: 'upcoming' },
  },
  { timestamps: true }
);

export const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
