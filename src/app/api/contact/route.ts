import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, data, message } = body;

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'info@jsmyautosales.com';
    const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'JSMY Auto Sales Form';
    const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || BREVO_SENDER_EMAIL;

    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not defined');
      return NextResponse.json({ error: 'Mail server configuration error' }, { status: 500 });
    }

    // Format the data into a readable string
    let detailsString = '';
    if (data) {
      detailsString = Object.entries(data)
        .map(([key, value]) => `**${key}**: ${value}`)
        .join('\n');
    }

    const emailContent = `
      <h1>New Inquiry: ${type}</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <hr />
      <h3>Details:</h3>
      <pre>${detailsString}</pre>
      <p><strong>Message:</strong></p>
      <p>${message || 'No additional message'}</p>
    `;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_SENDER_NAME,
          email: BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: NOTIFICATION_EMAIL,
            name: 'JSMY Admin',
          },
        ],
        subject: `[JSMY Inquiry] ${type} from ${name}`,
        htmlContent: emailContent,
        replyTo: {
          email: email,
          name: name,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
