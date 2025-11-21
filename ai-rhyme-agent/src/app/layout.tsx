import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rhyme Agent Automation Blueprint",
  description:
    "End-to-end automation plan for generating rhyme ideas, producing audio/video assets, and publishing to YouTube with n8n and free creative tools.",
  metadataBase: new URL("https://agentic-ebdce89a.vercel.app"),
  openGraph: {
    title: "Rhyme Agent Automation Blueprint",
    description:
      "Plan, orchestrate, and ship rhyme-driven content using n8n, Google Sheets, Musicful.ai, Flow.AI, and YouTube.",
    url: "https://agentic-ebdce89a.vercel.app",
    siteName: "Rhyme Agent Automation Blueprint",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhyme Agent Automation Blueprint",
    description:
      "Automate rhyme ideation, audio/video generation, and YouTube publishing with n8n.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
