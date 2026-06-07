import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const inquiryType = type || 'General Inquiry';

    await transporter.sendMail({
      from: `"Beyond Work Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[BW Contact] ${subject || inquiryType} — from ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background: #060610; color: #fff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px 40px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">New Contact Message</h1>
            <p style="margin: 8px 0 0; opacity: 0.8; font-size: 14px;">Beyond Work — Contact Form</p>
          </div>
          <div style="padding: 36px 40px; background: #0d0d20;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #fff; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #818cf8; font-size: 15px;"><a href="mailto:${email}" style="color: #818cf8; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Type</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #c4b5fd; font-size: 15px;">${inquiryType}</td>
              </tr>
              ${subject ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Subject</td><td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.07); color: #fff; font-size: 15px;">${subject}</td></tr>` : ''}
            </table>
            <div style="background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2); border-radius: 12px; padding: 20px 24px;">
              <p style="margin: 0 0 8px; color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
              <p style="margin: 0; color: rgba(255,255,255,0.85); font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 20px 40px; background: #0a0a18; border-top: 1px solid rgba(255,255,255,0.05);">
            <p style="margin: 0; color: rgba(255,255,255,0.25); font-size: 12px;">This message was sent via the Beyond Work contact form at beyondwork.site. Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
