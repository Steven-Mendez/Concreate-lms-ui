import type { Metadata } from "next"
import { CheckCircle2, Circle, PlayCircle } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LessonMobileNav } from "@/components/lesson-mobile-nav"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Link } from "@/i18n/navigation"

const lessons = [
  { title: "Líneas, polilíneas y rectángulos", completed: true, current: false },
  { title: "Arcos, círculos y elipses", completed: true, current: false },
  { title: "Trim, Extend y Offset", completed: false, current: true },
  { title: "Mirror, Array y Rotate", completed: false, current: false },
]

const MODULE_PROGRESS = 50
const CURRENT_LESSON_TITLE = "Herramientas de edición: Trim, Extend y Offset"
const COURSE_TITLE = "AutoCAD para Arquitectura"
const MODULE_TITLE = "Módulo 2: Herramientas de Dibujo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  return {
    title: `${CURRENT_LESSON_TITLE} — ${COURSE_TITLE}`,
    description: `Aprende ${CURRENT_LESSON_TITLE} en el curso ${COURSE_TITLE}.`,
    robots: { index: false, follow: true },
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Lesson" })
  const tA11y = await getTranslations({ locale, namespace: "A11y" })
  const tCourse = await getTranslations({ locale, namespace: "CourseDetail" })

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tCourse("home"), href: "/" },
          { label: tCourse("catalog"), href: "/browse" },
          { label: COURSE_TITLE, href: "/course/autocad-basico" },
          { label: CURRENT_LESSON_TITLE },
        ]}
      />

      <LessonMobileNav
        moduleTitle={MODULE_TITLE}
        progress={MODULE_PROGRESS}
        lessons={lessons}
        moduleProgressLabel={t("moduleProgress")}
      />

      <div className="flex gap-10">
        <aside
          aria-label={tA11y("lessonNavigation")}
          className="hidden w-64 shrink-0 lg:block"
        >
          <h2 className="text-sm font-semibold">{MODULE_TITLE}</h2>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t("moduleProgress")}</span>
              <span>{MODULE_PROGRESS}%</span>
            </div>
            <Progress
              value={MODULE_PROGRESS}
              aria-label={`${t("moduleProgress")}: ${MODULE_PROGRESS}%`}
              className="mt-1.5"
            />
          </div>

          <ul className="mt-6 space-y-1">
            {lessons.map((lesson, idx) => (
              <li key={idx}>
                <Link
                  href="/lesson/1"
                  aria-current={lesson.current ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                    lesson.current
                      ? "border-l-2 border-primary bg-accent font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle
                      className={`h-4 w-4 shrink-0 ${
                        lesson.current
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span className="line-clamp-1">{lesson.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="max-w-3xl flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {CURRENT_LESSON_TITLE}
          </h1>

          <button
            type="button"
            aria-label={t("playLesson")}
            className="group mt-6 flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl bg-zinc-900 transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <PlayCircle
              className="h-16 w-16 text-white/80 transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
          </button>

          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">
              Edición precisa de geometría en AutoCAD
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Las herramientas <strong className="text-foreground">Trim</strong>,{" "}
              <strong className="text-foreground">Extend</strong> y{" "}
              <strong className="text-foreground">Offset</strong> son fundamentales
              para editar planos arquitectónicos con precisión. Permiten cortar líneas
              hasta un borde de referencia, extender elementos hasta encontrar otro
              objeto, y crear copias paralelas a distancias específicas — procesos
              que usarás constantemente al trazar muros, particiones y detalles constructivos.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              En esta lección aplicarás estas tres herramientas sobre una planta
              arquitectónica residencial básica. Al finalizar, estarás en condiciones
              de limpiar y ajustar cualquier geometría de manera eficiente, reduciendo
              drásticamente el tiempo de producción de tus planos.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
            <Button variant="outline" asChild>
              <Link href="/lesson/1">{t("prevLesson")}</Link>
            </Button>
            <Button>{t("markCompleted")}</Button>
            <Button variant="outline" asChild>
              <Link href="/lesson/1">{t("nextLesson")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
