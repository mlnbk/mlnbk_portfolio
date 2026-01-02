import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

// Simple in-memory throttling (1 request per minute per IP)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip);

  if (lastRequest && now - lastRequest < RATE_LIMIT_MS) {
    return false; // Rate limited
  }

  rateLimitMap.set(ip, now);
  return true; // Allowed
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            'One contact request is allowed per minute for security reasons. Please try again in a minute.',
        },
        { status: 429 },
      );
    }

    const body: ContactBody = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    // Validate email format
    if (!/^\S+@\S+$/i.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    // Send email
    const transporter = nodemailer.createTransport({
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'Portfolio Contact',
      to: process.env.GMAIL_USERNAME,
      subject: `New contact from ${body.name}`,
      text: `New contact form submission from ${body.name} with email ${body.email}.\n\nMessage:\n${body.message}`,
      replyTo: body.email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully. You will be contacted soon.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      {
        error:
          'Failed to submit contact email. Please try again or check out my LinkedIn or Github.',
      },
      { status: 500 },
    );
  }
}

