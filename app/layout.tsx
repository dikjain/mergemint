import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Nunito,
  Exo_2,
  Bitcount_Single,
} from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

const exo2 = Exo_2({
  variable: '--font-exo-2',
  subsets: ['latin'],
});

const bitcountSingle = Bitcount_Single({
  variable: '--font-bitcount-single',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mergemint',
  description: 'Mergemint',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${exo2.variable} ${bitcountSingle.variable} h-screen w-full antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
