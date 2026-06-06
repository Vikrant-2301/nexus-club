'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Users, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Users, label: 'Real People, Real Connections' },
  { icon: MapPin, label: 'Premium Curated Venues' },
  { icon: ShieldCheck, label: 'Invite-Only Verification' },
  { icon: Star, label: 'Unforgettable Experiences' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Softer Volumetric Lighting */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="orb w-[800px] h-[800px] bg-indigo-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ filter: 'blur(120px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="orb w-[600px] h-[600px] bg-violet-600/10 bottom-0 left-1/4"
        style={{ filter: 'blur(100px)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass border border-indigo-500/20 text-indigo-300 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
          Mumbai's Premium Social Club
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Find Your <span className="gradient-text">Tribe.</span>
          <br className="hidden sm:block" />
          <span className="text-white/90"> Join The Game.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed mb-12 font-light"
        >
          Sports events, social mixers, yoga sessions, and more — all crafted to connect you with
          people who actually show up.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
        >
          <Link
            href="#events"
            id="hero-browse-btn"
            className="btn-primary w-full sm:w-auto inline-flex justify-center items-center gap-2.5 text-base px-8 py-4 group"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Browse Events <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/#about"
            id="hero-learn-btn"
            className="btn-secondary w-full sm:w-auto inline-flex justify-center items-center gap-2 text-base px-8 py-4"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Minimal Features Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden md:flex items-center justify-center gap-8 mt-24 glass-strong px-10 py-4 rounded-full border border-white/5"
        >
          {features.map(({ icon: Icon, label }, idx) => (
            <div key={label} className="flex items-center gap-2 text-white/40">
              <Icon size={14} className="text-indigo-400" />
              <span className="text-[13px] font-medium tracking-wide">{label}</span>
              {idx < features.length - 1 && <div className="w-1 h-1 rounded-full bg-white/10 ml-8" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 animate-bounce-slow"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
