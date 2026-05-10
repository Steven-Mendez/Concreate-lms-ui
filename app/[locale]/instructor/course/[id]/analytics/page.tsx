import type { Metadata } from "next"
import {
  BarChart3,
  Users,
  PlayCircle,
  TrendingUp,
  Clock,
  ChevronLeft,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CourseAnalyticsPage() {
  const t = useTranslations("InstructorAnalytics")

  const stats = [
    { icon: Users, label: t("totalStudents"), value: "842", change: "+12 this week" },
    { icon: PlayCircle, label: t("lessonsCompleted"), value: "14,203", change: "+340 today" },
    { icon: Clock, label: t("avgWatchTime"), value: "38 min", change: "per session" },
    { icon: TrendingUp, label: t("completionRate"), value: "67%", change: "+4% vs last month" },
  ]

  const moduleStats = [
    { module: "Design Foundations", enrolled: 842, completed: 780, rate: 93 },
    { module: "Component Design", enrolled: 842, completed: 610, rate: 72 },
    { module: "Responsive Design", enrolled: 842, completed: 420, rate: 50 },
    { module: "Design Systems", enrolled: 842, completed: 210, rate: 25 },
  ]

  const recentStudents = [
    { name: "Alex Johnson", enrolled: "May 4, 2026", progress: 78, status: "In Progress" },
    { name: "Maria Torres", enrolled: "May 3, 2026", progress: 100, status: "Completed" },
    { name: "Kenji Nakamura", enrolled: "May 2, 2026", progress: 42, status: "In Progress" },
    { name: "Priya Sharma", enrolled: "Apr 30, 2026", progress: 15, status: "Just Started" },
    { name: "Omar Hassan", enrolled: "Apr 28, 2026", progress: 100, status: "Completed" },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/instructor/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" />
              {t("dashboard")}
            </Link>
            <span>›</span>
            <span>UI Design Mastery</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button variant="outline" className="w-fit" asChild>
          <Link href="/instructor/course/1/edit">{t("editCourse")}</Link>
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                <stat.icon className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wide">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Module Completion */}
        <div className="lg:col-span-3">
          <h2 className="mb-4 text-lg font-semibold">{t("moduleCompletion")}</h2>
          <Card>
            <CardContent className="pt-6 space-y-5">
              {moduleStats.map((mod) => (
                <div key={mod.module}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{mod.module}</span>
                    <span className="text-muted-foreground">{mod.completed}/{mod.enrolled} {t("students")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={mod.rate} className="flex-1" />
                    <span className="w-10 text-right text-sm font-semibold text-primary">{mod.rate}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">{t("atAGlance")}</h2>
          <Card className="h-fit">
            <CardContent className="pt-6 space-y-4">
              {[
                { label: t("published"), value: "May 2, 2026" },
                { label: t("lastUpdated"), value: "May 5, 2026" },
                { label: t("totalModules"), value: "4 modules" },
                { label: t("totalLessons"), value: "15 lessons" },
                { label: t("totalDuration"), value: "12 hours" },
                { label: t("avgRating"), value: "4.8 / 5.0" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Students Table */}
      <Separator className="my-8" />
      <h2 className="mb-4 text-lg font-semibold">{t("recentStudents")}</h2>
      <Card>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("student")}</TableHead>
              <TableHead>{t("enrolled")}</TableHead>
              <TableHead>{t("progress")}</TableHead>
              <TableHead>{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentStudents.map((student) => (
              <TableRow key={student.name}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell className="text-muted-foreground">{student.enrolled}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={student.progress} className="w-24" />
                    <span className="text-sm text-muted-foreground">{student.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={student.status === "Completed" ? "default" : "outline"}
                    className={
                      student.status === "Completed"
                        ? "bg-primary text-white text-xs"
                        : "text-xs text-muted-foreground"
                    }
                  >
                    {student.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </Card>
    </div>
  )
}
