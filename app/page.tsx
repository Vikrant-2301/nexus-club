import HeroSection from '@/components/home/HeroSection';
import EventsContainer from '@/components/home/EventsContainer';
import InterestForm from '@/components/home/InterestForm';
import AboutSection from '@/components/home/AboutSection';
import connectToDatabase from '@/lib/db';
import { EventModel } from '@/lib/models/Event';

export default async function HomePage() {
  await connectToDatabase();
  const dbEvents = await EventModel.find({}).sort({ createdAt: -1 }).lean();
  const events = JSON.parse(JSON.stringify(dbEvents)).map((e: any) => ({...e, id: e._id}));

  return (
    <>
      <HeroSection />
      <EventsContainer initialEvents={events} />
      <InterestForm />
      <AboutSection />
    </>
  );
}
