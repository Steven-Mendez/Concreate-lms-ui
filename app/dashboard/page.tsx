import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const inProgressCourses = [
  {
    title: "AutoCAD para Arquitectura — Nivel Básico",
    category: "AutoCAD",
    module: "Módulo 4 de 8 — Anotaciones y Cotas",
    progress: 60,
    image: "/assets/images/autocad-basico.png",
  },
  {
    title: "Revit: BIM para Arquitectura",
    category: "Revit",
    module: "Módulo 3 de 10 — Familias y Componentes",
    progress: 30,
    image: "/assets/images/revit-bim.png",
  },
  {
    title: "Rhino 3D — Modelado para Arquitectura",
    category: "Rhino",
    module: "Módulo 1 de 7 — Interfaz y Curvas NURBS",
    progress: 5,
    image: "/assets/images/rhino-3d.png",
  },
]

const completedCourses = [
  {
    title: "AutoCAD Avanzado — Planos Técnicos",
    category: "AutoCAD",
    module: "Completado",
    progress: 100,
    image: "/assets/images/autocad-avanzado.png",
  },
  {
    title: "Revit MEP — Coordinación BIM",
    category: "Revit",
    module: "Completado",
    progress: 100,
    image: "/assets/images/revit-mep.png",
  },
]

function CourseCard({
  course,
}: {
  course: {
    title: string
    category: string
    module: string
    progress: number
    image: string
  }
}) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
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
        <Badge variant="outline" className="w-fit text-xs">
          {course.category}
        </Badge>
        <a href="/course/1" className="hover:underline">
          <h3 className="mt-2 text-base font-semibold">{course.title}</h3>
        </a>
        <p className="text-sm text-muted-foreground">{course.module}</p>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>Progreso</span>
          <span>{course.progress}%</span>
        </div>
        <Progress value={course.progress} />
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button
          className="w-full bg-primary text-white hover:bg-primary/80"
          asChild
        >
          <a href="/lesson/1">
            {course.progress === 100 ? "Repasar Curso" : "Continuar"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function StudentDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mi Aprendizaje</h1>
        <p className="mt-1 text-muted-foreground">
          Continuá desde donde lo dejaste
        </p>
      </div>

      <Tabs defaultValue="in-progress">
        <TabsList>
          <TabsTrigger value="in-progress">En Progreso</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inProgressCourses.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
