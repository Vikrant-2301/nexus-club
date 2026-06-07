'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, MessageCircle, MapPin, ArrowRight, Send, CheckCircle, AlertCircle } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const INQUIRY_TYPES = [
  { value: 'Join Community', label: '🏃 Join the Community' },
  { value: 'Event Partnership', label: '🤝 Event Partnership' },
  { value: 'Sponsorship', label: '💼 Sponsorship' },
  { value: 'Media / Press', label: '📰 Media / Press' },
  { value: 'General Inquiry', label: '💬 General Inquiry' },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'General Inquiry',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFormState('success');
        setForm({ name: '', email: '', type: 'General Inquiry', subject: '', message: '' });
      } else {
        setFormState('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormState('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#060610] overflow-x-hidden relative" style={{ fontFamily: 'var(--font-inter)' }}>

      {/* ── AMBIENT BG ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 70%)', position: 'absolute', inset: 0 }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 right-1/5 w-96 h-96 rounded-full animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent)', filter: 'blur(50px)', animationDelay: '2s' }} />
      </div>

      {/* ── HEADER ── */}
      <section className="relative z-10 pt-32 pb-12 px-6 sm:px-10 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 animate-slide-up">
          <span className="w-6 h-px bg-indigo-400" />
          <span className="text-indigo-400 text-[11px] font-semibold uppercase tracking-[0.22em]">Get in Touch</span>
          <span className="w-6 h-px bg-indigo-400" />
        </div>

        <h1 className="font-syne text-white font-bold mb-4 animate-slide-up delay-100"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
          Let's build something{' '}
          <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c4b5fd 55%, #f0abfc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            together.
          </span>
        </h1>

        <p className="text-white/45 text-base max-w-xl animate-slide-up delay-200 leading-relaxed">
          Whether you want to join a run, partner for an event, or just say hello — drop us a message and we'll get back to you shortly.
        </p>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="relative z-10 pb-24 px-6 sm:px-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── LEFT: INFO SIDEBAR ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* WhatsApp CTA */}
            <div className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: 'linear-gradient(145deg, rgba(34,197,94,0.1) 0%, rgba(21,128,61,0.05) 100%)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)' }} />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.15), transparent)', filter: 'blur(40px)' }} />
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-5 relative z-10"
                style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <MessageCircle size={22} className="text-green-400" />
              </div>
              <h3 className="font-syne text-lg font-bold text-white mb-2 relative z-10">Join the Community</h3>
              <p className="text-white/50 text-sm mb-5 relative z-10 leading-relaxed">
                The fastest way in. 500+ Mumbaikars already there.
              </p>
              <a href="https://chat.whatsapp.com/EQNP8smPKozILPhfw2dXzr" target="_blank" rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(34,197,94,0.35)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <span>Join WhatsApp</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Contact details */}
            <div className="rounded-2xl p-6 space-y-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)' }} />

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <Mail size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:ca.shreyansh@zohomail.in" className="text-white/80 text-sm hover:text-indigo-300 transition-colors">
                    ca.shreyansh@zohomail.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <MapPin size={16} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-white/35 text-xs uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white/80 text-sm">Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-semibold mb-4">Follow Shreyansh</p>
              <div className="space-y-3">
                {[
                  { href: 'https://www.instagram.com/shreyygotnofilterss/', label: 'Instagram', handle: '@shreyygotnofilterss', Icon: InstagramIcon },
                  { href: 'https://www.linkedin.com/in/shreyansh-chaurasia/', label: 'LinkedIn', handle: 'shreyansh-chaurasia', Icon: LinkedinIcon },
                ].map(({ href, label, handle, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 group transition-all duration-200"
                    style={{ textDecoration: 'none' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.2)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.08)'}>
                      <Icon size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs group-hover:text-white/90 transition-colors">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: CONTACT FORM ── */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden relative"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />

              <div className="p-7 sm:p-9">
                <h2 className="font-syne text-xl font-bold text-white mb-1">Send a Message</h2>
                <p className="text-white/40 text-sm mb-7">We'll reply to your email within 24 hours.</p>

                {formState === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
                      <CheckCircle size={32} className="text-indigo-400" />
                    </div>
                    <h3 className="font-syne text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/50 text-sm max-w-xs leading-relaxed mb-7">
                      Thanks for reaching out. Shreyansh will get back to you at your email within 24 hours.
                    </p>
                    <button onClick={() => setFormState('idle')}
                      className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors underline underline-offset-4">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Name *</label>
                        <input
                          type="text" name="name" value={form.name} onChange={handleChange} required
                          placeholder="Your name"
                          className="input-field text-sm"
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Email *</label>
                        <input
                          type="email" name="email" value={form.email} onChange={handleChange} required
                          placeholder="you@example.com"
                          className="input-field text-sm"
                          style={{ borderRadius: '10px' }}
                        />
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">I'm reaching out about</label>
                      <div className="flex flex-wrap gap-2">
                        {INQUIRY_TYPES.map((t) => (
                          <button
                            key={t.value} type="button"
                            onClick={() => setForm(p => ({ ...p, type: t.value }))}
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                            style={{
                              background: form.type === t.value ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)',
                              border: form.type === t.value ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                              color: form.type === t.value ? '#c4b5fd' : 'rgba(255,255,255,0.5)',
                            }}>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Subject</label>
                      <input
                        type="text" name="subject" value={form.subject} onChange={handleChange}
                        placeholder="Brief subject line (optional)"
                        className="input-field text-sm"
                        style={{ borderRadius: '10px' }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">Message *</label>
                      <textarea
                        name="message" value={form.message} onChange={handleChange} required
                        rows={5}
                        placeholder="Tell us what's on your mind..."
                        className="input-field text-sm resize-none"
                        style={{ borderRadius: '10px' }}
                      />
                    </div>

                    {/* Error */}
                    {formState === 'error' && (
                      <div className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-red-300 text-sm">{errorMsg}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit" disabled={formState === 'loading'}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                      style={{
                        background: formState === 'loading' ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white',
                        cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
                        boxShadow: formState === 'loading' ? 'none' : '0 8px 24px rgba(99,102,241,0.25)',
                      }}
                      onMouseEnter={e => { if (formState !== 'loading') (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(99,102,241,0.4)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = formState !== 'loading' ? '0 8px 24px rgba(99,102,241,0.25)' : 'none'; }}>
                      {formState === 'loading' ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <p className="text-white/25 text-xs text-center">
                      Your message goes directly to Shreyansh at ca.shreyansh@zohomail.in
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM LINKS ── */}
      <section className="relative z-10 py-12 px-6 sm:px-10 max-w-4xl mx-auto text-center border-t border-white/5">
        <p className="text-white/25 text-sm mb-4">Not sure yet?</p>
        <div className="flex justify-center gap-6">
          <Link href="/founder-story" className="text-white/40 hover:text-white/70 transition-colors text-sm">
            Founder's Story
          </Link>
          <span className="text-white/15">•</span>
          <Link href="/why-we-exist" className="text-white/40 hover:text-white/70 transition-colors text-sm">
            Why We Exist
          </Link>
          <span className="text-white/15">•</span>
          <Link href="/" className="text-white/40 hover:text-white/70 transition-colors text-sm">
            Browse Events
          </Link>
        </div>
      </section>
    </div>
  );
}
