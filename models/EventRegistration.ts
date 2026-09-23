import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEventRegistration extends Document {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  volunteeringInterest: boolean;
  createdAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    eventId: { type: String, required: true },
    eventTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    volunteeringInterest: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const EventRegistration: Model<IEventRegistration> =
  mongoose.models.EventRegistration ||
  mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);
