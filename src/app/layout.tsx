import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HardCode AI | Enterprise Hardware Synthesis",
  description: "The hardware intelligence layer for professional engineers. Noir-grade firmware synthesis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..400,0..1&display=swap" />
      </head>
      <body className={`${bricolage.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white selection:bg-[#CCFF00] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
