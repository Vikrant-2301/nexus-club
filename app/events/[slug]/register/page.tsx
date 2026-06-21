import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import { EventModel } from '@/lib/models/Event';
import RegisterClient from './RegisterClient';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegisterPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const referredBy = typeof resolvedSearchParams?.ref === 'string' ? resolvedSearchParams.ref : undefined;
  await connectToDatabase();
  const dbEvent = await EventModel.findOne({ slug }).lean();
  if (!dbEvent) notFound();

  // Serialize object
  const event = JSON.parse(JSON.stringify(dbEvent));
  if (dbEvent && dbEvent._id) {
    event.id = dbEvent._id.toString();
  }

  return <RegisterClient event={event} referredBy={referredBy} />;
}
