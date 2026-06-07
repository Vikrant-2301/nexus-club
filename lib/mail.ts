import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in', // Use smtp.zoho.com if your account is on the .com domain
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail(booking: any, event: any) {
  const dateObj = event.dates?.find((d: any) => d.id === booking.dateId);

  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #070711; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #1f1f33; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      
      <!-- Header -->
      <div style="padding: 40px 30px; text-align: center; background-color: #0c0c16; border-bottom: 1px solid #1f1f33;">
        <h1 style="margin: 0; font-size: 26px; letter-spacing: 3px; font-weight: 800;">
          BEYOND <span style="color: #818cf8;">WORK</span>
        </h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 40px 30px;">
        <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 700; color: #ffffff;">You're in! 🎉</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 35px;">
          Hi <strong style="color: #ffffff;">${booking.attendees[0].name}</strong>,<br><br>
          Your spot for <strong>${event.title}</strong> has been successfully secured. Get ready for an amazing experience with the community.
        </p>

        <!-- Ticket Card -->
        <div style="background-color: #11111a; border: 1px solid #1f1f33; border-radius: 12px; padding: 30px; margin-bottom: 35px;">
          <h3 style="margin: 0 0 20px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: #818cf8;">Event Details</h3>
          
          <div style="margin-bottom: 15px;">
            <strong style="display: block; color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Date & Time</strong>
            <span style="color: #ffffff; font-size: 16px; font-weight: 500;">
              ${dateObj ? dateObj.label + '<br/>' + dateObj.time : 'Check website for details'}
            </span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="display: block; color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Venue</strong>
            <span style="color: #ffffff; font-size: 16px; font-weight: 500;">
              ${event.mapLocation?.address || 'Check website for details'}
            </span>
          </div>
          
          <div style="margin-bottom: 25px;">
            <strong style="display: block; color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Booking ID</strong>
            <span style="color: #a1a1aa; font-size: 14px; font-family: monospace;">
              ${booking._id}
            </span>
          </div>

          <div style="padding-top: 20px; border-top: 1px solid #1f1f33;">
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 15px;">
              <tr>
                <td style="color: #a1a1aa; padding-bottom: 8px;">Group Size:</td>
                <td align="right" style="color: #ffffff; font-weight: 600; padding-bottom: 8px;">${booking.groupSize} People</td>
              </tr>
              <tr>
                <td style="color: #a1a1aa;">Amount Paid:</td>
                <td align="right" style="color: #ffffff; font-weight: 600;">₹${booking.totalAmount}</td>
              </tr>
            </table>
          </div>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #a1a1aa; margin: 0;">
          Please arrive at least 15 minutes prior to the start time. If you have any questions or need assistance, simply reply to this email. We can't wait to see you there!
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #0c0c16; padding: 30px; text-align: center; border-top: 1px solid #1f1f33;">
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #71717a;">
          © ${new Date().getFullYear()} BEYOND WORK · Mumbai, India
        </p>
        <p style="margin: 0; font-size: 13px; color: #52525b;">
          This is an automated message. You received this because you registered for an event.
        </p>
      </div>
      
    </div>
  `;

  const mailOptions = {
    from: `"Beyond Work" <${process.env.EMAIL_USER}>`,
    to: booking.contactEmail,
    subject: `Booking Confirmed: ${event.title}`,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
}
