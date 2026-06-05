import { Accordion as BAccordion } from "@base-ui/react/accordion";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ className, ...props }: BAccordion.Root.Props) {
  return (
    <BAccordion.Root
      className={cn("flex flex-col justify-center text-foreground", className)}
      {...props}
    />
  );
}

export function AccordionItem({ className, ...props }: BAccordion.Item.Props) {
  return (
    <BAccordion.Item
      className={cn("border-border border-b", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  header = true,
  children,
  ...props
}: BAccordion.Trigger.Props & { header?: boolean }) {
  if (header)
    return (
      <BAccordion.Header>
        <BAccordion.Trigger
          className={cn(
            "group relative flex w-full items-baseline justify-between gap-4 bg-card py-2 pr-1 pl-3 text-left font-medium hover:bg-card/90 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-secondary",
            className,
          )}
          {...props}
        >
          {children}
          <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:rotate-45 group-data-[panel-open]:scale-110" />
        </BAccordion.Trigger>
      </BAccordion.Header>
    );

  return (
    <BAccordion.Trigger
      className={cn(
        "group relative flex w-full items-baseline justify-between gap-4 bg-card py-2 pr-1 pl-3 text-left font-medium hover:bg-card/90 focus-visible:z-1 focus-visible:outline-2 focus-visible:outline-secondary",
        className,
      )}
      {...props}
    >
      {children}
      <PlusIcon className="mr-2 size-3 shrink-0 transition-all ease-out group-data-[panel-open]:rotate-45 group-data-[panel-open]:scale-110" />
    </BAccordion.Trigger>
  );
}

export function AccordionPanel({
  className,
  ...props
}: BAccordion.Panel.Props) {
  return (
    <BAccordion.Panel
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-base text-foreground transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
        className,
      )}
      {...props}
    />
  );
}
