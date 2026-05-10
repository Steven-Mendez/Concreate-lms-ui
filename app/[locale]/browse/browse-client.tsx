"use client"

import { useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "@/i18n/navigation"
import {
  CATEGORIES,
  LEVEL_ORDER,
  type Course,
  type CourseLevel,
} from "@/lib/courses"

const levelClasses: Record<CourseLevel, string> = {
  Básico:
    "border-level-beginner/40 bg-level-beginner/15 text-level-beginner-foreground dark:bg-level-beginner/25",
  Intermedio:
    "border-level-intermediate/40 bg-level-intermediate/15 text-level-intermediate-foreground dark:bg-level-intermediate/25",
  Avanzado:
    "border-level-advanced/40 bg-level-advanced/15 text-level-advanced-foreground dark:bg-level-advanced/25",
}

export function BrowseClient({ courses }: { courses: Course[] }) {
  const t = useTranslations("Browse")
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [sort, setSort] = useState("popular")

  const filtered = useMemo(() => {
    let result = courses

    if (activeCategory !== "All") {
      result = result.filter((c) => c.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
    }

    if (sort === "level-asc") {
      result = [...result].sort(
        (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]
      )
    } else if (sort === "level-desc") {
      result = [...result].sort(
        (a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level]
      )
    }

    return result
  }, [courses, search, activeCategory, sort])

  const hasActiveFilters = search.trim() !== "" || activeCategory !== "All"

  function clearFilters() {
    setSearch("")
    setActiveCategory("All")
  }

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-4">
        <label htmlFor="course-search" className="sr-only">
          {t("searchAriaLabel")}
        </label>
        <Input
          id="course-search"
          type="search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label={t("searchAriaLabel")}
          className="h-10 pr-9"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-3 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            aria-label={t("clearSearch")}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Category chips + Sort */}
      <div className="mb-5 flex items-center gap-3">
        <div
          role="group"
          aria-label={t("filterByCategory")}
          className="flex flex-1 gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={active}
                aria-current={active ? "true" : undefined}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat === "All" ? t("allCategories") : cat}
              </button>
            )
          })}
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger
            aria-label={t("sortBy")}
            className="h-8 w-auto shrink-0 gap-1 border-border px-2.5 text-xs sm:w-[168px] sm:px-3"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">
              <SelectValue placeholder={t("sortBy")} />
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">{t("popular")}</SelectItem>
            <SelectItem value="newest">{t("newest")}</SelectItem>
            <SelectItem value="level-asc">{t("levelAsc")}</SelectItem>
            <SelectItem value="level-desc">{t("levelDesc")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results meta row */}
      <div className="mb-5 flex items-center justify-between">
        <p
          className="text-sm text-muted-foreground"
          aria-live="polite"
          role="status"
        >
          {t("resultsCount", { count: filtered.length })}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-sm text-xs font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <X className="h-3 w-3" aria-hidden="true" />
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Course grid */}
      {filtered.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <li key={course.id}>
              <Card className="group h-full overflow-hidden transition-shadow focus-within:ring-2 focus-within:ring-ring/50 hover:shadow-lg">
                <Link
                  href={`/course/${course.id}` as never}
                  className="block focus-visible:outline-none"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-fit text-xs">
                      {course.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`w-fit text-xs ${levelClasses[course.level]}`}
                    >
                      {course.level}
                    </Badge>
                  </div>
                  <Link
                    href={`/course/${course.id}` as never}
                    className="rounded-sm transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                  >
                    <h3 className="mt-2 text-base font-semibold leading-tight">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {course.description}
                  </p>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                        {course.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {course.instructor}
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-muted-foreground">
                    {course.lessons} {t("lessons")}
                  </span>
                  <Button size="sm" asChild>
                    <Link href={`/course/${course.id}` as never}>
                      {t("enroll")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search
            className="mb-4 h-10 w-10 text-muted-foreground/40"
            aria-hidden="true"
          />
          <p className="text-base font-semibold text-foreground">
            {t("noResults")}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("noResultsHint")}
          </p>
          <Button variant="outline" className="mt-5" onClick={clearFilters}>
            {t("clearFilters")}
          </Button>
        </div>
      )}
    </>
  )
}
