import { auth } from "@/auth";
import GuestLanding from "@/components/auth/guest-landing";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from 'sonner'
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from 'next-intl';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Planner",
  description: "Planner Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  const locale = await getLocale();

  const messages = await getMessages();

  // not changing the dir of the html to rtl, for simplicity.

  return (
    <html lang={locale ? locale : 'en'} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-red-700 selection:text-white `}
      >
        <NextIntlClientProvider messages={messages}>
        <Toaster />
        {session && session.user ? (
          <Providers>

            {children}
          </Providers>

        ) : (
          <GuestLanding />
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
