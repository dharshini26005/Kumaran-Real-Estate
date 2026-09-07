import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendRequirementEmail } from '@/lib/mail'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const {
      name,
      phone,
      email,
      intent,
      propertyType,
      area,
      location,
      budget,
      bhk,
      message,
    } = data

    if (!name || !phone || !email || !intent || !propertyType) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please fill all required fields.',
        },
        { status: 400 }
      )
    }

    // 1. Save to database
    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        email,
        intent,
        propertyType,
        area: area || null,
        location: location || null,
        budget: budget || null,
        bhk: bhk || null,
        message: message || null,
      },
    })

    // 2. Send notification email
    try {
      await sendRequirementEmail({
        name,
        phone,
        email,
        intent,
        propertyType,
        area,
        location,
        budget,
        bhk,
        message,
      })
    } catch (emailError) {
      console.error('Requirement email failed:', emailError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Requirement submitted successfully',
        leadId: lead.id,
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Lead submission error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit requirement',
      },
      { status: 500 }
    )
  }
}