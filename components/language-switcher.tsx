"use client"

import { useLocale, useTranslations } from "next-intl"
import { Globe } from "lucide-react"

import { usePathname, useRouter } from "@/i18n/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations("LanguageSwitcher")

  function onSelectChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-2">
      <Globe
        className="h-4 w-4 text-muted-foreground"
        aria-hidden="true"
      />
      <Select value={locale} onValueChange={onSelectChange}>
        <SelectTrigger
          aria-label={t("changeLanguage")}
          className="h-8 w-[100px] border-0 bg-transparent text-sm font-medium text-muted-foreground shadow-none hover:text-foreground data-[state=open]:text-foreground"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
