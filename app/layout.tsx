import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "PDF Summarizer - AI-Powered Document Analysis",
  description: "Transform your PDFs into concise, intelligent summaries with our advanced AI technology. Get key insights from any document in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
    </ClerkProvider>
  );
}