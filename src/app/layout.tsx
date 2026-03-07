import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WedVerse - 3D Wedding Album",
  description: "Immersive 3D wedding album experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
