import { Select as BSelect } from "@base-ui/react/select";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select<T>(props: BSelect.Root.Props<T, false>) {
  return <BSelect.Root<T, false> {...props} />;
}

export function SelectTrigger({ className, ...props }: BSelect.Trigger.Props) {
  return (
    <BSelect.Trigger
      className={cn(
        "focus-visible:-outline-offset-1 flex h-10 min-w-36 cursor-default select-none items-center justify-between gap-3 rounded-md border border-border pr-3 pl-3.5 text-base text-foreground hover:bg-accent/40 focus-visible:outline-2 focus-visible:outline-blue-800 data-[popup-open]:bg-gray-100",
        className,
      )}
      {...props}
    >
      <BSelect.Value />
      <BSelect.Icon className="flex">
        <ChevronsUpDownIcon />
      </BSelect.Icon>
    </BSelect.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: BSelect.Popup.Props) {
  return (
    <BSelect.Portal>
      <BSelect.Positioner
        className="z-10 select-none outline-none"
        sideOffset={8}
      >
        <BSelect.Popup
          className={cn(
            "group origin-[var(--transform-origin)] rounded-md bg-card bg-clip-padding text-card-foreground shadow-gray-200 shadow-lg outline outline-border transition-[transform,scale,opacity] data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[ending-style]:transition-none data-[side=none]:data-[starting-style]:transition-none data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none",
            className,
          )}
          {...props}
        >
          <BSelect.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-card text-center text-card-foreground text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:top-[-100%]" />
          <BSelect.List className="relative max-h-[var(--available-height)] scroll-py-6 overflow-y-auto py-1">
            {children}
          </BSelect.List>
          <BSelect.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-card text-center text-card-foreground text-xs before:absolute before:left-0 before:h-full before:w-full before:content-[''] data-[side=none]:before:bottom-[-100%]" />
        </BSelect.Popup>
      </BSelect.Positioner>
    </BSelect.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: BSelect.Item.Props) {
  return (
    <BSelect.Item
      className={cn(
        "grid min-w-[var(--anchor-width)] cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 pointer-coarse:py-2.5 py-2 pr-4 pl-2.5 pointer-coarse:text-[0.925rem] text-sm leading-4 outline-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-card data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-card-foreground group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4",
        className,
      )}
      {...props}
    >
      <BSelect.ItemIndicator className="col-start-1">
        <CheckIcon className="size-3" />
      </BSelect.ItemIndicator>
      <BSelect.ItemText className="col-start-2">{children}</BSelect.ItemText>
    </BSelect.Item>
  );
}
