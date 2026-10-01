import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Fraunces (soft, warm serif) for headings; Plus Jakarta Sans for everything else.
const display = Fraunces({ subsets: ["latin"], display: "swap", axes: ["SOFT", "opsz"], variable: "--font-display-face" });
const body = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata: Metadata = {
  title: "Srinidhi Narayana",
  description: "Land Your Dream Job Faster - Optimized Resume, LinkedIn, and Job Search Strategy",
};

export const viewport: Viewport = {
  // style-check: ignore (the browser needs a literal colour here; it mirrors --color-paper)
  themeColor: "#f6f2fb",
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-control focus:bg-ink focus:px-4 focus:py-3 focus:text-small focus:font-medium focus:text-white"
        >
          Skip to Content
        </a>
        {children}
      </body>
    </html>
  );
}
