import type { ReactNode } from 'react';
import { Inter, Manrope } from 'next/font/google';

import { AppProviders } from '@/providers/app-providers';
import { metadata as siteMetadata, jsonLd } from '@/config/seo';

import './globals.css';

/**
 * Variable fonts, preloaded with swap to avoid layout shift (PRD Part 12).
 * Inter = primary body/UI, Manrope = display/headings.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata = siteMetadata;

export const viewport = {
  themeColor: '#F8FCFF',
  width: 'device-width',
  initialScale: 1,
  // The cinematic scene owns zoom; prevent double-tap zoom jank on the canvas.
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {/* Structured data for search engines (Part 12). */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
