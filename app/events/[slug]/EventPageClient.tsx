'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  Share2,
  CheckCircle,
  AlertCircle,
  Flame,
  Shield,
  Star,
  Package,
} from 'lucide-react';
import { Event } from '@/lib/types';
import { formatCurrency, getSpotsColor, getSpotsBarColor, getSpotsLabel, getCategoryEmoji } from '@/lib/utils';
import toast from 'react-hot-toast';

// Dynamic import for map (SSR incompatible)
const EventMap = dynamic(() => import('@/components/event/EventMap'), { ssr: false });

interface Props {
  event: Event;
}

export default function EventPageClient({ event }: Props) {
  const [activeTab, setActiveTab] = useState<'about' | 'schedule' | 'bring' | 'rules'>('about');
  const totalLeft = event.dates.reduce((s, d) => s + d.spotsLeft, 0);
  const totalCapacity = event.dates.reduce((s, d) => s + d.spotsTotal, 0);
  const barPct = Math.round((totalLeft / totalCapacity) * 100);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: event.title, text: event.tagline, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied!');
    }
  };

  const lowestPrice = Math.min(event.pricing.solo, event.pricing.duo, event.pricing.group3, event.pricing.group4plus);
  const earlyBirdPrice = event.earlyBird?.active
    ? Math.min(event.earlyBird.pricing.solo, event.earlyBird.pricing.duo, event.earlyBird.pricing.group3, event.earlyBird.pricing.group4plus)
    : null;

  return (
    <div className="min-h-screen bg-[#070711]">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070711] via-[#070711]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070711]/80 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Events</Link>
            <ChevronRight size={12} />
            <span className="text-white/60">{event.title}</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold glass-strong border border-white/15 text-white">
                {getCategoryEmoji(event.category)} {event.category}
              </span>
              {event.difficulty && (
                <span className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold glass border border-white/10 text-white/70">
                  {event.difficulty}
                </span>
              )}
              {event.earlyBird?.active && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-600/30 border border-indigo-500/40 text-indigo-300">
                  ⚡ Early Bird Active
                </span>
              )}
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-3"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {event.title}
            </h1>
            <p className="text-white/65 text-lg max-w-2xl">{event.tagline}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Calendar, label: 'Next Date', value: event.dates.find(d => d.spotsLeft > 0)?.label || event.dates[0].label },
                { icon: Clock, label: 'Time', value: event.dates[0].time },
                { icon: MapPin, label: 'Venue', value: event.mapLocation.address.split(',')[0] },
                { icon: Users, label: 'Spots Left', value: getSpotsLabel(totalLeft) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass border border-white/8 rounded-xl p-4">
                  <Icon size={14} className="text-indigo-400 mb-2" />
                  <p className="text-white/40 text-xs mb-0.5">{label}</p>
                  <p className="text-white text-sm font-semibold truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* Spots bar */}
            <div className="glass border border-white/8 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Spot Availability</span>
                <span className={`text-sm font-semibold ${getSpotsColor(totalLeft, totalCapacity)}`}>
                  {totalLeft} / {totalCapacity} spots
                </span>
              </div>
              <div className="w-full h-2 bg-white/8 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${getSpotsBarColor(totalLeft, totalCapacity)}`}
                  style={{ width: `${barPct}%` }}
                />
              </div>
              {totalLeft <= 8 && totalLeft > 0 && (
                <div className="flex items-center gap-1.5 mt-3 text-orange-400 text-xs">
                  <Flame size={13} />
                  <span>Filling fast — only {totalLeft} spots left across all dates</span>
                </div>
              )}
            </div>

            {/* Highlights */}
            <div className="glass border border-white/8 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                What's Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content tabs */}
            <div className="glass border border-white/8 rounded-2xl overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-white/8">
                {(['about', 'schedule', 'bring', 'rules'] as const).map((tab) => (
                  <button
                    key={tab}
                    id={`tab-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-indigo-600/20 text-indigo-300 border-b-2 border-indigo-500'
                        : 'text-white/40 hover:text-white/60 hover:bg-white/3'
                    }`}
                  >
                    {tab === 'bring' ? 'What to Bring' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div className="text-white/65 text-sm leading-relaxed whitespace-pre-line">
                    {event.description}
                  </div>
                )}
                {activeTab === 'schedule' && (
                  <div className="space-y-3">
                    {event.schedule.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-20 text-indigo-400 text-xs font-mono font-semibold pt-0.5">
                          {item.time}
                        </div>
                        <div className="flex-1 flex gap-3 items-start">
                          <div className="w-px h-full bg-white/10 flex-shrink-0 mt-1.5" />
                          <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                          <p className="text-white/70 text-sm">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'bring' && (
                  <div className="space-y-3">
                    {event.whatToBring.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Package size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'rules' && (
                  <div className="space-y-3">
                    {event.rules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Shield size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{rule}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="glass border border-white/8 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/8 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                    Venue Location
                  </h2>
                  <p className="text-white/45 text-xs mt-0.5">{event.mapLocation.address}</p>
                  {event.mapLocation.landmark && (
                    <p className="text-indigo-400 text-xs mt-0.5">{event.mapLocation.landmark}</p>
                  )}
                </div>
                <a
                  href={`https://maps.google.com/?q=${event.mapLocation.lat},${event.mapLocation.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  Open in Maps <ChevronRight size={12} />
                </a>
              </div>
              <EventMap lat={event.mapLocation.lat} lng={event.mapLocation.lng} address={event.mapLocation.address} />
            </div>

            {/* Organizer */}
            <div className="glass border border-white/8 rounded-2xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={event.organizer.avatar}
                alt={event.organizer.name}
                className="w-16 h-16 sm:w-12 sm:h-12 rounded-full bg-indigo-900 object-cover"
              />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white font-semibold text-sm">{event.organizer.name}</p>
                <p className="text-white/45 text-xs mt-0.5">{event.organizer.role}</p>
                
                {/* Social Links */}
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                  {event.organizer.linkedin && (
                    <a href={event.organizer.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-indigo-400 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                  )}
                  {event.organizer.instagram && (
                    <a href={event.organizer.instagram} target="_blank" rel="noreferrer" className="text-white/40 hover:text-pink-400 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                  )}
                  {event.organizer.email && (
                    <a href={`mailto:${event.organizer.email}`} className="text-white/40 hover:text-white transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="text-center sm:text-right mt-3 sm:mt-0">
                <div className="flex items-center justify-center sm:justify-end gap-1 text-amber-400">
                  <Star size={13} className="fill-amber-400" />
                  <span className="text-xs font-semibold text-white">4.9</span>
                </div>
                <p className="text-white/35 text-xs mt-0.5">{event.organizer.events} events hosted</p>
              </div>
            </div>
          </div>

          {/* Right: sticky booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Booking card */}
              <div className="glass-strong border border-white/12 rounded-2xl p-6">
                {/* Price */}
                <div className="mb-5">
                  {earlyBirdPrice ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl font-bold text-indigo-400" style={{ fontFamily: 'var(--font-syne)' }}>
                          {formatCurrency(earlyBirdPrice)}
                        </span>
                        <span className="text-white/35 text-lg line-through">{formatCurrency(lowestPrice)}</span>
                      </div>
                      <p className="text-white/40 text-xs">per person · Early bird pricing active</p>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                        {formatCurrency(lowestPrice)}
                      </span>
                      <p className="text-white/40 text-xs mt-0.5">per person · varies by group size</p>
                    </>
                  )}
                </div>

                {/* Dates */}
                <div className="space-y-2.5 mb-5">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Available Dates</p>
                  {event.dates.map((d) => (
                    <div
                      key={d.id}
                      className={`rounded-xl p-3 border text-sm ${
                        d.spotsLeft <= 0
                          ? 'border-dashed border-white/10 opacity-40'
                          : 'border-white/8 bg-white/3'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white text-xs">{d.label}</p>
                          <p className="text-white/40 text-xs mt-0.5">{d.time}</p>
                        </div>
                        <span className={`text-xs font-semibold ${getSpotsColor(d.spotsLeft, d.spotsTotal)}`}>
                          {d.spotsLeft <= 0 ? 'Sold out' : `${d.spotsLeft} left`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Group pricing breakdown */}
                <div className="bg-white/3 rounded-xl p-3 mb-5 space-y-1.5">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Pricing</p>
                  {[
                    { label: 'Solo', price: earlyBirdPrice || event.pricing.solo },
                    { label: 'Duo (2)', price: event.earlyBird?.active ? event.earlyBird.pricing.duo : event.pricing.duo },
                    { label: 'Group of 3', price: event.earlyBird?.active ? event.earlyBird.pricing.group3 : event.pricing.group3 },
                    { label: 'Group of 4+', price: event.earlyBird?.active ? event.earlyBird.pricing.group4plus : event.pricing.group4plus },
                  ].map(({ label, price }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-white/50">{label}</span>
                      <span className="text-white font-semibold">{formatCurrency(price)}/person</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {totalLeft > 0 ? (
                  <Link
                    href={`/events/${event.slug}/register`}
                    id="book-now-btn"
                    className="btn-primary w-full block text-center text-base py-4 rounded-xl"
                  >
                    <span className="relative z-10">Book My Spot →</span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white/30 text-base font-semibold cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                )}

                <div className="flex items-center gap-2 mt-4 justify-center">
                  <Shield size={13} className="text-emerald-400" />
                  <p className="text-white/35 text-xs">Secure UPI payment · Verified organizer</p>
                </div>
              </div>

              {/* Share */}
              <button
                id="share-btn"
                onClick={handleShare}
                className="btn-secondary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm"
              >
                <Share2 size={15} /> Share Event
              </button>

              {/* Min age */}
              {event.minAge && (
                <div className="flex items-center gap-2 px-4 py-3 glass rounded-xl border border-amber-500/20">
                  <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
                  <p className="text-white/50 text-xs">Minimum age: {event.minAge}+ years</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
