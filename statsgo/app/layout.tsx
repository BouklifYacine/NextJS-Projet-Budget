import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestion Budgétaire",
  description: "App web pour gérer son argent",
};

export default async function RootLayout({
 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
   
    <html lang="en">
      <SessionProvider session={session}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      </SessionProvider>
    </html>
  );
}
