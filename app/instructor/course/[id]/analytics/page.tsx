import {
  BarChart3,
  Users,
  PlayCircle,
  TrendingUp,
  Clock,
  ChevronLeft,
} from "lucide-react"

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

const stats = [
  { icon: Users, label: "Total Students", value: "842", change: "+12 this week" },
  { icon: PlayCircle, label: "Lessons Completed", value: "14,203", change: "+340 today" },
  { icon: Clock, label: "Avg. Watch Time", value: "38 min", change: "per session" },
  { icon: TrendingUp, label: "Completion Rate", value: "67%", change: "+4% vs last month" },
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

export default function CourseAnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/instructor/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" />
              Dashboard
            </a>
            <span>›</span>
            <span>UI Design Mastery</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Course Analytics</h1>
          <p className="mt-1 text-muted-foreground">UI Design Mastery — Performance overview</p>
        </div>
        <Button variant="outline" asChild>
          <a href="/instructor/course/1/edit">Edit Course</a>
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
          <h2 className="mb-4 text-lg font-semibold">Module Completion</h2>
          <Card>
            <CardContent className="pt-6 space-y-5">
              {moduleStats.map((mod) => (
                <div key={mod.module}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{mod.module}</span>
                    <span className="text-muted-foreground">{mod.completed}/{mod.enrolled} students</span>
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
          <h2 className="mb-4 text-lg font-semibold">At a Glance</h2>
          <Card className="h-fit">
            <CardContent className="pt-6 space-y-4">
              {[
                { label: "Published", value: "May 2, 2026" },
                { label: "Last Updated", value: "May 5, 2026" },
                { label: "Total Modules", value: "4 modules" },
                { label: "Total Lessons", value: "15 lessons" },
                { label: "Total Duration", value: "12 hours" },
                { label: "Avg. Rating", value: "4.8 / 5.0" },
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
      <h2 className="mb-4 text-lg font-semibold">Recent Students</h2>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
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
      </Card>
    </div>
  )
}
