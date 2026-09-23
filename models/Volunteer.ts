import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  city: string;
  age?: number;
  skills?: string;
  areas: string[];
  availability?: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    age: { type: Number },
    skills: { type: String },
    areas: [{ type: String }],
    availability: { type: String },
    message: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export const Volunteer: Model<IVolunteer> = mongoose.models.Volunteer || mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
