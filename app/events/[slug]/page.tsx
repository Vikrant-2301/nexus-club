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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondwork.site';
  const url = `${siteUrl}/events/${slug}`;
  const title = `${dbEvent.title} — BEYOND WORK`;
  const description = dbEvent.tagline || 'Join us for this exciting event.';
  const image = dbEvent.coverImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: dbEvent.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
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
