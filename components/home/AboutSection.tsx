'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="orb w-96 h-96 bg-indigo-500/20 -top-20 right-0"
        style={{ filter: 'blur(100px)' }}
      />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Main Large Card */}
          <motion.div variants={itemVariants} className="md:col-span-8 glass-strong rounded-[32px] p-10 sm:p-14 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700" />
            <div className="relative z-10">
              <span className="block text-[11px] font-semibold text-indigo-400 uppercase tracking-[0.2em] mb-6">
                About Nexus Club
              </span>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Built for people who{' '}
                <span className="text-white/40 italic">actually</span> show up.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-xl font-light">
                Nexus Club started with a simple idea: Mumbai has millions of people, but finding your tribe is inexplicably hard. We organize high-quality events that make connection effortless.
              </p>
            </div>
          </motion.div>

          {/* Side Card 1 */}
          <motion.div variants={itemVariants} className="md:col-span-4 glass border border-white/5 rounded-[32px] p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="text-4xl mb-6 bg-gradient-to-br from-indigo-400 to-violet-400 text-transparent bg-clip-text">⚡</div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>Instant Booking</h3>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              A seamless 4-step registration process that takes under 2 minutes. Secure, fast, and verified.
            </p>
          </motion.div>

          {/* Bottom Card 1 */}
          <motion.div variants={itemVariants} className="md:col-span-4 glass border border-white/5 rounded-[32px] p-8 sm:p-10 relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="text-4xl mb-6 text-white/80">📍</div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>Premium Venues</h3>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              From rooftop turfs to elite social lounges, we partner only with the best locations in Mumbai.
            </p>
          </motion.div>

          {/* Bottom Card 2 */}
          <motion.div variants={itemVariants} className="md:col-span-8 glass border border-white/5 rounded-[32px] p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="max-w-sm">
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>Community First</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light mb-6">
                Solo, duo, or squad — everyone is welcome. Our events are designed to break the ice and foster real connections.
              </p>
              <div className="flex flex-wrap gap-2">
                {['No BS', 'Real People', 'Great Vibes'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-medium tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-white/10 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
               <span className="text-3xl relative z-10">👥</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
