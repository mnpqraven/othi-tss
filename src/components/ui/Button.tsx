import { Button as BButton } from "@base-ui-components/react/button";
import type { ComponentPropsWithRef } from "react";
import type { VariantProps } from "tailwind-variants";
import { tv } from "@/lib/utils";

const buttonVariants = tv({
  base: "focus-visible:-outline-offset-1 box-border flex h-10 select-none items-center justify-center gap-1.5 rounded-md px-3.5 py-0 font-medium outline-0 hover:cursor-pointer hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-border disabled:cursor-default [&>svg]:size-4",
  variants: {
    variant: {
      default:
        "bg-primary text-primary-foreground active:bg-primary/90 disabled:bg-primary/40 disabled:text-primary-foreground/80",
      outline:
        "border bg-background text-foreground active:bg-background/90 disabled:bg-background/40 disabled:text-foreground/80",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Button({
  className,
  variant,
  ...props
}: ComponentPropsWithRef<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <BButton
      type="button"
      className={buttonVariants({ variant, className })}
      {...props}
    />
  );
}
