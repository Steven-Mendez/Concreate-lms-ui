import { ChevronLeft, Plus, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const modules = [
  {
    title: "Conceptos Básicos",
    lessons: ["Interfaz de Usuario", "Herramientas de Dibujo", "Capas y Propiedades", "Bloques y Atributos"],
  },
  {
    title: "Documentación",
    lessons: ["Cotas y Texto", "Presentación (Layouts)", "Ploteo y Exportación", "Estilos de Impresión"],
  },
]

export default function EditCoursePage() {
  const t = useTranslations("InstructorEdit")

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/instructor/dashboard" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ChevronLeft className="h-3.5 w-3.5" />
              {t("dashboard")}
            </Link>
            <span>›</span>
            <span>AutoCAD Básico</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="text-sm">{t("draft")}</Badge>
          <Button variant="outline" asChild>
            <Link href="/instructor/course/1/analytics">{t("viewAnalytics")}</Link>
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/80">
            {t("saveChanges")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left — Main Form */}
        <div className="space-y-8 lg:col-span-2">
          {/* Basic Info */}
          <Card>
            <CardHeader className="pb-4">
              <h2 className="text-base font-semibold">{t("courseInformation")}</h2>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">{t("courseTitle")}</Label>
                <Input id="title" defaultValue="AutoCAD Básico" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("description")}</Label>
                <Textarea
                  id="description"
                  rows={4}
                  defaultValue="Master the art of user interface design in this comprehensive course. You'll learn everything from foundational design principles to building production-ready design systems."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">{t("category")}</Label>
                  <Select defaultValue="design">
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">{t("design")}</SelectItem>
                      <SelectItem value="engineering">{t("engineering")}</SelectItem>
                      <SelectItem value="data">{t("data")}</SelectItem>
                      <SelectItem value="business">{t("business")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">{t("level")}</Label>
                  <Select defaultValue="intermediate">
                    <SelectTrigger id="level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{t("beginner")}</SelectItem>
                      <SelectItem value="intermediate">{t("intermediate")}</SelectItem>
                      <SelectItem value="advanced">{t("advanced")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Curriculum */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">{t("curriculum")}</h2>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  {t("addModule")}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {modules.map((mod, modIdx) => (
                <div key={modIdx} className="rounded-lg border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <Input
                      defaultValue={mod.title}
                      className="h-8 max-w-xs border-0 p-0 text-sm font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    />
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Separator className="mb-3" />
                  <ul className="space-y-2">
                    {mod.lessons.map((lesson, lessonIdx) => (
                      <li key={lessonIdx} className="flex items-center gap-2">
                        <span className="w-4 text-xs text-muted-foreground">{lessonIdx + 1}.</span>
                        <Input
                          defaultValue={lesson}
                          className="h-7 flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" className="mt-3 gap-1.5 text-xs text-muted-foreground">
                    <Plus className="h-3 w-3" />
                    {t("addLesson")}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right — Settings Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader className="pb-4">
              <h2 className="text-base font-semibold">{t("publishSettings")}</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t("status")}</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">{t("draft")}</SelectItem>
                    <SelectItem value="published">{t("published")}</SelectItem>
                    <SelectItem value="archived">{t("archived")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("created")}</span>
                  <span>Apr 10, 2026</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("lastSaved")}</span>
                  <span>May 5, 2026</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t("students")}</span>
                  <span>842</span>
                </div>
              </div>

              <Separator />

              <Button
                variant="outline"
                size="sm"
                className="w-full text-destructive hover:bg-destructive/5 hover:text-destructive"
              >
                {t("deleteCourse")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <h2 className="text-base font-semibold">{t("thumbnail")}</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="aspect-video overflow-hidden rounded-md bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/images/autocad-basico.png"
                  alt="Course thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                {t("changeThumbnail")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
