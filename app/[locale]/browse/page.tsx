import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { getAllCourses } from "@/lib/courses"
import { absoluteUrl, alternateLanguages } from "@/lib/site"
import { routing } from "@/i18n/routing"
import { BrowseClient } from "./browse-client"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const title = t("browseTitle")
  const description = t("browseDescription")

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(locale, "/browse"),
      languages: {
        ...alternateLanguages("/browse"),
        "x-default": absoluteUrl(routing.defaultLocale, "/browse"),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, "/browse"),
    },
  }
}

export default async function BrowsePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Browse" })
  const courses = getAllCourses()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          {t("description")}
        </p>
      </header>
      <BrowseClient courses={courses} />
    </div>
  )
}
