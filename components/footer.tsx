"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-xs text-muted-foreground">{t("copyright")}</p>
        <nav className="flex items-center gap-6 text-xs text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">{t("privacyPolicy")}</Link>
          <Link href="#" className="hover:text-foreground transition-colors">{t("termsOfService")}</Link>
          <Link href="#" className="hover:text-foreground transition-colors">{t("helpCenter")}</Link>
          <Link href="#" className="hover:text-foreground transition-colors">{t("contact")}</Link>
        </nav>
      </div>
    </footer>
  )
}
