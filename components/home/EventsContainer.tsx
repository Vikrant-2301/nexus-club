'use client';

import { useState } from 'react';
import EventCard from '@/components/home/EventCard';
import EventFilters from '@/components/home/EventFilters';
import { Search } from 'lucide-react';
import { Event } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventsContainer({ initialEvents }: { initialEvents: Event[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const availableCategories = ['All', ...Array.from(new Set(initialEvents.map(e => e.category)))];

  const filtered = initialEvents.filter((e) => {
    const matchCat = selectedCategory === 'All' || e.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="events" className="relative py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center flex flex-col items-center"
        >
          <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-4 block">
            Upcoming Events
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            What's On
          </h2>
          <p className="text-white/40 text-sm max-w-md font-light">
            {filtered.length} event{filtered.length !== 1 ? 's' : ''} available. Book your spot before they fill up.
          </p>
        </motion.div>

        {/* Search + filters bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Search */}
          <div className="relative flex-shrink-0 w-full lg:w-72 group">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-indigo-400 transition-colors pointer-events-none"
            />
            <input
              id="event-search"
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full glass border border-white/5 text-white text-sm placeholder:text-white/30 outline-none focus:border-indigo-500/30 focus:bg-white/5 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            />
          </div>

          {/* Category filters */}
          <div className="flex-1 w-full overflow-x-auto pb-2 lg:pb-0 hide-scrollbar flex justify-center">
             <div className="glass px-2 py-2 rounded-full border border-white/5 inline-flex shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                <EventFilters selected={selectedCategory} onSelect={setSelectedCategory} categories={availableCategories} />
             </div>
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div 
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filtered.map((event) => (
                <motion.div key={event.id} variants={itemVariants} className="h-full">
                  <EventCard event={event} index={0} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center py-24 glass border border-white/5 rounded-3xl"
            >
              <div className="text-4xl mb-4 opacity-50">🔍</div>
              <p className="text-white/60 text-lg font-medium">No events found</p>
              <p className="text-white/30 text-sm mt-2">Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
