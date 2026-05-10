import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { notFound } from "next/navigation"

import "../globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/components/theme-provider"
import {
  OG_LOCALES,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  alternateLanguages,
} from "@/lib/site"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = t("siteTitle")
  const description = t("siteDescription")

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    keywords: [
      "AutoCAD",
      "Revit",
      "Rhino",
      "Grasshopper",
      "BIM",
      "arquitectura",
      "ingeniería civil",
      "cursos",
      "Concreate",
    ],
    alternates: {
      canonical: absoluteUrl(locale),
      languages: { ...alternateLanguages(), "x-default": absoluteUrl(routing.defaultLocale) },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(locale),
      locale: OG_LOCALES[locale] ?? OG_LOCALES.es,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l]),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: {
      email: false,
      telephone: false,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: "A11y" })

  return (
    <html
      lang={locale}
      className={`${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring/50"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
