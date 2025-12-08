import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: ComponentPropsWithRef<"textarea">) {
  return (
    <textarea
      className={cn(
        "focus:-outline-offset-1 block rounded-md border border-border py-1 pl-1.5 text-base text-primary focus:outline-2 focus:outline-primary",
        className,
      )}
      {...props}
    />
  );
}
