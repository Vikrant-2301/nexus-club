'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight, Clock, Flame } from 'lucide-react';
import { Event } from '@/lib/types';
import {
  formatCurrency,
  getSpotsColor,
  getSpotsLabel,
  getCategoryEmoji,
  getCategoryGradient,
} from '@/lib/utils';

interface EventCardProps {
  event: Event;
  index?: number;
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const [hovered, setHovered] = useState(false);
  const nextDate = event.dates.find((d) => d.spotsLeft > 0) || event.dates[0];
  const totalSpotsLeft = event.dates.reduce((sum, d) => sum + d.spotsLeft, 0);
  const isSoldOut = totalSpotsLeft <= 0;
  const isHot = totalSpotsLeft <= 8 && !isSoldOut;
  const lowestPrice = Math.min(event.pricing.solo, event.pricing.duo, event.pricing.group3, event.pricing.group4plus);
  const earlyBirdPrice = event.earlyBird?.active
    ? Math.min(event.earlyBird.pricing.solo, event.earlyBird.pricing.duo, event.earlyBird.pricing.group3, event.earlyBird.pricing.group4plus)
    : null;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`relative rounded-2xl overflow-hidden glass border transition-all duration-500 ${
          hovered
            ? 'border-indigo-500/40 shadow-2xl shadow-indigo-900/30 -translate-y-2'
            : 'border-white/6'
        }`}
      >
        {/* Cover image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              hovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#070711] via-[#070711]/30 to-transparent transition-opacity duration-300`}
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass-strong border border-white/15 text-white">
              {getCategoryEmoji(event.category)} {event.category}
            </span>
          </div>

          {/* Spots badge */}
          <div className="absolute top-3 right-3">
            {isSoldOut ? (
              <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-red-500/20 border border-red-500/40 text-red-400">
                Sold Out
              </span>
            ) : isHot ? (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500/20 border border-orange-500/40 text-orange-400">
                <Flame size={11} /> Filling Fast
              </span>
            ) : (
              <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-black/40 border border-white/15 ${getSpotsColor(totalSpotsLeft, event.dates.reduce((s, d) => s + d.spotsTotal, 0))}`}>
                {getSpotsLabel(totalSpotsLeft)}
              </span>
            )}
          </div>

          {/* Early bird tag */}
          {event.earlyBird?.active && !isSoldOut && (
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
                ⚡ Early Bird Active
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 bg-gradient-to-b ${getCategoryGradient(event.category)}`}>
          {/* Title */}
          <h3
            className="font-bold text-xl text-white mb-1.5 leading-tight group-hover:text-indigo-300 transition-colors"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {event.title}
          </h3>
          <p className="text-white/50 text-sm mb-4 leading-relaxed line-clamp-2">{event.tagline}</p>

          {/* Meta grid */}
          <div className="space-y-2 mb-5">
            {nextDate && (
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Calendar size={13} className="text-indigo-400 flex-shrink-0" />
                <span>{nextDate.label}</span>
              </div>
            )}
            {nextDate && (
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Clock size={13} className="text-indigo-400 flex-shrink-0" />
                <span>{nextDate.time}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-white/60">
              <MapPin size={13} className="text-indigo-400 flex-shrink-0" />
              <span className="truncate">{event.mapLocation.address.split(',').slice(0, 2).join(',')}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-md bg-white/5 border border-white/8 text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/8">
            <div>
              {earlyBirdPrice ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-indigo-400 font-bold text-lg">
                    {formatCurrency(earlyBirdPrice)}
                  </span>
                  <span className="text-white/30 text-sm line-through">{formatCurrency(lowestPrice)}</span>
                  <span className="text-white/40 text-xs">/person</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-white font-bold text-lg">{formatCurrency(lowestPrice)}</span>
                  <span className="text-white/40 text-xs">/person</span>
                </div>
              )}
            </div>
            <div
              className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${
                isSoldOut
                  ? 'text-white/25'
                  : 'text-indigo-400 group-hover:text-indigo-300 group-hover:gap-2.5'
              }`}
            >
              {isSoldOut ? 'Unavailable' : 'Join Now'}
              {!isSoldOut && <ArrowRight size={15} />}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
