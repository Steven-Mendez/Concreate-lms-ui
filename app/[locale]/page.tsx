import Image from "next/image"
import { ArrowRight, CheckCircle2, PlayCircle, Star } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/jsonld"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "Home" })

  return (
    <div className="flex flex-col">
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale)]} />

      {/* 1. Hero Section */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            {t("heroTagline")}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("heroDescription")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-10">
            <Link
              href="/browse"
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:px-8 md:py-4"
            >
              {t("exploreCourses")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-md border-2 border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:px-8 md:py-4"
            >
              {t("myLearning")}
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-2xl">
          <Image
            src="/images/hero_student_architecture_1778200507820.png"
            alt="Estudiante de arquitectura trabajando con planos en AutoCAD"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            fetchPriority="high"
            className="object-cover"
          />
        </div>
      </section>

      {/* 2. Categories Section */}
      <section
        aria-labelledby="categories-heading"
        className="bg-muted py-12 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <h2
              id="categories-heading"
              className="text-3xl font-bold text-foreground"
            >
              {t("categoriesTitle")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("categoriesDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: t("autocadTitle"),
                desc: t("autocadDesc"),
                src: "/images/category_autocad_icon_1778200530375.png",
                alt: "AutoCAD",
              },
              {
                title: t("revitTitle"),
                desc: t("revitDesc"),
                src: "/images/category_revit_icon_1778200552278.png",
                alt: "Revit BIM",
              },
              {
                title: t("rhinoTitle"),
                desc: t("rhinoDesc"),
                src: "/images/category_rhino_icon_1778200564493.png",
                alt: "Rhinoceros",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href="/browse"
                className="group cursor-pointer rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {card.desc}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  {t("viewCourses")}
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Premium / Dark Section */}
      <section
        aria-labelledby="premium-heading"
        className="bg-premium py-12 text-premium-foreground md:py-24"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <h2
              id="premium-heading"
              className="text-2xl font-bold leading-tight md:text-4xl"
            >
              {t("premiumTitle")}
            </h2>
            <p className="mt-6 text-lg opacity-80">{t("premiumDescription")}</p>

            <ul className="mt-10 space-y-6">
              {[
                {
                  Icon: CheckCircle2,
                  title: t("feature1Title"),
                  desc: t("feature1Desc"),
                },
                {
                  Icon: PlayCircle,
                  title: t("feature2Title"),
                  desc: t("feature2Desc"),
                },
                {
                  Icon: Star,
                  title: t("feature3Title"),
                  desc: t("feature3Desc"),
                },
              ].map(({ Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <Icon
                    className="h-6 w-6 shrink-0 text-premium-icon"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-premium-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm opacity-70">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="mt-10 rounded-md bg-premium-button px-8 py-4 text-sm font-bold text-premium-button-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-premium"
            >
              {t("viewPlans")}
            </button>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-premium-icon/20 bg-premium-muted shadow-2xl md:aspect-square">
            <Image
              src="/images/premium_abstract_render_1778200771349.png"
              alt="Render abstracto Concreate PRO"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-premium/90 via-premium/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="inline-block w-full rounded-xl border border-white/20 bg-white/10 px-6 py-4 shadow-xl backdrop-blur-md">
                <p className="mb-1 text-2xl font-bold text-white">
                  Concreate PRO
                </p>
                <p className="text-sm text-slate-300">{t("proSubtitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section
        aria-labelledby="testimonials-heading"
        className="bg-background py-12 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center md:mb-16">
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold text-foreground"
            >
              {t("testimonialsTitle")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("testimonialsDescription")}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "El curso de Revit BIM me ahorró meses de errores en la oficina. Aprender con un proyecto real de un edificio de 4 pisos hizo que todo tuviera sentido inmediatamente.",
                author: "Martina S.",
                role: "Arquitecta Junior",
                course: "Revit Avanzado: De 0 a BIM",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              },
              {
                quote:
                  "Concreate me dio las herramientas exactas que necesitaba para mi portfolio. Pasar de hacer planos básicos en AutoCAD a dominar Rhino me abrió las puertas a mi nuevo estudio.",
                author: "Julián D.",
                role: "Estudiante de Diseño",
                course: "Diseño Paramétrico en Rhino",
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
              },
              {
                quote:
                  "Lo que más valoro es que no solo te enseñan a usar la herramienta, sino que te enseñan a pensar como un profesional. Las buenas prácticas de AutoCAD me salvaron la vida.",
                author: "Carla T.",
                role: "Ingeniera Civil",
                course: "AutoCAD para Documentación",
                avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
              },
            ].map((testimonial) => (
              <li key={testimonial.author}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
                  <div>
                    <svg
                      className="mb-4 h-8 w-8 text-primary/20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                    <blockquote className="leading-relaxed text-muted-foreground">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-8 border-t border-border pt-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10">
                        <Image
                          src={testimonial.avatar}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/course/autocad-basico"
                      className="mt-4 inline-block rounded-sm text-xs font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      {t("viewCourse")} {testimonial.course}
                    </Link>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
