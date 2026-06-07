import React from 'react';
import { notFound } from 'next/navigation';

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug !== 'refund') {
    notFound();
  }

  const title = 'Refund Policy';
  const content = (
    <div className="space-y-6">
      <p>At BEYOND WORK, we strive to ensure that all our events and services meet the highest standards of quality. Please read our refund policy carefully before making any bookings or purchases.</p>
      
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. No Refund Policy</h2>
      <p>All purchases, event tickets, and membership fees are strictly non-refundable. Once a booking is confirmed and payment is made, we cannot process any cancellations or refunds under any circumstances, including but not limited to personal scheduling conflicts, illness, or change of mind.</p>
      
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Event Cancellations by BEYOND WORK</h2>
      <p>In the rare event that BEYOND WORK must cancel or reschedule an event due to unforeseen circumstances (e.g., extreme weather, venue unavailability), we will either:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Provide a credit for a future event of equal value.</li>
        <li>Automatically transfer your registration to the rescheduled date.</li>
      </ul>
      <p>We do not offer monetary refunds for cancelled or rescheduled events.</p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Transfer of Tickets</h2>
      <p>While refunds are not permitted, tickets or bookings may be transferred to another individual, provided you notify our team at least 24 hours prior to the event start time. Please contact us with the details of the transfer.</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 font-syne relative z-10">{title}</h1>
        <div className="prose prose-invert relative z-10">
          <div className="text-white/70 leading-relaxed text-lg">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
