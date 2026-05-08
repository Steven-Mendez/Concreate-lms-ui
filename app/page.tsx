import Image from "next/image"
import { ArrowRight, CheckCircle2, PlayCircle, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Aprende Creando
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Domina AutoCAD, Revit y Rhino
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Plataforma educativa diseñada para estudiantes de arquitectura e ingeniería civil.
            Cursos estructurados por niveles, tutoriales paso a paso y proyectos reales que
            te llevan desde cero hasta una entrega profesional.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/browse"
              className="flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5"
            >
              Explorar cursos
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/dashboard"
              className="flex items-center gap-2 rounded-md border-2 border-zinc-200 px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-zinc-50 hover:border-zinc-300"
            >
              Mi aprendizaje
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl border border-zinc-100">
          <Image 
            src="/images/hero_student_architecture_1778200507820.png"
            alt="Estudiante de arquitectura trabajando"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground">Habilidades esenciales para tu carrera</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Concreate te ayuda a dominar el software técnico más demandado en la industria para avanzar en tu trayectoria profesional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-xl bg-zinc-50">
                <Image 
                  src="/images/category_autocad_icon_1778200530375.png"
                  alt="AutoCAD"
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground">AutoCAD Profesional</h3>
              <p className="mt-2 text-sm text-muted-foreground">Planos, detalles constructivos y documentación 2D.</p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                Ver cursos <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-xl bg-zinc-50">
                <Image 
                  src="/images/category_revit_icon_1778200552278.png"
                  alt="Revit BIM"
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground">Revit & BIM</h3>
              <p className="mt-2 text-sm text-muted-foreground">Modelado 3D inteligente, cómputos y trabajo colaborativo.</p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                Ver cursos <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative aspect-square w-full mb-6 overflow-hidden rounded-xl bg-zinc-50">
                <Image 
                  src="/images/category_rhino_icon_1778200564493.png"
                  alt="Rhinoceros"
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground">Rhino & Grasshopper</h3>
              <p className="mt-2 text-sm text-muted-foreground">Diseño paramétrico y geometrías complejas.</p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">
                Ver cursos <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Premium / Dark Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Reinventa tu forma de proyectar
            </h2>
            <p className="mt-6 text-lg text-slate-300">
              Obtén acceso ilimitado a nuestra biblioteca de proyectos reales. Aprende con metodologías probadas por expertos en arquitectura e ingeniería.
            </p>
            
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Proyectos reales desde cero</h4>
                  <p className="text-sm text-slate-400 mt-1">Practica con planos y modelos de edificios construidos.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <PlayCircle className="h-6 w-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Clases paso a paso</h4>
                  <p className="text-sm text-slate-400 mt-1">Sin saltos mágicos. Entiende el "por qué" de cada herramienta.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Star className="h-6 w-6 text-blue-400 shrink-0" />
                <div>
                  <h4 className="font-semibold text-white">Certificación profesional</h4>
                  <p className="text-sm text-slate-400 mt-1">Valida tus conocimientos al completar cada especialización.</p>
                </div>
              </div>
            </div>

            <button className="mt-10 rounded-md bg-white px-8 py-4 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-100">
              Conoce los planes
            </button>
          </div>
          
          {/* Decorative element for the dark section */}
          <div className="relative aspect-square w-full rounded-2xl bg-slate-800 border border-white/10 overflow-hidden shadow-2xl">
            <Image 
              src="/images/premium_abstract_render_1778200771349.png"
              alt="Concreate PRO Abstract Render"
              fill
              className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 shadow-xl inline-block w-full">
                 <h3 className="text-2xl font-bold text-white mb-1">Concreate PRO</h3>
                 <p className="text-slate-300 text-sm">Tu carrera, sin límites.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">Únete a otros profesionales transformando su vida</h2>
            <p className="mt-4 text-lg text-muted-foreground">Más de 5,000 estudiantes ya están diseñando el futuro.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "El curso de Revit BIM me ahorró meses de errores en la oficina. Aprender con un proyecto real de un edificio de 4 pisos hizo que todo tuviera sentido inmediatamente.",
                author: "Martina S.",
                role: "Arquitecta Junior",
                course: "Revit Avanzado: De 0 a BIM",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
              },
              {
                quote: "Concreate me dio las herramientas exactas que necesitaba para mi portfolio. Pasar de hacer planos básicos en AutoCAD a dominar Rhino me abrió las puertas a mi nuevo estudio.",
                author: "Julián D.",
                role: "Estudiante de Diseño",
                course: "Diseño Paramétrico en Rhino",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
              },
              {
                quote: "Lo que más valoro es que no solo te enseñan a usar la herramienta, sino que te enseñan a pensar como un profesional. Las buenas prácticas de AutoCAD me salvaron la vida.",
                author: "Carla T.",
                role: "Ingeniera Civil",
                course: "AutoCAD para Documentación",
                avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
            ].map((testimonial, i) => (
              <div key={i} className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div>
                  <svg className="h-8 w-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                  <p className="text-slate-700 leading-relaxed">"{testimonial.quote}"</p>
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-100">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/10">
                      <Image src={testimonial.avatar} alt={testimonial.author} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <a href="#" className="mt-4 inline-block text-xs font-semibold text-primary hover:underline">
                    Ver curso: {testimonial.course}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
