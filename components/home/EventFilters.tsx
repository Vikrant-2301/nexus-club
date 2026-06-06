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
  categories?: string[];
}

export default function EventFilters({ selected, onSelect, categories }: EventFiltersProps) {
  const displayCategories = categories || CATEGORIES;

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
      {displayCategories.map((cat) => (
        <button
          key={cat}
          id={`filter-${cat.toLowerCase()}`}
          onClick={() => onSelect(cat)}
          className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
            selected === cat
              ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
              : 'text-white/40 hover:text-white/80 hover:bg-white/5'
          }`}
        >
          {cat !== 'All' && <span>{getCategoryEmoji(cat)}</span>}
          {cat}
        </button>
      ))}
    </div>
  );
}
