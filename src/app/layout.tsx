import type { Metadata } from 'next';
import { Hanken_Grotesk, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Olakunle & Partners - Operational Command',
  description: 'Comprehensive portfolio oversight and transaction telemetry.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${hanken.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-background text-on-background antialiased" suppressHydrationWarning>
        <div className="orbital-grid fixed inset-0 pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
