import "../styles/globals.css";
import "../styles/cv-button.css";
import type { Metadata } from "next";
import Nav from "@/components/nav";
import GlobalBlobs from "@/components/GlobalBlobs";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Thibault Cauche — Développeur Full-Stack & Designer",
  description: "Portfolio de Thibault Cauche : développeur full-stack, UI/UX designer. Projets React, Flutter, Next.js.",
  openGraph: {
    title: "Thibault Cauche — Développeur Full-Stack & Designer",
    description: "Portfolio de Thibault Cauche : développeur full-stack, UI/UX designer.",
    url: "https://www.thibaultcauche.com",
    siteName: "Thibault Cauche",
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Thibault Cauche", description: "Portfolio de Thibault Cauche" },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  // ⬇️ en Next 15, params est une Promise
  params: Promise<{ locale: string }>;
}) {
  // ⬇️ on attend params avant d'en extraire locale
  const { locale } = await params;

  const messages = await getMessages({ locale });
  if (!messages) notFound();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="relative bg-[#1c1b21] text-foreground">
        <GlobalBlobs
          balls={[
            { x: "50%", y: "-5%", w: "80vmax", color: "#8b5cf6", opacity: 0.3, blur: "80px", speed: "22s" },
            { x: "12%", y: "65%", w: "62vmax", color: "#22d3ee", opacity: 0.26, blur: "80px", speed: "24s" },
            { x: "88%", y: "60%", w: "58vmax", color: "#f43f5e", opacity: 0.24, blur: "80px", speed: "26s" },
          ]}
        />

        <NextIntlClientProvider locale={locale} messages={messages}>
            <Nav />
            {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
