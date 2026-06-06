import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import { EventModel } from '@/lib/models/Event';
import type { Metadata } from 'next';
import EventPageClient from './EventPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();
  const dbEvent = await EventModel.findOne({ slug }).lean();
  if (!dbEvent) return { title: 'Event Not Found' };
  return {
    title: `${dbEvent.title} — NEXUS CLUB`,
    description: dbEvent.tagline,
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const dbEvent = await EventModel.findOne({ slug }).lean();
  if (!dbEvent) notFound();
  
  // Serialize object and add id field
  const event = JSON.parse(JSON.stringify(dbEvent));
  if (dbEvent && dbEvent._id) {
    event.id = dbEvent._id.toString();
  }

  return <EventPageClient event={event} />;
}
