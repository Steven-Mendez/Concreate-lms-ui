import type { MetadataRoute } from "next"

import { SITE_NAME } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Aprende Creando`,
    short_name: SITE_NAME,
    description:
      "Plataforma educativa de AutoCAD, Revit y Rhino para estudiantes de arquitectura e ingeniería civil.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1D3461",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
