import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INewsPost extends Document {
  title: { en: string; hi: string };
  slug: string;
  content: { en: string; hi: string };
  coverImage: string;
  author: string;
  publishedDate: string;
  category: string;
  seoDescription?: { en: string; hi: string };
  createdAt: Date;
  updatedAt: Date;
}

const NewsPostSchema = new Schema<INewsPost>(
  {
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    slug: { type: String, required: true, unique: true },
    content: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
    },
    coverImage: { type: String, required: true },
    author: { type: String, default: 'Vanprasthi Samiti Editorial' },
    publishedDate: { type: String, required: true },
    category: { type: String, default: 'News' },
    seoDescription: {
      en: { type: String },
      hi: { type: String },
    },
  },
  { timestamps: true }
);

export const NewsPost: Model<INewsPost> =
  mongoose.models.NewsPost || mongoose.model<INewsPost>('NewsPost', NewsPostSchema);
