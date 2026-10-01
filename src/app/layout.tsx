import type { Metadata, Viewport } from "next";
import { DM_Sans, Hedvig_Letters_Serif, Rock_Salt } from "next/font/google";
import "./globals.css";

// Hedvig Letters Serif for headings; DM Sans (a variable font, one file for every weight) for everything else.
const display = Hedvig_Letters_Serif({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-display-face" });
// Rock Salt: handwriting, used only for the polaroid caption.
const hand = Rock_Salt({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-hand-face" });
const body = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-body" });

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
    <html lang="en" className={`${display.variable} ${body.variable} ${hand.variable}`}>
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
