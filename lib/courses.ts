export type CourseLevel = "Básico" | "Intermedio" | "Avanzado"
export type CourseCategory = "AutoCAD" | "Revit" | "Rhino"

export interface Course {
  id: string
  title: string
  description: string
  category: CourseCategory
  instructor: string
  initials: string
  lessons: number
  level: CourseLevel
  image: string
}

export const COURSES: Course[] = [
  {
    id: "autocad-basico",
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
    id: "autocad-avanzado",
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
    id: "revit-bim",
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
    id: "revit-mep",
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
    id: "rhino-3d",
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
    id: "rhino-grasshopper",
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

export const CATEGORIES = ["All", "AutoCAD", "Revit", "Rhino"] as const

export const LEVEL_ORDER: Record<CourseLevel, number> = {
  Básico: 1,
  Intermedio: 2,
  Avanzado: 3,
}

export function getAllCourses(): Course[] {
  return COURSES
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}
