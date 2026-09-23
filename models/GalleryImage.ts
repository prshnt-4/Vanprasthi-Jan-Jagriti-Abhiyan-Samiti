import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImage extends Document {
  title: { en: string; hi: string };
  imageUrl: string;
  category: string;
  caption?: { en: string; hi: string };
  createdAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Cleanliness',
        'Social Education',
        'Anti Corruption',
        'Social Service',
        'Events',
        'Campaigns',
        'Volunteers',
      ],
    },
    caption: {
      en: { type: String },
      hi: { type: String },
    },
  },
  { timestamps: true }
);

export const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
