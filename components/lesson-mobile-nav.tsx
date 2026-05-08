"use client"

import { useState } from "react"
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

type Lesson = {
  title: string
  completed: boolean
  current: boolean
}

export function LessonMobileNav({
  moduleTitle,
  progress,
  lessons,
  moduleProgressLabel,
}: {
  moduleTitle: string
  progress: number
  lessons: Lesson[]
  moduleProgressLabel: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-6 rounded-xl border border-border bg-card lg:hidden">
      <Button
        variant="ghost"
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{moduleTitle}</span>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{moduleProgressLabel}</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="mt-1.5" />

          <ul className="mt-4 space-y-1">
            {lessons.map((lesson, idx) => (
              <li key={idx}>
                <Link
                  href="/lesson/1"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    lesson.current
                      ? "border-l-2 border-primary bg-accent font-semibold text-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <Circle
                      className={`h-4 w-4 shrink-0 ${
                        lesson.current ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  )}
                  <span className="line-clamp-1">{lesson.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
