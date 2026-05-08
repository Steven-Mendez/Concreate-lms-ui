"use client"

import { Bell, HelpCircle } from "lucide-react"
import { useTranslations } from "next-intl"

import { usePathname, Link } from "@/i18n/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/ui/logo"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const pathname = usePathname()
  const t = useTranslations("Navbar")

  const navLinks = [
    { label: t("browse"), href: "/browse", match: ["/browse", "/course"] },
    { label: t("myLearning"), href: "/dashboard", match: ["/dashboard", "/lesson"] },
    { label: t("mentors"), href: "/instructor/dashboard", match: ["/instructor"] },
    { label: t("community"), href: "/", match: [] },
  ]

  function isActive(matches: string[], href: string) {
    if (matches.length === 0) return pathname === href;
    return matches.some((segment) => pathname.startsWith(segment))
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-widest text-primary uppercase leading-none">Concreate</span>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.match, link.href)
            return (
              <Link
                key={link.label}
                href={link.href as any}
                className={`relative pb-1 text-sm font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          
          <Separator orientation="vertical" className="mx-1 h-6 hidden md:block" />

          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
            <HelpCircle className="h-5 w-5" />
          </button>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <Link href="/instructor/dashboard">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                SM
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
