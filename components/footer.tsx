import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("Footer")
  const tA11y = useTranslations("A11y")
  const year = new Date().getFullYear()

  const links = [
    { label: t("privacyPolicy") },
    { label: t("termsOfService") },
    { label: t("helpCenter") },
    { label: t("contact") },
  ]

  return (
    <footer
      aria-label={tA11y("footer")}
      className="mt-20 border-t border-border bg-background"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          {t("copyright", { year })}
        </p>
        <nav
          aria-label={tA11y("footerNavigation")}
          className="flex items-center gap-6 text-xs text-muted-foreground"
        >
          {links.map((link) => (
            <span
              key={link.label}
              className="cursor-default opacity-70"
              title={link.label}
            >
              {link.label}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  )
}
