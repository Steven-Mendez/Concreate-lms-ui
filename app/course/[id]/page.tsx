import { CheckCircle2, Circle, Clock, BookOpen } from "lucide-react"
import Image from "next/image"

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

export default function CourseDetailPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <a href="/browse" className="hover:text-foreground transition-colors">
          Catálogo
        </a>
        <span className="mx-2">›</span>
        <span className="text-foreground">AutoCAD para Arquitectura</span>
      </nav>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Column (spans 2) */}
        <div className="lg:col-span-2">
          {/* Course thumbnail */}
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src="/assets/images/autocad-basico.png"
              alt="AutoCAD para Arquitectura"
              fill
              className="object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            AutoCAD para Arquitectura — Nivel Básico
          </h1>

          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <Badge className="bg-primary text-white hover:bg-primary/80">
              Básico
            </Badge>
            <Badge variant="outline">AutoCAD</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              10 horas
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              15 lecciones
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            Domina AutoCAD desde cero aplicado directamente a proyectos de arquitectura.
            Aprenderás a configurar el entorno profesional, trazar planos arquitectónicos
            completos, gestionar capas, aplicar cotas y anotaciones técnicas, y entregar
            documentación lista para construcción. Cada módulo incluye ejercicios prácticos
            basados en proyectos reales de arquitectura residencial y comercial.
          </p>

          {/* Instructor */}
          <Separator className="my-6" />
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                CM
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Ing. Carlos Medina</p>
              <p className="text-sm text-muted-foreground">
                Ingeniero Civil con 12 años en diseño y construcción
              </p>
            </div>
          </div>
          <Separator className="my-6" />

          {/* Course Modules Accordion */}
          <h2 className="mb-4 text-xl font-semibold">Contenido del Curso</h2>
          <Accordion type="multiple" defaultValue={["module-0", "module-1"]}>
            {modules.map((module, idx) => (
              <AccordionItem key={idx} value={`module-${idx}`}>
                <AccordionTrigger className="text-sm font-semibold">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {module.lessons.map((lesson, lessonIdx) => (
                      <li key={lessonIdx}>
                        <a
                          href="/lesson/1"
                          className="flex items-center justify-between rounded-md px-1 py-0.5 hover:bg-zinc-50 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
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
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Right Column (sticky sidebar card) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tu progreso
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    65%
                  </span>
                </div>
                <Progress value={65} className="mt-2" />
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/80"
                  asChild
                >
                  <a href="/lesson/1">Continuar Curso</a>
                </Button>

                <Separator />

                <div className="space-y-3">
                  {sidebarModules.map((mod, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {mod.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
