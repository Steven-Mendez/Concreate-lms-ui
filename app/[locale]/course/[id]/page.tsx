import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CheckCircle2, Circle, Clock, BookOpen } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Link } from "@/i18n/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getAllCourses, getCourseById } from "@/lib/courses"
import { absoluteUrl, alternateLanguages } from "@/lib/site"
import { routing } from "@/i18n/routing"
import { courseJsonLd, JsonLd } from "@/lib/jsonld"

const modules = [
  {
    title: "Módulo 1: Interfaz y Configuración",
    lessons: [
      { title: "Introducción a AutoCAD y la interfaz", duration: "12 min", completed: true },
      { title: "Configuración del espacio de trabajo", duration: "15 min", completed: true },
      { title: "Unidades, escala y límites del dibujo", duration: "18 min", completed: true },
      { title: "Capas (Layers): organización profesional", duration: "20 min", completed: true },
    ],
  },
  {
    title: "Módulo 2: Herramientas de Dibujo",
    lessons: [
      { title: "Líneas, polilíneas y rectángulos", duration: "22 min", completed: true },
      { title: "Arcos, círculos y elipses", duration: "16 min", completed: true },
      { title: "Herramientas de edición: Trim, Extend, Offset", duration: "25 min", completed: false },
      { title: "Mirror, Array y Rotate", duration: "20 min", completed: false },
    ],
  },
  {
    title: "Módulo 3: Planta Arquitectónica",
    lessons: [
      { title: "Trazado de muros y particiones", duration: "28 min", completed: false },
      { title: "Inserción de puertas y ventanas", duration: "22 min", completed: false },
      { title: "Cotas y anotaciones técnicas", duration: "18 min", completed: false },
    ],
  },
  {
    title: "Módulo 4: Presentación y Entrega",
    lessons: [
      { title: "Espacio papel (Layout) y viewports", duration: "20 min", completed: false },
      { title: "Bloques y atributos", duration: "15 min", completed: false },
      { title: "Impresión y exportación a PDF", duration: "12 min", completed: false },
      { title: "Proyecto final: Planta residencial completa", duration: "60 min", completed: false },
    ],
  },
]

const sidebarModules = [
  { title: "Interfaz y Configuración", completed: true },
  { title: "Herramientas de Dibujo", completed: false },
  { title: "Planta Arquitectónica", completed: false },
  { title: "Presentación y Entrega", completed: false },
]

const COURSE_PROGRESS = 65

export function generateStaticParams() {
  return getAllCourses().flatMap((course) =>
    routing.locales.map((locale) => ({ locale, id: course.id }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
  const { locale, id } = await params
  const course = getCourseById(id)
  if (!course) return {}

  const path = `/course/${course.id}`
  return {
    title: course.title,
    description: course.description,
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages: {
        ...alternateLanguages(path),
        "x-default": absoluteUrl(routing.defaultLocale, path),
      },
    },
    openGraph: {
      title: course.title,
      description: course.description,
      url: absoluteUrl(locale, path),
      type: "article",
      images: [course.image],
    },
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  setRequestLocale(locale)

  const course = getCourseById(id)
  if (!course) notFound()

  const t = await getTranslations({ locale, namespace: "CourseDetail" })
  const tA11y = await getTranslations({ locale, namespace: "A11y" })

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <JsonLd data={courseJsonLd(course, locale)} />

      <Breadcrumbs
        locale={locale}
        ariaLabel={t("catalog")}
        items={[
          { label: t("home"), href: "/" },
          { label: t("catalog"), href: "/browse" },
          { label: course.title },
        ]}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={course.image}
              alt={course.title}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              priority
              className="object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Badge>{course.level}</Badge>
            <Badge variant="outline">{course.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden="true" />
              10 {t("hours")}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {course.lessons} {t("lessons")}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            {course.description}
          </p>

          <Separator className="my-6" />
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {course.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{course.instructor}</p>
              <p className="text-sm text-muted-foreground">
                Ingeniero Civil con 12 años en diseño y construcción
              </p>
            </div>
          </div>
          <Separator className="my-6" />

          <section aria-labelledby="course-modules-heading">
            <h2
              id="course-modules-heading"
              className="mb-4 text-xl font-semibold"
            >
              {t("courseContent")}
            </h2>
            <Accordion
              type="multiple"
              defaultValue={["module-0", "module-1"]}
            >
              {modules.map((module, idx) => (
                <AccordionItem key={idx} value={`module-${idx}`}>
                  <AccordionTrigger className="text-sm font-semibold">
                    {module.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3">
                      {module.lessons.map((lesson, lessonIdx) => (
                        <li key={lessonIdx}>
                          <Link
                            href="/lesson/1"
                            className="flex items-center justify-between rounded-md px-1 py-0.5 transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                          >
                            <div className="flex items-center gap-2">
                              {lesson.completed ? (
                                <CheckCircle2
                                  className="h-4 w-4 text-primary"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Circle
                                  className="h-4 w-4 text-muted-foreground"
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                className={`text-sm ${
                                  lesson.completed
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside
          aria-label={t("yourProgress")}
          className="order-1 lg:order-2 lg:col-span-1"
        >
          <div className="sticky top-24">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("yourProgress")}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {COURSE_PROGRESS}%
                  </span>
                </div>
                <Progress
                  value={COURSE_PROGRESS}
                  aria-label={tA11y("courseProgress", {
                    percent: COURSE_PROGRESS,
                  })}
                  className="mt-2"
                />
              </CardHeader>

              <CardContent className="space-y-4">
                <Button className="w-full" asChild>
                  <Link href="/lesson/1">{t("continueCourse")}</Link>
                </Button>

                <Separator />

                <ul className="space-y-3">
                  {sidebarModules.map((mod, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {mod.completed ? (
                        <CheckCircle2
                          className="h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                      ) : (
                        <Circle
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`text-sm ${
                          mod.completed
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {mod.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}
