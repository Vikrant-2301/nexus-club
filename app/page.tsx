import HeroSection from '@/components/home/HeroSection';
import EventsContainer from '@/components/home/EventsContainer';
import InterestForm from '@/components/home/InterestForm';
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

      {/* About section */}
      <section id="about" className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <div className="orb w-96 h-96 bg-indigo-600/10 -top-20 right-0 animate-glow-pulse" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                — About NEXUS CLUB
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Built for people who{' '}
                <span className="gradient-text">actually show up.</span>
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-4">
                NEXUS CLUB started with a simple idea — Mumbai has millions of people, but finding
                your people is still inexplicably hard. We organize events that make it easy.
              </p>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                From midnight football showdowns to sunrise runs, rooftop yoga to curated social
                mixers — every NEXUS event is designed to be a genuine experience, not just an
                occasion.
              </p>
              <div className="flex flex-wrap gap-3">
                {['No BS', 'Real People', 'Premium Venues', 'Great Vibes'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full glass border border-indigo-500/20 text-indigo-300 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: '⚡', title: 'Instant Registration', desc: '4-step booking in under 2 minutes' },
                { emoji: '📍', title: 'Premium Venues', desc: 'Only the best locations in Mumbai' },
                { emoji: '👥', title: 'Community First', desc: 'Solo, duo, or squad — all welcome' },
                { emoji: '🔒', title: 'Secure Payments', desc: 'UPI & verified payment process' },
              ].map(({ emoji, title, desc }) => (
                <div
                  key={title}
                  className="glass border border-white/8 rounded-2xl p-5 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{emoji}</div>
                  <h3 className="font-semibold text-white text-sm mb-1.5">{title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
