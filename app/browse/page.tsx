import { Filter } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

const levelColors: Record<string, string> = {
  Básico: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermedio: "bg-amber-50 text-amber-700 border-amber-200",
  Avanzado: "bg-red-50 text-red-700 border-red-200",
}

export default function BrowsePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Catálogo de Cursos</h1>
        <p className="mt-2 text-muted-foreground">
          Cursos estructurados de AutoCAD, Revit y Rhino para arquitectura e ingeniería civil.
        </p>
      </div>

      {/* Filter Row */}
      <div className="mb-8 flex items-center justify-between">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>

        <Select defaultValue="popular">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Más populares</SelectItem>
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="level-asc">Nivel: Básico primero</SelectItem>
            <SelectItem value="level-desc">Nivel: Avanzado primero</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card
            key={course.title}
            className="group overflow-hidden transition-shadow hover:shadow-lg"
          >
            {/* Thumbnail */}
            <a href="/course/1">
              <div className="relative aspect-video bg-muted overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </a>

            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="w-fit text-xs">
                  {course.category}
                </Badge>
                <Badge variant="outline" className={`w-fit text-xs ${levelColors[course.level]}`}>
                  {course.level}
                </Badge>
              </div>
              <a href="/course/1" className="hover:underline">
                <h3 className="mt-2 text-base font-semibold leading-tight">
                  {course.title}
                </h3>
              </a>
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
                <span className="text-sm text-muted-foreground">
                  {course.instructor}
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t pt-4">
              <span className="text-sm text-muted-foreground">
                {course.lessons} lecciones
              </span>
              <Button
                size="sm"
                className="bg-primary text-white hover:bg-primary/80"
                asChild
              >
                <a href="/course/1">Inscribirse</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
