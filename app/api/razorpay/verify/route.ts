import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/db';
import { BookingModel } from '@/lib/models/Booking';
import { EventModel } from '@/lib/models/Event';
import { sendConfirmationEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: 'Transaction is not legit!' }, { status: 400 });
    }

    await connectToDatabase();
    
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    booking.status = 'completed';
    booking.razorpayPaymentId = razorpay_payment_id;
    booking.razorpaySignature = razorpay_signature;
    await booking.save();

    // Decrease spots left
    const event = await EventModel.findById(booking.eventId);
    if (event) {
      const dateObj = event.dates.find((d: any) => d.id === booking.dateId);
      if (dateObj) {
        dateObj.spotsLeft -= booking.groupSize;
        if (dateObj.spotsLeft < 0) dateObj.spotsLeft = 0;
        await event.save();
      }
    }

    // Send email synchronously to ensure it completes before lambda exits
    try {
      await sendConfirmationEmail(booking, event);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }
    return NextResponse.json({ success: true, message: 'Payment verified' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
