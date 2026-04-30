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

    // Format the data into a more professional layout
    const formattedDetails = Object.entries(data || {})
      .filter(([key]) => !['name', 'email', 'phone', 'method', 'privacy_agree', 'notes', 'message', 'type'].includes(key))
      .map(([key, value]) => {
        const label = key.replace(/_/g, ' ').toUpperCase();
        return `
          <div style="margin-bottom: 12px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <div style="font-size: 10px; color: #888; font-weight: bold; letter-spacing: 0.1em; margin-bottom: 4px;">${label}</div>
            <div style="font-size: 14px; color: #fff;">${value}</div>
          </div>
        `;
      }).join('');

    const emailContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #ffffff; background-color: #050505; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .card { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 24px; padding: 40px; overflow: hidden; }
            .header { margin-bottom: 32px; border-bottom: 1px solid #1a1a1a; padding-bottom: 24px; }
            .tag { display: inline-block; padding: 4px 12px; background: #ffffff; color: #000000; font-size: 10px; font-weight: bold; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
            .title { font-size: 24px; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.02em; }
            .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.3); margin: 32px 0 16px 0; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
            .info-item { margin-bottom: 20px; }
            .label { font-size: 10px; color: rgba(255,255,255,0.4); font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #ffffff; font-weight: 500; }
            .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px; margin-top: 8px; font-size: 14px; color: rgba(255,255,255,0.8); white-space: pre-wrap; }
            .footer { text-align: center; margin-top: 32px; font-size: 12px; color: rgba(255,255,255,0.3); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <span class="tag">New Inquiry</span>
                <h1 class="title">${type.replace(/_/g, ' ')}</h1>
              </div>

              <div class="section-title">Customer Information</div>
              <div style="display: table; width: 100%;">
                <div style="display: table-row;">
                  <div style="display: table-cell; padding-bottom: 20px;">
                    <div class="label">Full Name</div>
                    <div class="value">${name}</div>
                  </div>
                  <div style="display: table-cell; padding-bottom: 20px;">
                    <div class="label">Phone Number</div>
                    <div class="value">${phone}</div>
                  </div>
                </div>
                <div style="display: table-row;">
                  <div style="display: table-cell; padding-bottom: 20px;">
                    <div class="label">Email Address</div>
                    <div class="value">${email}</div>
                  </div>
                  <div style="display: table-cell; padding-bottom: 20px;">
                    <div class="label">Preferred Contact</div>
                    <div class="value" style="text-transform: capitalize;">${data?.method || 'Not Specified'}</div>
                  </div>
                </div>
              </div>

              ${formattedDetails ? `
                <div class="section-title">Inquiry Details</div>
                <div>${formattedDetails}</div>
              ` : ''}

              <div class="section-title">Message</div>
              <div class="message-box">${message || 'No additional message provided.'}</div>
            </div>
            <div class="footer">
              Sent from JSMY Auto Sales Website<br/>
              ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
            </div>
          </div>
        </body>
      </html>
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
