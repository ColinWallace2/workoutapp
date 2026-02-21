// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SWRegistration } from "@/components/SWRegistration";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura - Elite Fitness",
  description: "Highly addictive, retention-focused workout tracking.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aura",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <SWRegistration />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
