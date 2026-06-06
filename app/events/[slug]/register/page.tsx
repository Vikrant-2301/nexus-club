import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/db';
import { EventModel } from '@/lib/models/Event';
import RegisterClient from './RegisterClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RegisterPage({ params }: Props) {
  const { slug } = await params;
  await connectToDatabase();
  const dbEvent = await EventModel.findOne({ slug }).lean();
  if (!dbEvent) notFound();

  // Serialize object
  const event = JSON.parse(JSON.stringify(dbEvent));
  if (dbEvent && dbEvent._id) {
    event.id = dbEvent._id.toString();
  }

  return <RegisterClient event={event} />;
}
