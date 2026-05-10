"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("Errors")

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-8 w-8" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {t("errorTitle")}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {t("errorDescription")}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} size="lg">
          {t("tryAgain")}
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">{t("backToHome")}</Link>
        </Button>
      </div>
    </div>
  )
}
