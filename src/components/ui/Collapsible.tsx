import { Collapsible as BCollapsible } from "@base-ui/react/collapsible";
import { ChevronRight, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export function Collapsible({
  children,
  className,
  ...props
}: BCollapsible.Root.Props) {
  return (
    <BCollapsible.Root
      className={cn(
        "flex flex-col justify-center text-secondary-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </BCollapsible.Root>
  );
}

export function CollapsibleTrigger({
  className,
  children,
  ...props
}: BCollapsible.Trigger.Props) {
  return (
    <BCollapsible.Trigger
      className={cn(
        "group flex items-center gap-2 rounded-xl bg-secondary p-2 font-medium text-sm hover:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-border active:bg-secondary/90",
        className,
      )}
      {...props}
    >
      {children}
    </BCollapsible.Trigger>
  );
}

export function CollapsibleIcon({ className, ...props }: LucideProps) {
  return (
    <ChevronRight
      className={cn(
        "size-3 transition-all ease-out group-data-[panel-open]:rotate-90",
        className,
      )}
      {...props}
    />
  );
}

export function CollapsibleContent({
  className,
  children,
  ...props
}: BCollapsible.Panel.Props) {
  return (
    <BCollapsible.Panel
      className={cn(
        "flex h-[var(--collapsible-panel-height)] flex-col justify-end overflow-hidden p-2 text-sm transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        className,
      )}
      {...props}
    >
      {children}
    </BCollapsible.Panel>
  );
}
