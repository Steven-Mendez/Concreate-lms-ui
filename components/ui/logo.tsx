import * as React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("h-10 w-auto", className)}
      {...props}
    >
      {/* Outer C-Shape (Camera Body) */}
      <path
        d="M 75 35.5 L 50 21 L 25 35.5 L 25 64.5 L 50 79 L 75 64.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        className="text-primary"
      />
      
      {/* Camera Lens */}
      <polygon
        points="84,41 96,33 96,67 84,59"
        fill="currentColor"
        className="text-primary"
      />

      {/* Inner Isometric Cube */}
      <g>
        {/* Top Face - Lightest */}
        <polygon
          points="46,50 34,43 46,36 58,43"
          className="fill-blue-300"
        />
        {/* Right Face - Medium */}
        <polygon
          points="46,50 58,43 58,57 46,64"
          className="fill-blue-400"
        />
        {/* Left Face - Darkest */}
        <polygon
          points="46,50 34,43 34,57 46,64"
          className="fill-blue-600"
        />
      </g>
    </svg>
  )
}
