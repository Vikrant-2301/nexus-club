import mongoose, { Schema, Document, Model } from 'mongoose';
import { GroupType, Attendee } from '../types';

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  eventSlug: string;
  dateId: string;
  groupType: GroupType;
  groupSize: number;
  attendees: Attendee[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  contactEmail: string;
  contactPhone: string;
  inviteCode?: string;
  referredBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    eventSlug: { type: String, required: true },
    dateId: { type: String, required: true },
    groupType: { type: String, required: true },
    groupSize: { type: Number, required: true },
    attendees: [
      {
        name: String,
        phone: String,
        email: String,
        age: String,
        emergencyContact: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    inviteCode: { type: String, unique: true, sparse: true },
    referredBy: String,
  },
  { timestamps: true }
);

export const BookingModel: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
