import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInterest extends Document {
  name: string;
  email: string;
  phone: string;
  activity: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'notified';
  createdAt: Date;
  updatedAt: Date;
}

const InterestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    activity: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    status: { type: String, enum: ['pending', 'notified'], default: 'pending' },
  },
  { timestamps: true }
);

export const InterestModel: Model<IInterest> = mongoose.models.Interest || mongoose.model<IInterest>('Interest', InterestSchema);
