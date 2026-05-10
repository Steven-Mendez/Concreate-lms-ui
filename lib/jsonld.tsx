import { SITE_NAME, SITE_URL, absoluteUrl } from "./site"
import type { Course } from "./courses"

type JsonLdObject = Record<string, unknown>

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [],
  }
}

export function websiteJsonLd(locale: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl(locale),
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl(locale, "/browse")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function courseJsonLd(course: Course, locale: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    inLanguage: locale,
    educationalLevel: course.level,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    url: absoluteUrl(locale, `/course/${course.id}`),
    image: `${SITE_URL}${course.image}`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      inLanguage: locale,
    },
    instructor: {
      "@type": "Person",
      name: course.instructor,
    },
    numberOfLessons: course.lessons,
  }
}

export function breadcrumbJsonLd(
  items: { label: string; url: string }[]
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: item.url,
    })),
  }
}

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
