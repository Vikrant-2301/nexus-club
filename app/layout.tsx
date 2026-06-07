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
  title: 'BEYOND WORK — Find Your Tribe, Join the Game',
  description:
    'Mumbai\'s most vibrant club for sports, social events, and unforgettable experiences. Browse events, register instantly, and show up.',
  keywords: 'club events mumbai, sports events, social mixer, football, yoga, running, basketball',
  openGraph: {
    title: 'BEYOND WORK',
    description: 'Find Your Tribe, Join the Game',
    type: 'website',
  },
};

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
