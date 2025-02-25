import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "FTM",
  description: "FTM",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`bg-slate-300 antialiased ${poppins.className}`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
