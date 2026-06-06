import mongoose, { Schema, Document, Model } from 'mongoose';
import { EventCategory } from '../types';

export interface IEvent extends Document {
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  tags: string[];
  description: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  whatToBring: string[];
  rules: string[];
  coverImage: string;
  images: string[];
  dates: {
    id: string;
    label: string;
    date: string;
    time: string;
    location: string;
    spotsTotal: number;
    spotsLeft: number;
    soldOut?: boolean;
  }[];
  pricing: {
    solo: number;
    duo: number;
    group3: number;
    group4plus: number;
  };
  earlyBird?: {
    active: boolean;
    pricing: {
      solo: number;
      duo: number;
      group3: number;
      group4plus: number;
    };
    label: string;
    limit: number;
  };
  mapLocation: {
    lat: number;
    lng: number;
    address: string;
    landmark?: string;
  };
  organizer: {
    name: string;
    avatar: string;
    role: string;
    events: number;
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
  upiId?: string;
  qrCode?: string;
  featured?: boolean;
  difficulty?: string;
  minAge?: number;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    description: { type: String, required: true },
    highlights: [{ type: String }],
    schedule: [{ time: String, activity: String }],
    whatToBring: [{ type: String }],
    rules: [{ type: String }],
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    dates: [
      {
        id: String,
        label: String,
        date: String,
        time: String,
        location: String,
        spotsTotal: Number,
        spotsLeft: Number,
        soldOut: Boolean,
      },
    ],
    pricing: {
      solo: Number,
      duo: Number,
      group3: Number,
      group4plus: Number,
    },
    earlyBird: {
      active: Boolean,
      pricing: {
        solo: Number,
        duo: Number,
        group3: Number,
        group4plus: Number,
      },
      label: String,
      limit: Number,
    },
    mapLocation: {
      lat: Number,
      lng: Number,
      address: String,
      landmark: String,
    },
    organizer: {
      name: String,
      avatar: String,
      role: String,
      events: Number,
      linkedin: String,
      instagram: String,
      email: String,
    },
    upiId: String,
    qrCode: String,
    featured: Boolean,
    difficulty: String,
    minAge: Number,
  },
  { timestamps: true }
);

export const EventModel: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
