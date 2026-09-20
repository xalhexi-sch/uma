import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "UMA | Fresh farm food. Delivered to your door.",
  description: "Direct farm produce, fresh milk, and eggs delivered across Butuan City. Fair prices, pickup nearby, and fast delivery.",
  keywords: ["fresh food", "farm delivery", "Butuan City", "vegetables", "farm milk", "eggs", "UMA"],
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
    <html lang="en" data-scroll-behavior="smooth" className={cn("dark", "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/uma-favicon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/uma-favicon.png" type="image/png" />
      </head>
      <body
        className="min-h-screen antialiased bg-background text-foreground selection:bg-emerald-500 selection:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

