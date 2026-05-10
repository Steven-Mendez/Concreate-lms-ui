import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Concreate"

const COPY: Record<string, { title: string; subtitle: string }> = {
  es: {
    title: "Domina AutoCAD, Revit y Rhino",
    subtitle:
      "Cursos estructurados para estudiantes de arquitectura e ingeniería civil.",
  },
  en: {
    title: "Master AutoCAD, Revit, and Rhino",
    subtitle:
      "Structured courses for architecture and civil engineering students.",
  },
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const copy = COPY[locale] ?? COPY.es

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #1D3461 0%, #0f1f3d 60%, #050a18 100%)",
          color: "#ffffff",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Concreate
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {copy.title}
          </div>
          <div style={{ fontSize: 32, opacity: 0.85, maxWidth: 900 }}>
            {copy.subtitle}
          </div>
        </div>
      </div>
    ),
    size
  )
}
