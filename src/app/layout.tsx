import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

// Free stand-ins for Ben Shih's licensed Acorn (headings) and Roobert (text).
const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-display-face" });
const body = Figtree({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata: Metadata = {
  title: "Srinidhi Narayana",
  description: "Land Your Dream Job Faster - Optimized Resume, LinkedIn, and Job Search Strategy",
};

export const viewport: Viewport = {
  themeColor: "#f9f4ed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to Content
        </a>
        {children}
      </body>
    </html>
  );
}
