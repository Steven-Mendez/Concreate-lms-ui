import { useTranslations } from "next-intl"
import { Compass } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export default function NotFound() {
  const t = useTranslations("Errors")

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
        {t("notFoundTitle")}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        {t("notFoundDescription")}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">{t("backToHome")}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/browse">{t("browseCourses")}</Link>
        </Button>
      </div>
    </div>
  )
}
