'use server';

import connectToDatabase from '@/lib/db';
import { InterestModel } from '@/lib/models/Interest';
import { revalidatePath } from 'next/cache';

export async function submitInterest(data: {
  name: string;
  email: string;
  phone: string;
  activity: string;
  preferredDate: string;
  preferredTime: string;
}) {
  try {
    await connectToDatabase();
    await InterestModel.create(data);
    return { success: true };
  } catch (error: unknown) {
    console.error('Interest submission error:', error);
    return { success: false, error: 'Failed to submit interest' };
  }
}

export async function getInterests() {
  try {
    await connectToDatabase();
    const interests = await InterestModel.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(interests));
  } catch (error) {
    return [];
  }
}
