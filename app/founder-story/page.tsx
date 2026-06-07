'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const TIMELINE = [
  { year: 'Kanpur', label: 'The Beginning', desc: 'Grew up with a love for sports and people. Always the connector in any room.' },
  { year: 'CA Studies', label: 'Head Down', desc: 'Years of articleship, exams, and relentless grind. Career became everything.' },
  { year: 'EY Mumbai', label: 'New City', desc: 'Moved to Mumbai for work. Realized how hard it is to build real friendships as an adult.' },
  { year: '2026', label: 'Beyond Work', desc: 'Started organising runs and sports meetups. People showed up. A community was born.' },
];




export default function FounderStory() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#060610] overflow-x-hidden" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden pt-28 pb-20">
        {/* ambient bg */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div style={{ background: 'radial-gradient(ellipse 60% 50% at 65% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)', position: 'absolute', inset: 0 }} />
          <div className="absolute inset-0 opacity-15"
            style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full animate-glow-pulse"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)', filter: 'blur(60px)' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: text */}
          <div>
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 mb-7">
                <span className="w-6 h-px bg-indigo-400" />
                <span className="text-indigo-400 text-[11px] font-semibold uppercase tracking-[0.22em]">The Person Behind the Mission</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-syne mb-5" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em' }}>
                <span className="text-white">Hi, I'm</span><br />
                <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c4b5fd 55%, #f0abfc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Shreyansh.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium text-white/90"
                  style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)' }}>
                  Founder, Beyond Work
                </span>
                <span className="text-white/35 text-sm">Chartered Accountant · EY · Mumbai</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-white/55 text-base leading-relaxed max-w-sm mb-8">
                Originally from Kanpur, I've spent the last three years building a career in Mumbai — and realising the city needs more than just ambitious professionals. It needs a community.
              </p>
            </Reveal>


          </div>

          {/* Right: portrait */}
          <Reveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden mx-auto lg:mx-0"
              style={{ maxWidth: '380px', aspectRatio: '3/4', boxShadow: '0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.18)' }}>
              <div className="absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to top, rgba(6,6,16,0.88) 0%, rgba(6,6,16,0.15) 45%, transparent 70%)' }} />
              <Image src="/uploads/shreyansh.jpeg" alt="Shreyansh Chaurasia" fill className="object-cover object-top" priority />
              <div className="absolute bottom-5 left-5 z-20">
                <p className="font-syne font-bold text-base text-white">Shreyansh Chaurasia</p>
                <p className="text-white/55 text-xs mt-0.5">Founder, Beyond Work</p>
              </div>
              <div className="absolute top-0 left-0 right-0 h-px z-20"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">

          {/* Sticky sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4 self-start">

            {/* Info card */}
            <div className="rounded-2xl overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-semibold mb-1">About</p>
                  <p className="font-syne text-lg font-bold text-white">Shreyansh Chaurasia</p>
                </div>
                {[
                  { label: 'Profession', value: 'Chartered Accountant' },
                  { label: 'Company', value: 'Ernst & Young (EY)' },
                  { label: 'Based In', value: 'Mumbai, India' },
                  { label: 'Originally', value: 'Kanpur, UP' },
                  { label: 'Interests', value: 'Fitness · Basketball · Content' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-white/35 text-xs">{item.label}</span>
                    <span className="text-white/75 text-xs text-right max-w-[55%]">{item.value}</span>
                  </div>
                ))}
                <div className="flex gap-2.5 pt-1">
                  {[
                    { href: 'https://www.instagram.com/shreyygotnofilterss/', Icon: InstagramIcon, label: 'Instagram' },
                    { href: 'https://www.linkedin.com/in/shreyansh-chaurasia/', Icon: LinkedinIcon, label: 'LinkedIn' },
                    { href: 'https://youtube.com/@cashreyanshtalks', Icon: YoutubeIcon, label: 'YouTube' },
                  ].map(({ href, Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 text-white/40 hover:text-white"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.18)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}>
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Next page link */}
            <Link href="/why-we-exist"
              className="flex items-center justify-between w-full rounded-2xl p-4 group transition-all duration-300"
              style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.13)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.07)')}>
              <span>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest mb-0.5">Read next</p>
                <p className="text-white text-sm font-syne font-semibold">Why We Exist</p>
              </span>
              <ArrowRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Story content */}
          <div className="lg:col-span-8 space-y-0">

            <StoryP index={0}>
              I'm a Chartered Accountant currently working at EY. Originally from Kanpur, I've been calling Mumbai home for the last three years.
            </StoryP>

            <StoryP index={1}>
              Like many ambitious professionals, a large part of my life revolved around studies, articleship, exams, and building a career. The CA journey is intense — you give up a lot of your twenties to it. Social life, hobbies, spontaneous weekends — they all take a back seat.
            </StoryP>

            <StoryP index={2} quote="Finding your tribe as an adult is harder than anyone tells you.">
              But after my CA Finals, I finally had breathing room. I started reconnecting with things I loved — fitness, basketball, content creation, and genuinely meeting new people. And that's when I noticed something.
            </StoryP>

            <StoryP index={3}>
              Mumbai is filled with talented, driven people. But the city moves so fast that meaningful friendships outside the workplace are rare. Everyone's busy. Everyone's hustling. But at the end of the day, a lot of people feel surprisingly alone.
            </StoryP>

            {/* Pull quote card */}
            <div className="py-8">
              <div className="rounded-2xl p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.07) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)' }} />
                <span className="text-indigo-400/30 font-syne text-6xl leading-none absolute top-3 left-6 select-none">"</span>
                <p className="font-syne text-lg font-bold text-white leading-snug relative z-10 mt-3">
                  That's why I started Beyond Work.
                </p>
                <p className="text-white/50 text-sm mt-3 relative z-10 leading-relaxed">
                  Not as a business. As a belief — that your career matters, but it shouldn't be your entire identity.
                </p>
              </div>
            </div>

            <StoryP index={4}>
              Beyond Work is a community built on a simple conviction:{' '}
              <strong className="text-white font-semibold">your career is important, but it shouldn't be your entire identity.</strong>{' '}
              Through runs, sports, social events, and shared experiences, we're creating a space where ambitious people can connect, stay active, and build real relationships.
            </StoryP>

            <StoryP index={5}>
              What started as a few people showing up for a morning run has grown into something I'm genuinely proud of — a growing community of people who show up for each other, not just for work.
            </StoryP>

            {/* Timeline */}
            <div className="py-8">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-semibold mb-6">The Journey</p>
              <div className="relative pl-5 border-l border-white/8 space-y-8">
                {TIMELINE.map((t, i) => (
                  <TimelineItem key={i} {...t} index={i} />
                ))}
              </div>
            </div>

            <StoryP index={6} quote="">
              If any of this resonates with you, I'd love for you to be part of the journey.
            </StoryP>

            <div className="pt-6 pb-4 flex flex-col sm:flex-row gap-3">
              <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2 group">
                <span className="relative z-10 text-sm">Join the Community</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/why-we-exist" className="btn-secondary inline-flex items-center justify-center text-sm">
                Why We Exist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────── */

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(18px)', transition: `all 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

function StoryP({ children, index = 0, quote }: { children: React.ReactNode; index?: number; quote?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="py-6 border-b border-white/5 last:border-0"
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.05}s` }}>
      {quote && (
        <p className="font-syne text-xl font-bold text-indigo-300 leading-snug mb-3" style={{ letterSpacing: '-0.01em' }}>
          {quote}
        </p>
      )}
      <p className="text-white/60 text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}

function TimelineItem({ year, label, desc, index }: { year: string; label: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative"
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-12px)', transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s` }}>
      <div className="absolute -left-[1.35rem] top-1 w-2.5 h-2.5 rounded-full border-2 border-indigo-500 bg-[#060610]" />
      <p className="text-indigo-400 text-[11px] font-semibold uppercase tracking-widest mb-1">{year}</p>
      <p className="text-white text-sm font-semibold font-syne mb-1">{label}</p>
      <p className="text-white/45 text-[13px] leading-relaxed">{desc}</p>
    </div>
  );
}
