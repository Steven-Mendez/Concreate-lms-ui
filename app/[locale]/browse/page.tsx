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

const courses = [
  {
    title: "AutoCAD para Arquitectura — Nivel Básico",
    description:
      "Domina las herramientas esenciales de AutoCAD para producir planos arquitectónicos profesionales desde cero.",
    category: "AutoCAD",
    instructor: "Ing. Carlos Medina",
    initials: "CM",
    lessons: 22,
    level: "Básico",
    image: "/assets/images/autocad-basico.png",
  },
  {
    title: "AutoCAD Avanzado — Planos Técnicos",
    description:
      "Secciones, elevaciones, detalles constructivos y documentación profesional de proyectos de arquitectura.",
    category: "AutoCAD",
    instructor: "Arq. Valeria Ríos",
    initials: "VR",
    lessons: 28,
    level: "Avanzado",
    image: "/assets/images/autocad-avanzado.png",
  },
  {
    title: "Revit: BIM para Arquitectura",
    description:
      "Crea modelos BIM completos desde la concepción hasta la entrega de documentación de construcción.",
    category: "Revit",
    instructor: "Arq. Diego Fuentes",
    initials: "DF",
    lessons: 34,
    level: "Intermedio",
    image: "/assets/images/revit-bim.png",
  },
  {
    title: "Revit MEP — Coordinación BIM",
    description:
      "Integra sistemas mecánicos, eléctricos y sanitarios en un modelo federado de coordinación BIM.",
    category: "Revit",
    instructor: "Ing. Sofía Paredes",
    initials: "SP",
    lessons: 26,
    level: "Avanzado",
    image: "/assets/images/revit-mep.png",
  },
  {
    title: "Rhino 3D — Modelado para Arquitectura",
    description:
      "Aprende a modelar formas complejas, superficies NURBS y volúmenes arquitectónicos en Rhinoceros.",
    category: "Rhino",
    instructor: "Arq. Tomás Guerrero",
    initials: "TG",
    lessons: 20,
    level: "Intermedio",
    image: "/assets/images/rhino-3d.png",
  },
  {
    title: "Rhino + Grasshopper — Diseño Paramétrico",
    description:
      "Diseño algorítmico y generativo para fachadas, estructuras y geometrías complejas aplicadas a proyectos reales.",
    category: "Rhino",
    instructor: "Arq. Lucía Montoya",
    initials: "LM",
    lessons: 30,
    level: "Avanzado",
    image: "/assets/images/rhino-grasshopper.png",
  },
]

const CATEGORIES = ["All", "AutoCAD", "Revit", "Rhino"] as const
const LEVEL_ORDER: Record<string, number> = { Básico: 1, Intermedio: 2, Avanzado: 3 }

const levelColors: Record<string, string> = {
  Básico: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Intermedio: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Avanzado: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
}

export default function BrowsePage() {
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
      result = [...result].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])
    } else if (sort === "level-desc") {
      result = [...result].sort((a, b) => LEVEL_ORDER[b.level] - LEVEL_ORDER[a.level])
    }

    return result
  }, [search, activeCategory, sort])

  const hasActiveFilters = search.trim() !== "" || activeCategory !== "All"

  function clearFilters() {
    setSearch("")
    setActiveCategory("All")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">{t("description")}</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Input
          type="search"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 pr-9"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category chips + Sort */}
      <div className="mb-5 flex items-center gap-3">
        {/* Horizontally scrollable category chips */}
        <div className="flex flex-1 gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat === "All" ? t("allCategories") : cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-8 w-auto shrink-0 gap-1 border-border px-2.5 text-xs sm:w-[168px] sm:px-3">
            <SlidersHorizontal className="h-3.5 w-3.5 sm:hidden" />
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
        <p className="text-sm text-muted-foreground">
          {t("resultsCount", { count: filtered.length })}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <X className="h-3 w-3" />
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Course grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Card
              key={course.title}
              className="group overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Thumbnail */}
              <Link href="/course/1">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
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
                    className={`w-fit text-xs ${levelColors[course.level]}`}
                  >
                    {course.level}
                  </Badge>
                </div>
                <Link href="/course/1" className="hover:underline">
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
                  <span className="text-sm text-muted-foreground">{course.instructor}</span>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t pt-4">
                <span className="text-sm text-muted-foreground">
                  {course.lessons} {t("lessons")}
                </span>
                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/80"
                  asChild
                >
                  <Link href="/course/1">{t("enroll")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="mb-4 h-10 w-10 text-muted-foreground/40" />
          <p className="text-base font-semibold text-foreground">{t("noResults")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("noResultsHint")}</p>
          <Button variant="outline" className="mt-5" onClick={clearFilters}>
            {t("clearFilters")}
          </Button>
        </div>
      )}
    </div>
  )
}
