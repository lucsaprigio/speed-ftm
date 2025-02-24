import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

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

  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect('/painel')
  }

  return (
    <html lang="en">
      <body
        className={`bg-slate-300 antialiased ${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}
