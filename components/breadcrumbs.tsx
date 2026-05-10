import { ChevronRight } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld"
import { absoluteUrl } from "@/lib/site"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  locale: string
  ariaLabel?: string
}

export function Breadcrumbs({ items, locale, ariaLabel }: BreadcrumbsProps) {
  const ldItems = items
    .filter((item) => Boolean(item.href))
    .map((item) => ({
      label: item.label,
      url: absoluteUrl(locale, item.href!),
    }))

  return (
    <>
      <nav
        aria-label={ariaLabel ?? "Breadcrumb"}
        className="mb-6 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li
                key={`${item.label}-${idx}`}
                className="flex items-center gap-x-1.5"
              >
                {item.href && !isLast ? (
                  <Link
                    href={item.href as never}
                    className="rounded-sm transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "text-foreground" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    className="h-3.5 w-3.5 text-muted-foreground/60"
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      {ldItems.length > 0 && <JsonLd data={breadcrumbJsonLd(ldItems)} />}
    </>
  )
}
