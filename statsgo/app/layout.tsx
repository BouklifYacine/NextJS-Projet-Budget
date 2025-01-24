import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { Providers } from "./providers"; // Nouveau composant Client

export const metadata: Metadata = {
  title: "Gestion Budgétaire",
  description: "App web pour gérer son argent",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en">
      <body >
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}