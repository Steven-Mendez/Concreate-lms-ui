import { routing } from "@/i18n/routing"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://concreate-pi.vercel.app"

export const SITE_NAME = "Concreate"

export const DEFAULT_LOCALE = routing.defaultLocale

export const LOCALES = routing.locales

export const OG_LOCALES: Record<string, string> = {
  es: "es_ES",
  en: "en_US",
}

export function localePath(locale: string, path: string = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`
  const trimmed = normalized === "/" ? "" : normalized
  return `/${locale}${trimmed}`
}

export function absoluteUrl(locale: string, path: string = "") {
  return `${SITE_URL}${localePath(locale, path)}`
}

export function alternateLanguages(path: string = "") {
  return Object.fromEntries(
    LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])
  )
}
