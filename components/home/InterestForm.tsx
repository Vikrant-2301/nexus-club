'use client';

import { useState } from 'react';
import { submitInterest } from '@/app/actions/interest';
import toast from 'react-hot-toast';
import { Send, Clock, MapPin, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InterestForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activity: '',
    preferredDate: '',
    preferredTime: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Submitting your interest...', { id: 'interest-submit' });

    const res = await submitInterest(formData);
    
    if (res.success) {
      toast.success('Interest submitted! We will notify you soon.', { id: 'interest-submit' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        activity: '',
        preferredDate: '',
        preferredTime: ''
      });
    } else {
      toast.error(res.error || 'Failed to submit', { id: 'interest-submit' });
    }
    setLoading(false);
  };

  return (
    <section className="py-32 bg-[#070711] relative overflow-hidden border-t border-white/5">
      {/* Ultra-soft ambient glows */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Text Column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-emerald-400 text-[10px] font-semibold uppercase tracking-[0.2em] mb-8">
                <Sparkles size={12} />
                Community Driven
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                Don&apos;t see what you&apos;re looking for?
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-12 font-light max-w-md">
                We constantly organize new activities based on demand. Let us know what you want to do, and we'll make it happen when enough people join.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">You pick the time</p>
                    <p className="text-white/40 text-xs mt-1 leading-relaxed">Whether it's a 6 AM sunrise run or a midnight football game, we accommodate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">You pick the activity</p>
                    <p className="text-white/40 text-xs mt-1 leading-relaxed">Trekking, gaming, art workshops, or just a social mixer at a nice café.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-[32px] glass-strong border border-white/5 relative overflow-hidden shadow-2xl shadow-black/50">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Send size={160} />
              </div>
              
              <div className="relative z-10 space-y-5">
                <h3 className="text-xl font-medium text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>Join the Waitlist</h3>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all rounded-t-lg font-light text-sm"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all rounded-t-lg font-light text-sm"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all rounded-t-lg font-light text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white/80 placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all rounded-t-lg font-light text-sm [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                    />
                    <input
                      type="time"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white/80 placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all rounded-t-lg font-light text-sm [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                    />
                  </div>

                  <input
                    type="text"
                    name="activity"
                    required
                    placeholder="What activity are you interested in?"
                    value={formData.activity}
                    onChange={handleChange}
                    className="w-full bg-white/5 border-b border-white/10 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all rounded-t-lg font-light text-sm"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-white text-black font-semibold py-4 rounded-xl text-sm mt-8 flex justify-center items-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Join Waitlist'} <ArrowRight size={16} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
