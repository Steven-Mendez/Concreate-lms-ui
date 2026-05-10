"use client"

import { useState } from "react"
import { Bell, HelpCircle, Menu } from "lucide-react"
import { useTranslations } from "next-intl"

import { usePathname, Link } from "@/i18n/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/ui/logo"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NavLink = {
  label: string
  href: "/" | "/browse" | "/dashboard" | "/instructor/dashboard"
  match: string[]
}

export function Navbar() {
  const pathname = usePathname()
  const t = useTranslations("Navbar")
  const tA11y = useTranslations("A11y")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks: NavLink[] = [
    { label: t("browse"), href: "/browse", match: ["/browse", "/course"] },
    { label: t("myLearning"), href: "/dashboard", match: ["/dashboard", "/lesson"] },
    {
      label: t("mentors"),
      href: "/instructor/dashboard",
      match: ["/instructor"],
    },
    { label: t("community"), href: "/", match: [] },
  ]

  function isActive(matches: string[], href: string) {
    if (matches.length === 0) return pathname === href
    return matches.some((segment) => pathname.startsWith(segment))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${t("browse")} — Concreate`}
          className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Logo className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="text-xl font-bold uppercase leading-none tracking-widest text-primary">
              Concreate
            </span>
          </div>
        </Link>

        {/* Center Navigation — desktop only */}
        <nav
          aria-label={tA11y("mainNavigation")}
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.match, link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative pb-1 text-sm font-medium transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />

          <Separator
            orientation="vertical"
            className="mx-1 hidden h-6 md:block"
          />

          <button
            type="button"
            aria-label={t("notifications")}
            className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:block"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={t("help")}
            className="hidden rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:block"
          >
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </button>

          <Separator
            orientation="vertical"
            className="mx-1 hidden h-6 md:block"
          />

          <Link
            href="/instructor/dashboard"
            aria-label={t("myAccount")}
            className="hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:block"
          >
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                SM
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={tA11y("openMenu")}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              closeLabel={tA11y("closeMenu")}
              className="flex w-72 flex-col p-0"
            >
              <SheetHeader>
                <SheetTitle>Concreate</SheetTitle>
                <SheetDescription className="sr-only">
                  {tA11y("mainNavigation")}
                </SheetDescription>
              </SheetHeader>
              <nav
                aria-label={tA11y("mainNavigation")}
                className="flex flex-col gap-1 px-4 py-4"
              >
                {navLinks.map((link) => {
                  const active = isActive(link.match, link.href)
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <Separator className="my-2" />
                <Link
                  href="/instructor/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={t("myAccount")}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">
                    {t("myAccount")}
                  </span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
