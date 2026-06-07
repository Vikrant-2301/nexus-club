import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export const metadata = {
  title: 'Founder Story | BEYOND WORK',
  description: 'The story behind Beyond Work. Meet Shreyansh Chaurasia and discover why we started this community.',
};

export default function FounderStory() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-[#070711]">
      {/* Background decorations */}
      <div className="orb w-[500px] h-[500px] bg-indigo-500/10 top-0 left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-purple-500/10 bottom-0 right-[-100px]" />
      <div className="absolute inset-0 noise opacity-20 mix-blend-overlay z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="animate-fade-in text-center mb-16">
          <h1 className="font-syne text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="gradient-text-indigo">Founder's Story</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="glass-strong rounded-[32px] p-8 md:p-12 animate-slide-up delay-200 border border-white/10 relative overflow-hidden shadow-2xl shadow-indigo-500/10">
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Image Column */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 glow-indigo group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <Image
                  src="/uploads/shreyansh.jpeg"
                  alt="Shreyansh Chaurasia"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="font-syne font-bold text-xl text-white">Shreyansh Chaurasia</p>
                  <p className="text-white/70 text-sm">Founder, Beyond Work</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white group">
                  <InstagramIcon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white group">
                  <LinkedinIcon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 glass rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white group">
                  <TwitterIcon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-7 space-y-6 text-lg text-white/80 leading-relaxed font-inter">
              <h2 className="text-3xl font-syne font-bold text-white mb-2 tracking-tight">Hi, I'm Shreyansh.</h2>
              
              <p>
                I'm a Chartered Accountant currently working at EY. Originally from Kanpur, I've been calling Mumbai home for the last three years.
              </p>
              
              <p>
                Like many ambitious professionals, a large part of my life revolved around studies, articleship, exams, and building a career. But after my CA Final journey, I started reconnecting with the things I loved outside work—fitness, basketball, content creation, and meeting new people.
              </p>
              
              <p>
                What stood out to me was how difficult it can be to find your tribe as an adult. Mumbai is filled with talented, driven people, yet many of us struggle to build meaningful friendships and communities beyond our workplaces.
              </p>
              
              <div className="p-6 my-8 rounded-2xl bg-indigo-500/10 border-l-4 border-indigo-500 font-syne text-xl text-white italic relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-50" />
                <span className="relative z-10">That's why I started Beyond Work.</span>
              </div>
              
              <p>
                Beyond Work is a community built on a simple belief: <strong className="text-white font-semibold">your career is important, but it shouldn't be your entire identity.</strong>
              </p>
              
              <p>
                Through runs, sports, social events, and shared experiences, we're creating a space where ambitious people can connect, stay active, and build meaningful relationships.
              </p>
              
              <p className="font-medium text-white/90 mt-8">
                If that resonates with you, I'd love for you to be part of the journey.
              </p>

              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2 group">
                  <span className="relative z-10">Join the Community</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/why-we-exist" className="btn-secondary inline-flex items-center justify-center">
                  Why We Exist
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
