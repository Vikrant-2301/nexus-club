'use client';

import { useState } from 'react';
import { submitInterest } from '@/app/actions/interest';
import toast from 'react-hot-toast';
import { Send, Clock, MapPin, Calendar } from 'lucide-react';

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
    <section className="py-20 bg-gradient-to-b from-[#070711] to-[#0A0A16] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="glass border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Send size={120} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                Don&apos;t see your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                  favorite event?
                </span>
              </h2>
              <p className="text-white/60 mb-8">
                Join our waitlist and tell us what you&apos;re looking for. We constantly organize new and exciting activities based on community demand!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/50 text-sm">
                  <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-indigo-400">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Any Date</p>
                    <p className="text-xs">You tell us when</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white/50 text-sm">
                  <div className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-emerald-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Any Activity</p>
                    <p className="text-xs">From treks to gaming</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field w-full"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="input-field w-full text-white/80"
                  />
                  <input
                    type="time"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="input-field w-full text-white/80"
                  />
                </div>

                <input
                  type="text"
                  name="activity"
                  required
                  placeholder="What activity are you interested in?"
                  value={formData.activity}
                  onChange={handleChange}
                  className="input-field w-full"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 rounded-xl text-sm mt-4 flex justify-center items-center gap-2 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? 'Submitting...' : 'Join Waitlist'} <Send size={16} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
