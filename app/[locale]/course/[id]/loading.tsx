import { Skeleton } from "@/components/ui/skeleton"

export default function CourseLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Skeleton className="mb-6 h-4 w-64" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="order-2 lg:order-1 lg:col-span-2">
          <Skeleton className="mb-6 aspect-video w-full rounded-xl" />
          <Skeleton className="h-9 w-3/4" />
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-md" />
          </div>
          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="mt-8 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="sticky top-24 space-y-4 rounded-xl border border-border bg-card p-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-9 w-full" />
            <div className="space-y-3 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
