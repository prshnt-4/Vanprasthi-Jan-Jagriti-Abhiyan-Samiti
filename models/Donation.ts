import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDonation extends Document {
  transactionId: string;
  amount: number;
  purpose: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  panNumber?: string;
  address?: string;
  isAnonymous: boolean;
  status: 'pending' | 'completed' | 'failed';
  paymentMode: 'mock' | 'razorpay';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, min: 1 },
    purpose: { type: String, required: true },
    donorName: { type: String, required: true },
    donorEmail: { type: String, required: true, trim: true },
    donorPhone: { type: String, required: true, trim: true },
    panNumber: { type: String, uppercase: true, trim: true },
    address: { type: String },
    isAnonymous: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
    paymentMode: { type: String, enum: ['mock', 'razorpay'], default: 'mock' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

export const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
