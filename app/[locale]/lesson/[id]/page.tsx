import { CheckCircle2, Circle, PlayCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LessonMobileNav } from "@/components/lesson-mobile-nav"

const lessons = [
  { title: "Líneas, polilíneas y rectángulos", completed: true, current: false },
  { title: "Arcos, círculos y elipses", completed: true, current: false },
  { title: "Trim, Extend y Offset", completed: false, current: true },
  { title: "Mirror, Array y Rotate", completed: false, current: false },
]

export default function LessonPage() {
  const t = useTranslations("Lesson")

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        <Link href="/course/1" className="transition-colors hover:text-foreground">
          AutoCAD para Arquitectura
        </Link>
        <span>›</span>
        <Link href="/course/1" className="transition-colors hover:text-foreground">
          Módulo 2: Herramientas de Dibujo
        </Link>
        <span>›</span>
        <span className="text-foreground">Lección 3</span>
      </nav>

      {/* Mobile lesson navigation (lg and up uses the sidebar) */}
      <LessonMobileNav
        moduleTitle="Módulo 2: Herramientas de Dibujo"
        progress={50}
        lessons={lessons}
        moduleProgressLabel={t("moduleProgress")}
      />

      {/* Two-Column Layout */}
      <div className="flex gap-10">
        {/* Left Panel — Lesson Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <h2 className="text-sm font-semibold">Módulo 2: Herramientas de Dibujo</h2>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{t("moduleProgress")}</span>
              <span>50%</span>
            </div>
            <Progress value={50} className="mt-1.5" />
          </div>

          <ul className="mt-6 space-y-1">
            {lessons.map((lesson, idx) => (
              <li key={idx}>
                <Link
                  href="/lesson/1"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    lesson.current
                      ? "border-l-2 border-primary bg-accent font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <Circle
                      className={`h-4 w-4 shrink-0 ${
                        lesson.current
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  )}
                  <span className="line-clamp-1">{lesson.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Main Content */}
        <div className="max-w-3xl flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Herramientas de edición: Trim, Extend y Offset
          </h1>

          {/* Video Placeholder */}
          <div className="mt-6 flex aspect-video items-center justify-center rounded-xl bg-zinc-900">
            <PlayCircle className="h-16 w-16 text-white/80" />
          </div>

          {/* Rich Text Content */}
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

          {/* Navigation */}
          <div className="mt-8 border-t pt-6 flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" asChild>
              <Link href="/lesson/1">{t("prevLesson")}</Link>
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/80">
              {t("markCompleted")}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/lesson/1">{t("nextLesson")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
