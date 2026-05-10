import type { Metadata } from "next"
import { Plus, Users, BookOpen, Star, Clock, BarChart2, Pencil, TrendingUp } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Link } from "@/i18n/navigation"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const courses = [
  { title: "AutoCAD para Arquitectura — Nivel Básico", status: "Published" as const, enrolled: 842, lastUpdated: "2 may 2026" },
  { title: "Revit: BIM para Arquitectura", status: "Published" as const, enrolled: 306, lastUpdated: "18 abr 2026" },
  { title: "Rhino + Grasshopper — Diseño Paramétrico", status: "Draft" as const, enrolled: 0, lastUpdated: "5 may 2026" },
]

export default function InstructorDashboardPage() {
  const t = useTranslations("InstructorDashboard")

  const stats = [
    { icon: Users, value: "1,248", label: t("totalStudents"), trend: "+12%", trendLabel: "this month" },
    { icon: BookOpen, value: "4", label: t("activeCourses"), trend: "+1", trendLabel: "since last month" },
    { icon: Star, value: "4.8", label: t("avgRating"), trend: "+0.2", trendLabel: "since last month" },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">{t("subtitle")}</p>
        </div>
        <Button className="w-full gap-2 bg-primary text-white hover:bg-primary/80 sm:w-fit">
          <Plus className="h-4 w-4" />
          {t("newCourse")}
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={stat.label} className={`relative overflow-hidden${i === 2 ? " col-span-2 md:col-span-1" : ""}`}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">{stat.label}</p>
                <div className="rounded-lg bg-primary/10 p-2 sm:p-3">
                  <stat.icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-bold sm:mt-4">{stat.value}</p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500 sm:mt-3">
                <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                <span className="font-medium">{stat.trend}</span>
                <span className="hidden text-muted-foreground sm:inline">{stat.trendLabel}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-6 sm:my-8" />
      <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">{t("yourCourses")}</h2>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.title} className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
            <div className={`h-1 w-full ${course.status === "Published" ? "bg-primary" : "bg-zinc-600"}`} />
            <CardHeader className="pb-2 pt-4 sm:pt-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold leading-snug">{course.title}</h3>
                <Badge
                  variant={course.status === "Published" ? "default" : "outline"}
                  className={`shrink-0 text-xs ${course.status === "Published" ? "bg-primary/15 text-primary border-primary/20 hover:bg-primary/20" : "text-zinc-500 border-zinc-600"}`}
                >
                  {course.status === "Published" ? t("published", { fallback: "Published" }) : t("draft", { fallback: "Draft" })}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-end gap-3 pb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  <span>{course.enrolled.toLocaleString()} {t("studentsEnrolled")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{t("lastUpdated")} {course.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2 border-t pb-3 pt-3">
              <Button variant="ghost" size="sm" className="h-9 flex-1 gap-1.5 text-xs sm:h-8 sm:flex-none sm:px-3" asChild>
                <Link href="/instructor/course/1/analytics">
                  <BarChart2 className="h-3.5 w-3.5" />
                  {t("viewAnalytics")}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="h-9 flex-1 gap-1.5 text-xs sm:h-8 sm:flex-none sm:px-3" asChild>
                <Link href="/instructor/course/1/edit">
                  <Pencil className="h-3.5 w-3.5" />
                  {t("edit")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
