import { NumberField } from "@base-ui-components/react/number-field";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./Input";
import { Label } from "./Label";

export function NumberInputShell({
  children,
  renderLabel,
  disabled,
  ...props
}: NumberField.Root.Props & { renderLabel?: ReactNode }) {
  // TODO: un-mess + root struct
  return (
    <NumberField.Root className="flex flex-col items-start gap-1" {...props}>
      {renderLabel}
      <NumberField.Group className="flex">
        <NumberField.Decrement
          className="flex size-10 select-none items-center justify-center rounded-tl-md rounded-bl-md border bg-clip-padding text-primary not-disabled:hover:bg-primary/20 active:bg-primary"
          disabled={disabled}
        >
          <MinusIcon />
        </NumberField.Decrement>
        {children}
        <NumberField.Increment
          className="flex size-10 select-none items-center justify-center rounded-tr-md rounded-br-md border bg-clip-padding text-primary not-disabled:hover:bg-primary/20 active:bg-primary"
          disabled={disabled}
        >
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

export function NumberInput(props: NumberField.Input.Props) {
  return (
    <NumberField.Input render={<Input className="rounded-none" />} {...props} />
  );
}

export function NumberInputLabel({
  className,
  ...props
}: ComponentPropsWithRef<typeof Label>) {
  return (
    <NumberField.ScrubArea className="cursor-ew-resize">
      <Label className={cn("cursor-ew-resize", className)} {...props} />
      <NumberField.ScrubAreaCursor>
        <CursorGrowIcon />
      </NumberField.ScrubAreaCursor>
    </NumberField.ScrubArea>
  );
}

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}
