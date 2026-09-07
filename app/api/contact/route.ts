import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendContactEmail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = data

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please fill all required fields.',
        },
        { status: 400 }
      )
    }

    // Save contact message to database
    const contact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      },
    })

    // Send notification email
    try {
      await sendContactEmail({
        name,
        email,
        phone,
        subject,
        message,
      })
    } catch (emailError) {
      console.error(
        'Contact email failed:',
        emailError
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        contactId: contact.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error(
      'Contact submission error:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send message',
      },
      { status: 500 }
    )
  }
}