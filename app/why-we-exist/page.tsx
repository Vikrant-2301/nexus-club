'use client';

import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/* ─── Data ─────────────────────────────────────────── */
const PROBLEMS = [
  {
    num: '01',
    headline: 'Isolation in plain sight',
    body: "You're surrounded by millions, yet meaningful friendships are rare. Work relationships stay professional. Weekends feel hollow.",
    detail: 'Most people in Mumbai know hundreds of people — and feel genuinely close to none of them outside their immediate family or college friends.',
  },
  {
    num: '02',
    headline: 'Identity = job title',
    body: "Ambition is great—until your career becomes your only personality. There's more to you than what you do from 9 to 9.",
    detail: 'When the first thing anyone asks at a party is "what do you do?", something is wrong. Life should be richer than your designation.',
  },
  {
    num: '03',
    headline: 'No third place',
    body: "Home, office. Office, home. Mumbai never offered a real third space where driven people could simply be human together.",
    detail: "There are co-working spaces and bars, but rarely a community built around shared energy and intention — a place where you belong.",
  },
];

const PILLARS = [
  { icon: '🏃', title: 'Move Together', desc: 'Morning runs, basketball, football, yoga. Physical activity is our excuse to show up — and stick around.', detail: 'Exercise is the easiest way to build trust. When you sweat alongside someone, small talk disappears fast.' },
  { icon: '🤝', title: 'Meet With Intent', desc: 'Curated social events that skip the awkward intros and go straight to real conversation.', detail: "Our events are designed for connection — not networking. There's a difference, and you'll feel it." },
  { icon: '✨', title: 'Build Memories', desc: "Shared experiences become the stories you tell for years. That's what bonds people.", detail: 'From city hikes to after-run brunches to sports tournaments — every BW event is a memory in the making.' },
];

const PRINCIPLES = [
  { label: 'Show up', desc: "The hardest part of any event is deciding to go. Once you're there, it takes care of itself." },
  { label: 'Be yourself', desc: "No role-playing, no networking masks. Just you — the actual human being behind the job title." },
  { label: 'Stay consistent', desc: 'Community is built over multiple touchpoints. The regulars become friends. The friends become your tribe.' },
  { label: 'Add value', desc: "Every person brings something. An idea, energy, a skill, a laugh. We're richer because of every member." },
];

const STATS = [
  { num: '500+', label: 'Community members' },
  { num: '30+', label: 'Events organised' },
  { num: '3', label: 'Sports & activity types' },
  { num: '1', label: 'City, so far' },
];

/* ─── Page ─────────────────────────────────────────── */

export default function WhyWeExist() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <div className="min-h-screen bg-[#060610] overflow-x-hidden" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 70%)', position: 'absolute', inset: 0 }} />
          <div className="absolute inset-0 opacity-15"
            style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full animate-glow-pulse"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)', filter: 'blur(55px)' }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full animate-glow-pulse"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent)', filter: 'blur(45px)', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10">
          <div
            className="inline-flex items-center gap-2 mb-7"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}
          >
            <span className="w-6 h-px bg-indigo-400" />
            <span className="text-indigo-400 text-[11px] font-semibold uppercase tracking-[0.22em]">Our Mission</span>
          </div>

          <h1
            className="font-syne mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s' }}
          >
            <span className="text-white">Why We </span>
            <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c4b5fd 55%, #f0abfc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Exist.
            </span>
          </h1>

          <p
            className="text-white/50 text-base leading-relaxed max-w-lg"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.85s cubic-bezier(0.16,1,0.3,1) 0.16s' }}
          >
            Mumbai is full of driven, talented, ambitious people. And many of them feel surprisingly alone. Beyond Work was built to change that — one event, one run, one handshake at a time.
          </p>


        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <SectionLabel>The Problem</SectionLabel>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Big statement card */}
          <div className="lg:row-span-2 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, rgba(99,102,241,0.11) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(99,102,241,0.18)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)' }} />
            <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)', filter: 'blur(40px)' }} />

            <p className="font-syne font-bold text-white relative z-10 leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em' }}>
              Mumbai is full of{' '}
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                ambitious
              </span>{' '}
              people.
            </p>

            <div className="relative z-10 mt-8 space-y-2.5">
              {['People building careers.', 'People chasing goals.', 'People working hard.', 'People who have forgotten how to simply live.'].map((line, i) => (
                <RevealLine key={i} delay={i * 0.08}>{line}</RevealLine>
              ))}
            </div>
          </div>

          {/* Problem cards */}
          {PROBLEMS.map((p, i) => (
            <ProblemCard key={i} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* ── THE GAP ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-8">
        <RevealBlock>
          <div className="rounded-2xl overflow-hidden relative"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
            <div className="px-8 md:px-12 py-10 text-center">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-semibold mb-4">The Gap</p>
              <p className="font-syne font-bold text-white leading-tight max-w-2xl mx-auto"
                style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2rem)', letterSpacing: '-0.02em' }}>
                Yet many struggle to find genuine friendships, fitness partners, and communities{' '}
                <span className="text-white/35">outside work</span>.
              </p>
              <p className="text-white/40 text-sm mt-5 max-w-xl mx-auto leading-relaxed">
                Office friendships are transactional. College friends are scattered. Dating apps aren't for making friends. And joining a random gym class doesn't mean you'll connect with anyone there.
              </p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── OUR ANSWER ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <SectionLabel>Our Answer</SectionLabel>

        <RevealBlock className="mt-10">
          <div className="rounded-2xl p-8 md:p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(236,72,153,0.04) 100%)', border: '1px solid rgba(99,102,241,0.22)' }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)' }} />
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1), transparent)', filter: 'blur(50px)' }} />
            <p className="font-syne font-bold text-white leading-tight relative z-10"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.025em' }}>
              Beyond Work exists to help people{' '}
              <span style={{ background: 'linear-gradient(135deg, #818cf8, #c4b5fd, #f0abfc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                find their tribe.
              </span>
            </p>
            <p className="text-white/45 text-sm mt-4 relative z-10 max-w-md leading-relaxed">
              Through shared physical experiences, intentional social events, and a culture that values the whole person — not just the professional.
            </p>
          </div>
        </RevealBlock>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {PILLARS.map((p, i) => (
            <PillarCard key={i} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <SectionLabel>How We Do It</SectionLabel>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRINCIPLES.map((p, i) => (
            <RevealBlock key={i} className="">
              <div className="rounded-2xl p-6 h-full"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  </div>
                  <div>
                    <p className="font-syne text-sm font-bold text-white mb-1.5">{p.label}</p>
                    <p className="text-white/45 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20 text-center">
        <RevealBlock>
          <p className="font-syne font-bold text-white mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            Ready to find your people?
          </p>
          <p className="text-white/40 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
            Join a growing community of ambitious Mumbaikars who refuse to settle for a career-only life.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2 group text-sm px-7 py-3.5">
              <Users size={16} className="relative z-10" />
              <span className="relative z-10">Find Your Tribe</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/founder-story" className="btn-secondary inline-flex items-center justify-center text-sm px-7 py-3.5">
              Read Founder's Story
            </Link>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-px bg-white/15" />
      <span className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.22em]">{children}</span>
    </div>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex items-center gap-2.5"
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-12px)', transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay + 0.15}s` }}>
      <div className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
      <span className="text-white/60 text-sm">{children}</span>
    </div>
  );
}

function RevealBlock({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)' }}>
      {children}
    </div>
  );
}

function ProblemCard({ num, headline, body, detail, index }: { num: string; headline: string; body: string; detail: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="rounded-2xl p-6 relative overflow-hidden cursor-default"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(18px)', transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.08 + index * 0.07}s` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(99,102,241,0.22)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(99,102,241,0.05)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)'; }}>
      <span className="font-syne text-4xl font-bold text-white/5 select-none absolute top-4 right-5">{num}</span>
      <p className="font-syne text-base font-bold text-white mb-2 relative z-10">{headline}</p>
      <p className="text-white/50 text-[13px] leading-relaxed mb-3 relative z-10">{body}</p>
      <p className="text-white/30 text-[12px] leading-relaxed relative z-10 pt-3 border-t border-white/5">{detail}</p>
    </div>
  );
}

function PillarCard({ icon, title, desc, detail, index }: { icon: string; title: string; desc: string; detail: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="rounded-2xl p-6 cursor-default"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(18px)', transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.08 + index * 0.08}s` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(99,102,241,0.25)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(99,102,241,0.06)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)'; }}>
      <div className="text-3xl mb-4">{icon}</div>
      <p className="font-syne text-base font-bold text-white mb-2">{title}</p>
      <p className="text-white/50 text-[13px] leading-relaxed mb-3">{desc}</p>
      <p className="text-white/30 text-[12px] leading-relaxed pt-3 border-t border-white/5">{detail}</p>
    </div>
  );
}
