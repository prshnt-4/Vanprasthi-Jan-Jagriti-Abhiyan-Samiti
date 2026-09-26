import type { AnyKeys, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { connectToDatabase } from './db';
import { seedDatabase } from './seedData';
import { isLocalTrialMode } from './localTrial';
import { ensureLocalTrialStore, localStore, type LocalCollection } from './localTrialStore';
import { User } from '@/models/User';
import { Donation } from '@/models/Donation';
import { Volunteer } from '@/models/Volunteer';
import { ImpactMetric } from '@/models/ImpactMetric';
import { NewsPost } from '@/models/NewsPost';
import { Campaign } from '@/models/Campaign';
import { Event } from '@/models/Event';
import { GalleryImage } from '@/models/GalleryImage';
import { LegalDocument } from '@/models/Document';
import { EventRegistration } from '@/models/EventRegistration';
import { ContactMessage } from '@/models/ContactMessage';

export { isLocalTrialMode };

type SortSpec = Record<string, 1 | -1>;

type DataCollection = {
  find(filter?: Record<string, unknown>): { sort(spec: SortSpec): Promise<unknown[]> };
  findOne(filter: Record<string, unknown>): Promise<unknown>;
  create(data: Record<string, unknown>): Promise<unknown>;
  findByIdAndUpdate(
    id: string,
    update: Record<string, unknown>,
    options?: { new?: boolean }
  ): Promise<unknown>;
  findByIdAndDelete(id: string): Promise<unknown>;
  countDocuments(): Promise<number>;
  insertMany(items: Record<string, unknown>[]): Promise<unknown[]>;
};

function createDataCollection<T extends object>(
  local: LocalCollection,
  mongo: Model<T>
): DataCollection {
  return {
    find(filter = {}) {
      return {
        sort(spec) {
          if (isLocalTrialMode()) {
            return Promise.resolve(local.find(filter).sort(spec));
          }
          return mongo.find(filter as FilterQuery<T>).sort(spec).lean().exec();
        },
      };
    },
    findOne(filter) {
      if (isLocalTrialMode()) return local.findOne(filter);
      return mongo.findOne(filter as FilterQuery<T>).lean().exec();
    },
    create(data) {
      if (isLocalTrialMode()) return local.create(data);
      return mongo.create(data as AnyKeys<T>);
    },
    findByIdAndUpdate(id, update, options) {
      if (isLocalTrialMode()) return local.findByIdAndUpdate(id, update, options);
      return mongo.findByIdAndUpdate(id, update as UpdateQuery<T>, options).lean().exec();
    },
    findByIdAndDelete(id) {
      if (isLocalTrialMode()) return local.findByIdAndDelete(id);
      return mongo.findByIdAndDelete(id).lean().exec();
    },
    countDocuments() {
      if (isLocalTrialMode()) return local.countDocuments();
      return mongo.countDocuments().exec();
    },
    insertMany(items) {
      if (isLocalTrialMode()) return local.insertMany(items);
      return mongo.insertMany(items);
    },
  };
}

export async function connectData() {
  if (isLocalTrialMode()) {
    await ensureLocalTrialStore();
    return;
  }
  await connectToDatabase();
  await seedDatabase();
}

export const db = {
  User: createDataCollection(localStore.users, User),
  Donation: createDataCollection(localStore.donations, Donation),
  Volunteer: createDataCollection(localStore.volunteers, Volunteer),
  ImpactMetric: createDataCollection(localStore.impactMetrics, ImpactMetric),
  NewsPost: createDataCollection(localStore.newsPosts, NewsPost),
  Campaign: createDataCollection(localStore.campaigns, Campaign),
  Event: createDataCollection(localStore.events, Event),
  GalleryImage: createDataCollection(localStore.galleryImages, GalleryImage),
  LegalDocument: createDataCollection(localStore.legalDocuments, LegalDocument),
  EventRegistration: createDataCollection(localStore.eventRegistrations, EventRegistration),
  ContactMessage: createDataCollection(localStore.contactMessages, ContactMessage),
};
