import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800', '900'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "UMA | Agricultural Logistics Research Proposal & Pilot Platform",
  description:
    "Proposed B2B agricultural direct-procurement system connecting Butuan-area farmers directly with commercial kitchens. Research framework for forward-scheduled harvest batching.",
  keywords: [
    "B2B agriculture",
    "agricultural logistics",
    "supply chain research",
    "Butuan City",
    "farm to kitchen",
    "UMA",
  ],
  icons: {
    icon: [
      { url: '/uma-favicon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/uma-favicon.png',
    apple: '/uma-favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(outfit.variable, plusJakarta.variable, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/uma-favicon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/uma-favicon.png" type="image/png" />
      </head>
      <body
        className="min-h-screen antialiased bg-background text-foreground selection:bg-brand-forest/20 font-sans"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
