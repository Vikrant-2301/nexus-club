import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { EventModel } from '@/lib/models/Event';
import { AdminModel } from '@/lib/models/Admin';
import { events } from '@/lib/events';

export async function GET() {
  try {
    await connectToDatabase();
    // Clear existing
    await EventModel.deleteMany({});
    
    // Prepare the mock data for insertion (MongoDB will generate ObjectIds)
    const formattedEvents = events.map(e => {
      const { id, ...rest } = e;
      return rest;
    });

    await EventModel.insertMany(formattedEvents);

    // Seed Admin account
    await AdminModel.deleteMany({});
    await AdminModel.create({ username: 'admin', passwordHash: 'admin123' });

    return NextResponse.json({ message: 'Database seeded successfully with initial events and admin account!' });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
