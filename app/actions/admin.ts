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

export async function getBookings() {
  await connectToDatabase();
  const bookings = await BookingModel.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(bookings));
}

export async function updateAdminPassword(username: string, oldHash: string, newHash: string) {
  await connectToDatabase();
  const admin = await AdminModel.findOne({ username, passwordHash: oldHash });
  if (!admin) return { success: false, message: 'Invalid current credentials' };
  
  admin.passwordHash = newHash;
  await admin.save();
  return { success: true, message: 'Password updated successfully' };
}

export async function sendPasswordReset(username: string) {
  // In a real application, you'd generate a token, save it to the DB, and send an email via nodemailer.
  // We simulate it here by logging the request. You should configure SMTP in .env.
  await connectToDatabase();
  const admin = await AdminModel.findOne({ username });
  if (!admin) return { success: false, message: 'Admin not found' };

  console.log(`[AUTH] Password reset requested for admin: ${username}`);
  console.log(`[AUTH] To complete reset, please configure Nodemailer SMTP in .env`);
  
  return { success: true, message: 'If an account exists, a reset link has been sent to the registered email.' };
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
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function updateEvent(id: string, data: Record<string, unknown>) {
  try {
    await connectToDatabase();
    const updatedEvent = await EventModel.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/');
    return { success: true, event: JSON.parse(JSON.stringify(updatedEvent)) };
  } catch (error: unknown) {
    console.error('Update event error:', error);
    return { success: false, error: (error as Error).message };
  }
}

