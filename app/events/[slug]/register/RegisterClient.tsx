'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Check,
  Calendar,
  Users,
  User,
  CreditCard,
  MapPin,
  Clock,
  Flame,
  CheckCircle,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Event, EventDate, GroupType, Attendee } from '@/lib/types';
import { formatCurrency, getSpotsColor, getCategoryEmoji } from '@/lib/utils';
import { getPriceForGroup, GROUP_OPTIONS } from '@/lib/events';
import toast from 'react-hot-toast';

interface Props {
  event: Event;
}

const STEPS = [
  { id: 1, label: 'Date', icon: Calendar },
  { id: 2, label: 'Group', icon: Users },
  { id: 3, label: 'Details', icon: User },
  { id: 4, label: 'Payment', icon: CreditCard },
];

const EMPTY_ATTENDEE: Attendee = { name: '', phone: '', email: '', age: '' };

export default function RegisterClient({ event }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<EventDate | null>(null);
  const [groupType, setGroupType] = useState<GroupType | null>(null);
  const [groupSize, setGroupSize] = useState(1);
  const [attendees, setAttendees] = useState<Attendee[]>([{ ...EMPTY_ATTENDEE }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const priceBreakdown = selectedDate && groupType
    ? getPriceForGroup(event, groupType, groupSize, selectedDate.id)
    : null;

  // ---- STEP 1: Date ----
  const handleDateSelect = (date: EventDate) => {
    if (date.spotsLeft <= 0) return;
    setSelectedDate(date);
    setStep(2);
  };

  // ---- STEP 2: Group ----
  const handleGroupSelect = (type: GroupType, size: number) => {
    setGroupType(type);
    setGroupSize(size);
    // Adjust attendees array
    setAttendees(Array.from({ length: size }, (_, i) => attendees[i] || { ...EMPTY_ATTENDEE }));
    setStep(3);
  };

  // ---- STEP 3: Details ----
  const updateAttendee = (index: number, field: keyof Attendee, value: string) => {
    setAttendees((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    // Clear error
    setErrors((prev) => {
      const next = { ...prev };
      delete next[`${index}-${field}`];
      return next;
    });
  };

  const validateDetails = (): boolean => {
    const newErrors: Record<string, string> = {};
    attendees.forEach((att, i) => {
      if (!att.name.trim()) newErrors[`${i}-name`] = 'Required';
      if (!att.phone.trim() || att.phone.replace(/\D/g, '').length < 10) newErrors[`${i}-phone`] = 'Valid 10-digit number';
      if (!att.email.trim() || !att.email.includes('@')) newErrors[`${i}-email`] = 'Valid email';
      if (!att.age.trim() || parseInt(att.age) < (event.minAge || 0) || parseInt(att.age) > 100) newErrors[`${i}-age`] = `Age ${event.minAge || 1}-100`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsNext = () => {
    if (validateDetails()) setStep(4);
  };

  // ---- STEP 4: Payment ----
  const handlePayment = async () => {
    if (!priceBreakdown || !selectedDate) return;
    setIsSubmitting(true);

    try {
      // 1. Create order on backend
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          dateId: selectedDate.id,
          groupType,
          groupSize,
          attendees,
          totalAmount: priceBreakdown.total,
          contactEmail: attendees[0].email,
          contactPhone: attendees[0].phone
        })
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error);

      // 2. Open Razorpay Widget
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(priceBreakdown.total * 100),
        currency: 'INR',
        name: 'NEXUS CLUB',
        description: `Booking for ${event.title}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // 3. Verify payment signature on backend
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: orderData.bookingId
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setSubmitted(true);
              toast.success('Payment successful!');
            } else {
              toast.error(verifyData.error || 'Payment verification failed');
            }
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: attendees[0].name,
          email: attendees[0].email,
          contact: attendees[0].phone
        },
        theme: {
          color: '#4f46e5'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();

    } catch (error: any) {
      toast.error(error.message || 'Failed to initiate payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---- SUCCESS SCREEN ----
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#070711] flex items-center justify-center px-4 pt-20">
        <div className="max-w-lg w-full text-center animate-scale-in">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center animate-scale-in">
            <CheckCircle size={36} className="text-emerald-400" />
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            You're In! 🎉
          </h1>
          <p className="text-white/55 text-base mb-8">
            Your spot is confirmed. A confirmation email has been sent to {attendees[0].email}.
          </p>

          {/* Summary card */}
          <div className="glass border border-white/10 rounded-2xl p-6 text-left space-y-4 mb-8">
            <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Booking Summary</h2>
            {[
              { label: 'Event', value: event.title },
              { label: 'Date', value: selectedDate?.label || '' },
              { label: 'Time', value: selectedDate?.time || '' },
              { label: 'Venue', value: selectedDate?.location || '' },
              { label: 'Group', value: GROUP_OPTIONS.find(g => g.type === groupType)?.label || '' },
              { label: 'Attendees', value: attendees.map(a => a.name).join(', ') },
              { label: 'Total Paid', value: priceBreakdown ? formatCurrency(priceBreakdown.total) : '' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-white/40 text-sm">{label}</span>
                <span className="text-white text-sm font-medium text-right">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="btn-secondary flex-1 text-center py-3.5 rounded-xl text-sm"
            >
              Browse More Events
            </Link>
            <Link
              href={`/events/${event.slug}`}
              className="btn-primary flex-1 text-center py-3.5 rounded-xl text-sm"
            >
              <span className="relative z-10">Back to Event</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070711] pt-20">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors mb-6"
          >
            <ChevronLeft size={16} /> {event.title}
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">{getCategoryEmoji(event.category)}</span>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">{event.category}</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Register for Event
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isDone = step > s.id;
            const isActive = step === s.id;
            return (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all duration-300 ${
                      isDone
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : isActive
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400'
                        : 'border-white/15 bg-transparent text-white/25'
                    }`}
                  >
                    {isDone ? <Check size={14} /> : <Icon size={14} />}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium hidden sm:block ${
                      isActive ? 'text-indigo-400' : isDone ? 'text-indigo-400/70' : 'text-white/25'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                      step > s.id ? 'bg-indigo-600' : 'bg-white/8'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ===== STEP 1: DATE ===== */}
        {step === 1 && (
          <div className="animate-slide-up space-y-4">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
                Pick Your Date
              </h2>
              <p className="text-white/45 text-sm">Choose a session that works for you</p>
            </div>
            {event.dates.map((date) => {
              const isSoldOut = date.spotsLeft <= 0;
              const isHot = date.spotsLeft <= 5 && !isSoldOut;
              return (
                <button
                  key={date.id}
                  id={`date-${date.id}`}
                  onClick={() => handleDateSelect(date)}
                  disabled={isSoldOut}
                  className={`date-card w-full ${isSoldOut ? 'sold-out' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 text-left">
                      <p className="font-bold text-white text-base mb-1">{date.label}</p>
                      <div className="flex items-center gap-3 text-xs text-white/50 mb-1">
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {date.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {date.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {isSoldOut ? (
                        <span className="text-xs text-white/30 font-medium">Sold Out</span>
                      ) : (
                        <>
                          <span className={`text-xs font-semibold block ${getSpotsColor(date.spotsLeft, date.spotsTotal)}`}>
                            {date.spotsLeft} spots left
                          </span>
                          {isHot && (
                            <span className="flex items-center gap-1 text-xs text-orange-400 mt-0.5">
                              <Flame size={10} /> Hot
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {/* Spots mini bar */}
                  {!isSoldOut && (
                    <div className="mt-3 w-full h-1 bg-white/8 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all"
                        style={{ width: `${(date.spotsLeft / date.spotsTotal) * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ===== STEP 2: GROUP ===== */}
        {step === 2 && (
          <div className="animate-slide-up space-y-4">
            <div className="mb-2">
              <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-4 glass border border-indigo-500/20 rounded-xl px-4 py-2.5 w-fit">
                <Calendar size={13} />
                {selectedDate?.label} · {selectedDate?.time}
              </div>
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
                How Are You Coming?
              </h2>
              <p className="text-white/45 text-sm">Group discounts apply — bigger group, better price</p>
            </div>

            {event.earlyBird?.active && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600/15 border border-indigo-500/30">
                <Zap size={15} className="text-indigo-400 flex-shrink-0" />
                <p className="text-indigo-300 text-sm font-medium">{event.earlyBird.label}</p>
              </div>
            )}

            {GROUP_OPTIONS.map(({ type, label, size, description }) => {
              const breakdown = selectedDate
                ? getPriceForGroup(event, type, size, selectedDate.id)
                : null;
              const displayPrice = breakdown?.perPerson || event.pricing[type];
              const fullPrice = event.pricing[type];
              const isEarlyBirdActive = event.earlyBird?.active && breakdown && breakdown.earlyBirdCount > 0;

              return (
                <button
                  key={type}
                  id={`group-${type}`}
                  onClick={() => handleGroupSelect(type, size)}
                  className="group-card w-full"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-bold text-white text-base">{label}</p>
                      <p className="text-white/45 text-sm mt-0.5">{description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-lg font-bold ${isEarlyBirdActive ? 'text-indigo-400' : 'text-white'}`}>
                          {formatCurrency(displayPrice)}
                        </span>
                        {isEarlyBirdActive && (
                          <span className="text-white/30 text-sm line-through">{formatCurrency(fullPrice)}</span>
                        )}
                      </div>
                      <p className="text-white/35 text-xs">/person</p>
                      {breakdown && (
                        <p className="text-indigo-400/70 text-xs font-semibold mt-0.5">
                          Total: {formatCurrency(breakdown.total)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            <button
              onClick={() => setStep(1)}
              className="btn-secondary w-full py-3 rounded-xl text-sm mt-2"
            >
              ← Back
            </button>
          </div>
        )}

        {/* ===== STEP 3: DETAILS ===== */}
        {step === 3 && (
          <div className="animate-slide-up">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-6 glass border border-indigo-500/20 rounded-xl px-4 py-2.5 w-fit">
              <Calendar size={13} /> {selectedDate?.label}
              <span className="text-white/30 mx-1">·</span>
              <Users size={13} /> {GROUP_OPTIONS.find(g => g.type === groupType)?.label}
            </div>
            <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
              {groupSize === 1 ? 'Your Details' : 'Everyone\'s Details'}
            </h2>
            <p className="text-white/45 text-sm mb-6">
              Fill in details for all {groupSize} attendee{groupSize > 1 ? 's' : ''}
            </p>

            <div className="space-y-6">
              {attendees.map((att, i) => (
                <div key={i} className="glass border border-white/8 rounded-2xl p-5">
                  {groupSize > 1 && (
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-4">
                      Person {i + 1}
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id={`name-${i}`}
                        type="text"
                        placeholder="Your full name"
                        value={att.name}
                        onChange={(e) => updateAttendee(i, 'name', e.target.value)}
                        className={`input-field ${errors[`${i}-name`] ? 'error' : ''}`}
                      />
                      {errors[`${i}-name`] && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors[`${i}-name`]}
                        </p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">
                        Age <span className="text-red-400">*</span>
                        {event.minAge && <span className="text-white/25 normal-case ml-1">(min {event.minAge})</span>}
                      </label>
                      <input
                        id={`age-${i}`}
                        type="number"
                        placeholder={`${event.minAge || 18}+`}
                        min={event.minAge || 1}
                        max={100}
                        value={att.age}
                        onChange={(e) => updateAttendee(i, 'age', e.target.value)}
                        className={`input-field ${errors[`${i}-age`] ? 'error' : ''}`}
                      />
                      {errors[`${i}-age`] && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors[`${i}-age`]}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <input
                        id={`phone-${i}`}
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={att.phone}
                        onChange={(e) => updateAttendee(i, 'phone', e.target.value)}
                        className={`input-field ${errors[`${i}-phone`] ? 'error' : ''}`}
                      />
                      {errors[`${i}-phone`] && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors[`${i}-phone`]}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-white/40 font-medium uppercase tracking-wider block mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id={`email-${i}`}
                        type="email"
                        placeholder="you@example.com"
                        value={att.email}
                        onChange={(e) => updateAttendee(i, 'email', e.target.value)}
                        className={`input-field ${errors[`${i}-email`] ? 'error' : ''}`}
                      />
                      {errors[`${i}-email`] && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors[`${i}-email`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            {priceBreakdown && (
              <div className="mt-6 glass border border-indigo-500/20 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Total to Pay</p>
                  <p className="text-white/60 text-xs">
                    {priceBreakdown.earlyBirdCount > 0
                      ? `${priceBreakdown.earlyBirdCount} × ${formatCurrency(priceBreakdown.earlyBirdPrice)} (early bird)`
                      : `${groupSize} × ${formatCurrency(priceBreakdown.fullPrice)}`}
                  </p>
                </div>
                <span className="text-2xl font-bold text-indigo-400" style={{ fontFamily: 'var(--font-syne)' }}>
                  {formatCurrency(priceBreakdown.total)}
                </span>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1 py-3.5 rounded-xl text-sm">
                ← Back
              </button>
              <button onClick={handleDetailsNext} className="btn-primary flex-2 flex-1 py-3.5 rounded-xl text-sm">
                <span className="relative z-10">Continue to Payment →</span>
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP 4: PAYMENT ===== */}
        {step === 4 && (
          <div className="animate-slide-up space-y-5">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-2 glass border border-indigo-500/20 rounded-xl px-4 py-2.5 w-fit">
              <Calendar size={13} /> {selectedDate?.label}
              <span className="text-white/30 mx-1">·</span>
              {priceBreakdown && <span>{formatCurrency(priceBreakdown.total)} total</span>}
            </div>
            <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>
              Complete Payment
            </h2>
            <p className="text-white/45 text-sm mb-4">
              Pay securely via Razorpay to confirm your spot
            </p>

            {/* Payment card */}
            <div className="glass border border-white/10 rounded-2xl p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <CreditCard className="text-indigo-400" size={28} />
                </div>
                <p className="text-white/60 mb-2 font-medium">You are paying</p>
                <h3 className="text-4xl font-bold text-white gradient-text mb-6">
                  {priceBreakdown ? formatCurrency(priceBreakdown.total) : ''}
                </h3>
                
                <p className="text-xs text-white/30 mb-6">Payments are secured by Razorpay</p>

                <div className="flex gap-3">
                  <button onClick={() => setStep(3)} className="btn-secondary flex-1 py-3.5 rounded-xl text-sm" disabled={isSubmitting}>
                    ← Edit Details
                  </button>
                  <button
                    id="submit-registration"
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="btn-primary flex-[2] py-3.5 rounded-xl text-sm font-semibold"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Pay Now ✓</>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
