import Link from 'next/link';
import { ArrowRight, Users, Target, Zap } from 'lucide-react';

export const metadata = {
  title: 'Why We Exist | BEYOND WORK',
  description: 'The core mission of Beyond Work. Helping ambitious people find their tribe.',
};

export default function WhyWeExist() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-[#070711]">
      {/* Background decorations */}
      <div className="orb w-[600px] h-[600px] bg-indigo-600/10 top-[-100px] left-1/2 -translate-x-1/2" />
      <div className="orb w-[500px] h-[500px] bg-orange-500/5 bottom-[-100px] right-0" />
      <div className="absolute inset-0 grid-pattern opacity-30 z-0" />
      <div className="absolute inset-0 noise opacity-20 mix-blend-overlay z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6 text-sm font-medium text-indigo-300">
            <Zap size={16} className="text-orange-400" />
            <span>Our Mission</span>
          </div>
          <h1 className="font-syne text-5xl md:text-7xl font-bold mb-6 tracking-tight text-glow">
            Why We <span className="gradient-text-indigo">Exist</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="w-full max-w-3xl glass-strong rounded-[40px] p-10 md:p-16 animate-slide-up delay-200 border border-white/10 relative overflow-hidden shadow-2xl shadow-indigo-500/10">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="space-y-10 text-center relative z-10">
            
            <h2 className="text-2xl md:text-4xl font-syne font-bold text-white leading-tight">
              Mumbai is full of <span className="text-indigo-400">ambitious</span> people.
            </h2>

            <div className="space-y-6 text-xl md:text-2xl font-inter font-light text-white/80">
              <p className="animate-fade-in delay-300">People building careers.</p>
              <p className="animate-fade-in delay-400">People chasing goals.</p>
              <p className="animate-fade-in delay-500">People working hard.</p>
            </div>

            <div className="py-8 my-8 border-y border-white/10 relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#0a0a18] px-4">
                <Target size={24} className="text-indigo-500 opacity-50" />
              </div>
              <p className="text-xl md:text-2xl font-syne font-semibold text-white/90 leading-relaxed max-w-2xl mx-auto">
                Yet many of them struggle to find genuine friendships, fitness partners, and communities outside work.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="text-2xl md:text-3xl font-syne font-bold text-white mb-4 relative z-10">
                Beyond Work exists to help people find their tribe.
              </h3>
              
              <p className="text-lg text-indigo-200/80 relative z-10 max-w-xl mx-auto">
                Through experiences, sports, and meaningful connections.
              </p>
            </div>

          </div>
        </div>

        <div className="mt-16 animate-slide-up delay-700 flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2 group px-8 py-4 text-lg">
            <Users size={20} className="relative z-10" />
            <span className="relative z-10">Find Your Tribe</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/founder-story" className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg">
            Read Founder's Story
          </Link>
        </div>

      </div>
    </div>
  );
}
