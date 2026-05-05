import { NextResponse } from 'next/server';
import { BUSINESS_INFO } from '@/utils/businessInfo';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            // Step 1
            firstName,
            lastName,
            email,
            phone,
            zipCode,
            // Step 2 General
            applicationType,
            personalData,
            residenceHistory,
            workHistory,
            // Business
            businessInfo,
            businessAddress,
            businessIncome,
            // Common
            signature,
        } = body;

        const {
            middleName,
            dob,
            ssn,
            driversLicense,
            dlState,
            homePhone,
            workPhone,
            employmentStatus,
        } = personalData || {};

        const subject = `[PRE-APPROVE] ${firstName} ${lastName} - ${applicationType.toUpperCase()}`;

        const brevoApiKey = process.env.BREVO_API_KEY;
        const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@jsmyautosales.com';
        const senderName = process.env.BREVO_SENDER_NAME || 'JSMY Auto Sales';
        const receiverEmail = process.env.BREVO_RECEIVER_EMAIL || BUSINESS_INFO.email;

        if (!brevoApiKey) {
            console.error('BREVO_API_KEY is missing');
            return NextResponse.json(
                { error: 'Email service configuration missing' },
                { status: 500 },
            );
        }

        let htmlContent = `
          <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Pre-Approval Application</h2>
            
            <h3 style="background: #f4f4f4; padding: 10px;">Basic Information</h3>
            <p><strong>Application Type:</strong> ${applicationType.toUpperCase()}</p>
            <p><strong>Full Name:</strong> ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Zip Code:</strong> ${zipCode}</p>
        `;

        if (applicationType === 'personal') {
            htmlContent += `
              <h3 style="background: #f4f4f4; padding: 10px;">Applicant Information</h3>
              <p><strong>DOB:</strong> ${dob}</p>
              <p><strong>SSN/ITIN:</strong> ${ssn}</p>
              <p><strong>Driver's License:</strong> ${driversLicense} (${dlState})</p>
              <p><strong>Home Phone:</strong> ${homePhone || 'N/A'}</p>
              <p><strong>Work Phone:</strong> ${workPhone || 'N/A'}</p>
              <p><strong>Employment Status:</strong> ${employmentStatus}</p>

              <h3 style="background: #f4f4f4; padding: 10px;">Residence History (2 Years)</h3>
              ${residenceHistory.map((res: any, index: number) => `
                <div style="margin-bottom: 10px; border-left: 3px solid #eee; padding-left: 10px;">
                  <p><strong>Address ${index + 1}:</strong> ${res.address}, ${res.city}, ${res.state} ${res.zip}, ${res.country}</p>
                  <p><strong>Duration:</strong> ${res.years} Years, ${res.months} Months</p>
                  <p><strong>Type:</strong> ${res.type}</p>
                  <p><strong>Monthly Rent/Mortgage:</strong> $${res.amount}</p>
                </div>
              `).join('')}

              <h3 style="background: #f4f4f4; padding: 10px;">Work History (2 Years)</h3>
              ${workHistory.map((work: any, index: number) => `
                <div style="margin-bottom: 10px; border-left: 3px solid #eee; padding-left: 10px;">
                  <p><strong>Employer ${index + 1}:</strong> ${work.employer}</p>
                  <p><strong>Job Title:</strong> ${work.jobTitle}</p>
                  <p><strong>Income:</strong> $${work.monthlyIncome} (Gross Monthly)</p>
                  <p><strong>Address:</strong> ${work.address}, ${work.city}, ${work.state} ${work.zip}, ${work.country}</p>
                  <p><strong>Phone:</strong> ${work.phone}</p>
                  <p><strong>Duration:</strong> ${work.years} Years, ${work.months} Months</p>
                </div>
              `).join('')}
            `;
        } else {
            htmlContent += `
              <h3 style="background: #f4f4f4; padding: 10px;">Business Information</h3>
              <p><strong>Company Legal Name:</strong> ${businessInfo.legalName}</p>
              <p><strong>Tax ID (EIN):</strong> ${businessInfo.taxId}</p>
              <p><strong>DBA:</strong> ${businessInfo.dba}</p>
              <p><strong>Years in Business:</strong> ${businessInfo.yearsInBusiness}</p>
              <p><strong>Business Phone:</strong> ${businessInfo.phone}</p>
              <p><strong>Business Email:</strong> ${businessInfo.email}</p>

              <h3 style="background: #f4f4f4; padding: 10px;">Business Address</h3>
              <p>${businessAddress.street}, ${businessAddress.city}, ${businessAddress.state} ${businessAddress.zip}, ${businessAddress.country}</p>

              <h3 style="background: #f4f4f4; padding: 10px;">Income Information</h3>
              <p><strong>Gross Profit (Monthly):</strong> $${businessIncome.grossProfit}</p>
              <p><strong>Annual Sales:</strong> $${businessIncome.annualSales}</p>
            `;
        }

        htmlContent += `
            <h3 style="background: #f4f4f4; padding: 10px;">Terms and Signature</h3>
            <p><strong>Signature:</strong> ${signature}</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">This pre-approval application was submitted via the JSMY Auto Sales website.</p>
          </div>
        `;

        // Brevo API call
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'api-key': brevoApiKey,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    name: senderName,
                    email: senderEmail,
                },
                to: [
                    {
                        email: receiverEmail,
                    },
                ],
                replyTo: {
                    email: email,
                    name: `${firstName} ${lastName}`,
                },
                subject: subject,
                htmlContent: htmlContent,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Brevo API Error:', data);
            return NextResponse.json(
                { error: 'Failed to send application' },
                { status: response.status },
            );
        }

        return NextResponse.json(
            { message: 'Application sent successfully', id: data.messageId },
            { status: 200 },
        );
    } catch (error: any) {
        console.error('Pre-approve API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
