import { Skeleton } from "@/components/ui/skeleton"

export default function LessonLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Skeleton className="mb-6 h-4 w-72" />
      <div className="flex gap-10">
        <aside className="hidden w-64 shrink-0 space-y-3 lg:block">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-2 w-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </aside>
        <div className="flex-1 max-w-3xl space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}
