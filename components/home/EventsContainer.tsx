'use client';

import { useState } from 'react';
import EventCard from '@/components/home/EventCard';
import EventFilters from '@/components/home/EventFilters';
import { Search } from 'lucide-react';
import { Event } from '@/lib/types';

export default function EventsContainer({ initialEvents }: { initialEvents: Event[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = initialEvents.filter((e) => {
    const matchCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
            — Upcoming Events
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-2"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            What's On
          </h2>
          <p className="text-white/50 text-base">
            {filtered.length} event{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Search + filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-shrink-0 sm:w-72">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
            />
            <input
              id="event-search"
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-white/10 text-white text-sm placeholder:text-white/30 outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all"
            />
          </div>

          {/* Category filters */}
          <EventFilters selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <div key={event.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <EventCard event={event} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/50 text-lg">No events found</p>
            <p className="text-white/30 text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </section>
  );
}
