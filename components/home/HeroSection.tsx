'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Users, Star, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '2,400+', label: 'Members' },
  { icon: Star, value: '4.9', label: 'Avg Rating' },
  { icon: TrendingUp, value: '120+', label: 'Events Hosted' },
  { icon: Zap, value: '48hrs', label: 'Until Next Event' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-40" />

      {/* Glowing orbs */}
      <div className="orb w-[600px] h-[600px] bg-indigo-600/15 -top-32 -left-32 animate-glow-pulse" />
      <div
        className="orb w-[500px] h-[500px] bg-violet-600/10 top-1/2 -right-48 animate-glow-pulse"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="orb w-[400px] h-[400px] bg-orange-600/8 bottom-0 left-1/3 animate-glow-pulse"
        style={{ animationDelay: '4s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8 animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Mumbai's Fastest Growing Club
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6 animate-slide-up delay-100"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            <span className="block text-white">Find Your</span>
            <span className="block gradient-text">Tribe.</span>
            <span className="block text-white/80">Join The Game.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-white/55 max-w-xl leading-relaxed mb-10 animate-slide-up delay-200">
            Sports events, social mixers, yoga sessions, and more — all crafted to connect you with
            people who actually show up.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 animate-slide-up delay-300">
            <Link
              href="#events"
              id="hero-browse-btn"
              className="btn-primary inline-flex items-center gap-2.5 text-base px-7 py-4 rounded-2xl"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Browse Events <ArrowRight size={18} />
              </span>
            </Link>
            <Link
              href="/#about"
              id="hero-learn-btn"
              className="btn-secondary inline-flex items-center gap-2 text-base px-7 py-4 rounded-2xl"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-slide-up delay-400">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass border border-white/8 rounded-2xl p-4 text-center"
              >
                <Icon size={18} className="text-indigo-400 mx-auto mb-2" />
                <div
                  className="text-2xl font-bold text-white mb-0.5"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {value}
                </div>
                <div className="text-xs text-white/40 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 animate-bounce-slow">
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
