import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "WebScraper Pro - Professional Web Scraping SaaS",
    template: "%s | WebScraper Pro"
  },
  description: "Extract data from any website with our powerful, easy-to-use web scraping platform. Schedule scrapes, export data, and automate your workflow.",
  keywords: ["web scraping", "data extraction", "automation", "API", "SaaS", "data mining"],
  authors: [{ name: "WebScraper Pro Team" }],
  creator: "WebScraper Pro",
  publisher: "WebScraper Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://webscraperpro.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'WebScraper Pro - Professional Web Scraping SaaS',
    description: 'Extract data from any website with our powerful, easy-to-use web scraping platform.',
    siteName: 'WebScraper Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WebScraper Pro - Professional Web Scraping',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebScraper Pro - Professional Web Scraping SaaS',
    description: 'Extract data from any website with our powerful, easy-to-use web scraping platform.',
    images: ['/og-image.png'],
    creator: '@webscraperpro',
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}