import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Concreate — Aprende Creando",
  description:
    "Plataforma educativa de AutoCAD, Revit y Rhino para estudiantes de arquitectura e ingeniería civil.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} antialiased`}>
      <body className="bg-white font-sans text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
