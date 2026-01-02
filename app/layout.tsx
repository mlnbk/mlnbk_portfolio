import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Milan Bako - Software Engineer',
  description: 'Portfolio website of Milan Bako, a full-stack software engineer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

