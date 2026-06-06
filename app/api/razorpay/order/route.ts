import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectToDatabase from '@/lib/db';
import { EventModel } from '@/lib/models/Event';
import { BookingModel } from '@/lib/models/Booking';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId, dateId, groupType, groupSize, attendees, totalAmount, contactEmail, contactPhone } = body;

    await connectToDatabase();

    // Verify event exists
    const event = await EventModel.findById(eventId);
    if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

    // Create a pending booking
    const booking = new BookingModel({
      eventId: event._id,
      eventSlug: event.slug,
      dateId,
      groupType,
      groupSize,
      attendees,
      totalAmount,
      contactEmail,
      contactPhone,
      status: 'pending'
    });
    await booking.save();

    // Create Razorpay Order (amount in paise)
    const options = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: booking._id.toString(),
    };

    const order = await razorpay.orders.create(options);
    
    booking.razorpayOrderId = order.id;
    await booking.save();

    return NextResponse.json({ orderId: order.id, bookingId: booking._id.toString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
