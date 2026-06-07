import type { Metadata } from 'next';
import { Syne, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://beyondwork.site'),
  title: {
    default: 'BEYOND WORK — Find Your Tribe, Join the Game',
    template: '%s | BEYOND WORK',
  },
  description:
    'Mumbai\'s most vibrant club for sports, social events, and unforgettable experiences. Browse events, register instantly, and show up.',
  keywords: ['club events mumbai', 'sports events', 'social mixer', 'football', 'yoga', 'running', 'basketball', 'beyond work', 'community'],
  authors: [{ name: 'Beyond Work' }],
  creator: 'Beyond Work',
  openGraph: {
    title: 'BEYOND WORK — Find Your Tribe, Join the Game',
    description: 'Mumbai\'s most vibrant club for sports, social events, and unforgettable experiences.',
    url: '/',
    siteName: 'BEYOND WORK',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'BEYOND WORK',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEYOND WORK — Find Your Tribe',
    description: 'Mumbai\'s most vibrant club for sports, social events, and unforgettable experiences.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import SocialPopup from '@/components/layout/SocialPopup';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-[#070711] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SocialPopup />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '12px',
              fontFamily: 'var(--font-inter)',
            },
          }}
        />
      </body>
    </html>
  );
}
