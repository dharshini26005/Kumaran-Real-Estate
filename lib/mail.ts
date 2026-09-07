import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendRequirementEmail(data: {
  name: string
  phone: string
  email: string
  intent: string
  propertyType: string
  area?: string | null
  location?: string | null
  budget?: string | null
  bhk?: string | null
  message?: string | null
}) {
  await transporter.sendMail({
    from: `"Kumaran Real Estate Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Property Requirement - ${data.name}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; line-height: 1.6;">

        <h2 style="margin-bottom: 20px;">
          🏠 New Property Requirement
        </h2>

        <h3>Customer Details</h3>

        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Name</td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone</td>
            <td style="padding: 8px;">${data.phone}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Email</td>
            <td style="padding: 8px;">${data.email}</td>
          </tr>
        </table>

        <h3>Requirement Details</h3>

        <table style="border-collapse: collapse; width: 100%;">

          <tr>
            <td style="padding: 8px; font-weight: bold;">Requirement</td>
            <td style="padding: 8px;">${data.intent}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Property Type</td>
            <td style="padding: 8px;">${data.propertyType}</td>
          </tr>

          ${
            data.area
              ? `
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Area</td>
                  <td style="padding: 8px;">${data.area}</td>
                </tr>
              `
              : ''
          }

          ${
            data.location
              ? `
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Location</td>
                  <td style="padding: 8px;">${data.location}</td>
                </tr>
              `
              : ''
          }

          ${
            data.budget
              ? `
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Budget</td>
                  <td style="padding: 8px;">${data.budget}</td>
                </tr>
              `
              : ''
          }

          ${
            data.bhk
              ? `
                <tr>
                  <td style="padding: 8px; font-weight: bold;">BHK</td>
                  <td style="padding: 8px;">${data.bhk}</td>
                </tr>
              `
              : ''
          }

        </table>

        ${
          data.message
            ? `
              <h3>Additional Message</h3>
              <p>${data.message}</p>
            `
            : ''
        }

        <hr />

        <p>
          <strong>Kumaran Real Estate</strong>
        </p>

        <p>
          📞 +91 9176260156
        </p>

        <p>
          📧 kumaranrealestate42@gmail.com
        </p>

      </div>
    `,
  })
}

export async function sendContactEmail(data: {
  name: string
  email: string
  phone?: string | null
  message: string
}) {
  await transporter.sendMail({
    from: `"Kumaran Real Estate Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: `New Contact Enquiry - ${data.name}`,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; line-height: 1.6;">

        <h2>📩 New Contact Enquiry</h2>

        <h3>Customer Details</h3>

        <table style="border-collapse: collapse; width: 100%;">

          <tr>
            <td style="padding: 8px; font-weight: bold;">Name</td>
            <td style="padding: 8px;">${data.name}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Email</td>
            <td style="padding: 8px;">${data.email}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone</td>
            <td style="padding: 8px;">
              ${data.phone || 'Not provided'}
            </td>
          </tr>

        </table>

        <h3>Message</h3>

        <div style="
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
        ">
          ${data.message}
        </div>

        <hr />

        <p>
          <strong>Kumaran Real Estate</strong>
        </p>

        <p>
          📞 +91 9176260156
        </p>

        <p>
          📧 kumaranrealestate42@gmail.com
        </p>

      </div>
    `,
  })
}