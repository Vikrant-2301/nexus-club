'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Events' },
  { href: '/#about', label: 'About' },
  { href: '/#categories', label: 'Categories' },
  { href: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#070711]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span
            className="font-syne font-bold text-lg tracking-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            NEXUS
            <span className="text-indigo-400 ml-1">CLUB</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(0, -1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="text-sm text-white/50 hover:text-white/80 transition-colors px-3 py-2"
          >
            Admin
          </Link>
          <Link
            href="/"
            className="btn-primary text-sm px-5 py-2.5 rounded-xl relative z-10"
          >
            <span className="relative z-10">Browse Events</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg glass text-white/70 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-4 rounded-2xl glass-strong border border-white/10 overflow-hidden animate-scale-in">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-white/10">
              <Link
                href="/"
                className="block text-center btn-primary text-sm px-5 py-3 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Browse Events</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
