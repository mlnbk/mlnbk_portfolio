import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mlnbk.com'),
  title: {
    default: 'Milan Bako - Senior Software Engineer',
    template: '%s | Milan Bako',
  },
  description:
    'Senior software engineer based in Austria. Building scalable platforms and products that solve real business problems. Expert in TypeScript, React, NestJS and Node.js.',
  keywords: [
    'Milan Bako',
    'Software Engineer',
    'Senior Software Engineer',
    'Full Stack Developer',
    'TypeScript',
    'React',
    'Next.js',
    'NestJS',
    'React Native',
    'Portfolio',
    'Vienna',
    'Austria',
    'Web Development',
    'Mobile Development',
    'Software Development',
  ],
  authors: [{ name: 'Milan Bako' }],
  creator: 'Milan Bako',
  publisher: 'Milan Bako',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mlnbk.com',
    siteName: 'Milan Bako - Portfolio',
    title: 'Milan Bako - Senior Software Engineer',
    description:
      'Senior software engineer based in Austria. Building scalable platforms and products that solve real business problems.',
    images: [
      {
        url: '/avatar.jpeg',
        width: 1200,
        height: 630,
        alt: 'Milan Bako - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milan Bako - Senior Software Engineer',
    description:
      'Senior software engineer based in Austria. Building scalable platforms and products.',
    images: ['/avatar.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when you set it up
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://mlnbk.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='canonical' href='https://mlnbk.com' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#111827' />
      </head>
      <body>{children}</body>
    </html>
  );
}
