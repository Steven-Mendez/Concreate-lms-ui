import { Plus, Users, BookOpen, Star } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Link } from "@/i18n/navigation"

const courses = [
  { title: "AutoCAD para Arquitectura — Nivel Básico", status: "Published" as const, enrolled: 842, lastUpdated: "2 may 2026" },
  { title: "Revit: BIM para Arquitectura", status: "Published" as const, enrolled: 306, lastUpdated: "18 abr 2026" },
  { title: "Rhino + Grasshopper — Diseño Paramétrico", status: "Draft" as const, enrolled: 0, lastUpdated: "5 may 2026" },
]

export default function InstructorDashboardPage() {
  const t = useTranslations("InstructorDashboard")

  const stats = [
    { icon: Users, value: "1,248", label: t("totalStudents") },
    { icon: BookOpen, value: "4", label: t("activeCourses") },
    { icon: Star, value: "4.8", label: t("avgRating") },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button className="gap-2 bg-primary text-white hover:bg-primary/80">
          <Plus className="h-4 w-4" />
          {t("newCourse")}
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8" />
      <h2 className="mb-6 text-xl font-semibold">{t("yourCourses")}</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.title} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{course.title}</h3>
                <Badge
                  variant={course.status === "Published" ? "default" : "outline"}
                  className={course.status === "Published" ? "bg-primary text-white hover:bg-primary/80" : "text-zinc-500"}
                >
                  {course.status === "Published" ? t("published", { fallback: "Published" }) : t("draft", { fallback: "Draft" })}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 pb-3 text-sm text-muted-foreground">
              <p>{course.enrolled} {t("studentsEnrolled")}</p>
              <p>{t("lastUpdated")} {course.lastUpdated}</p>
            </CardContent>
            <CardFooter className="gap-2 border-t pt-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/instructor/course/1/analytics">{t("viewAnalytics")}</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/instructor/course/1/edit">{t("edit")}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
