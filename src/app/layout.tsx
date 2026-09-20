import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "UMA | Farm-Fresh Produce, Scheduled to Your Kitchen",
  description: "B2B agricultural marketplace connecting Butuan-area farmers directly with carinderias, canteens, and restaurants. Verified harvest-to-order fulfillment.",
  keywords: ["B2B produce", "farm to kitchen", "Butuan City", "carinderia supplier", "farm direct", "UMA"],
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
    <html lang="en" data-scroll-behavior="smooth" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/uma-favicon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/uma-favicon.png" type="image/png" />
      </head>
      <body
        className="min-h-screen antialiased bg-background text-foreground selection:bg-brand-green/30"
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

