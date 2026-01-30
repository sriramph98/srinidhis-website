import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-instrument-sans'
});

export const metadata: Metadata = {
  title: "Srinidhi Narayana",
  description: "Land Your Dream Job Faster - Optimized Resume, LinkedIn, and Job Search Strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body suppressHydrationWarning className={`${instrumentSans.className} font-sans`}>{children}</body>
    </html>
  );
}
