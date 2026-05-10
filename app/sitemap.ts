import type { MetadataRoute } from "next"

import { getAllCourses } from "@/lib/courses"
import { LOCALES, SITE_URL, alternateLanguages, localePath } from "@/lib/site"

type SitemapEntry = MetadataRoute.Sitemap[number]

const STATIC_PATHS = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/browse", priority: 0.9, changeFrequency: "daily" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: SitemapEntry[] = []

  for (const { path, priority, changeFrequency } of STATIC_PATHS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: alternateLanguages(path) },
      })
    }
  }

  for (const course of getAllCourses()) {
    const path = `/course/${course.id}`
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: alternateLanguages(path) },
      })
    }
  }

  return entries
}
