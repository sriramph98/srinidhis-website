import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter is a variable font, so every weight comes from one file.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Srinidhi Narayana",
  description: "Land Your Dream Job Faster - Optimized Resume, LinkedIn, and Job Search Strategy",
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
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
