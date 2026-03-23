import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { ChatWidget } from "../components/chat/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kodemy - Learn in order, track progress",
  description: "Udemy-like LMS for Kodnest. Master topics step by step with locked prerequisites and progress tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#f7f9fa]`}
    >
      <body className="min-h-full flex flex-col">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <AppFooter />
        <ChatWidget />
      </body>
    </html>
  );
}
