import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendConfirmationEmail(booking: any, event: any) {
  const mailOptions = {
    from: `"Nexus Club" <${process.env.EMAIL_USER}>`,
    to: booking.contactEmail,
    subject: `Booking Confirmed: ${event.title}`,
    html: `
      <h2>You're in! 🎉</h2>
      <p>Hi ${booking.attendees[0].name},</p>
      <p>Your booking for <strong>${event.title}</strong> is confirmed.</p>
      <br/>
      <h3>Details:</h3>
      <ul>
        <li><strong>Group Size:</strong> ${booking.groupSize}</li>
        <li><strong>Total Paid:</strong> ₹${booking.totalAmount}</li>
      </ul>
      <p>We look forward to seeing you!</p>
      <br/>
      <p>Cheers,<br/>Nexus Club</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
