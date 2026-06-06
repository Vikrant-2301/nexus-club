'use client';

import { getCategoryEmoji } from '@/lib/utils';

const CATEGORIES = [
  'All',
  'Football',
  'Running',
  'Yoga',
  'Basketball',
  'Social',
  'Cricket',
  'Music',
  'Workshop',
];

interface EventFiltersProps {
  selected: string;
  onSelect: (cat: string) => void;
}

export default function EventFilters({ selected, onSelect }: EventFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          id={`filter-${cat.toLowerCase()}`}
          onClick={() => onSelect(cat)}
          className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
            selected === cat
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40'
              : 'glass border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5'
          }`}
        >
          {cat !== 'All' && <span>{getCategoryEmoji(cat)}</span>}
          {cat}
        </button>
      ))}
    </div>
  );
}
