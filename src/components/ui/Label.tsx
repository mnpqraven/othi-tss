import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: ComponentPropsWithRef<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: library code
    <label
      className={cn("font-medium text-primary text-sm leading-5", className)}
      {...props}
    />
  );
}
