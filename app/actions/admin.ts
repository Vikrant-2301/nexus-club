'use server';

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/db';
import { EventModel } from '@/lib/models/Event';
import { BookingModel } from '@/lib/models/Booking';
import { AdminModel } from '@/lib/models/Admin';

export async function authenticateAdmin(username: string, passwordHash: string) {
  await connectToDatabase();
  const admin = await AdminModel.findOne({ username, passwordHash });
  return !!admin;
}

export async function getEvents() {
  await connectToDatabase();
  const events = await EventModel.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(events));
}

export async function createEvent(data: Record<string, unknown>) {
  try {
    await connectToDatabase();
    // Validate schema or assume frontend does it for now
    const newEvent = await EventModel.create(data);
    revalidatePath('/');
    return { success: true, event: JSON.parse(JSON.stringify(newEvent)) };
  } catch (error: unknown) {
    console.error('Create event error:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getAdminStats() {
  await connectToDatabase();
  const events = await EventModel.find({}).lean();
  const bookings = await BookingModel.find({ status: 'completed' }).lean();

  let totalSpots = 0;
  let spotsLeft = 0;

  events.forEach((event: any) => {
    event.dates.forEach((d: any) => {
      totalSpots += d.spotsTotal;
      spotsLeft += d.spotsLeft;
    });
  });

  const revenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return {
    totalEvents: events.length,
    totalSpots,
    spotsLeft,
    spotsTaken: totalSpots - spotsLeft,
    totalBookings: bookings.length,
    revenue
  };
}

export async function deleteEvent(id: string) {
  await connectToDatabase();
  await EventModel.findByIdAndDelete(id);
  return { success: true };
}
