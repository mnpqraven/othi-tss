import { Tabs as BTabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

export function Tabs({ className, ...props }: BTabs.Root.Props) {
  return (
    <BTabs.Root
      className={cn("rounded-md border border-border", className)}
      {...props}
    />
  );
}

export function TabsList({ className, children, ...props }: BTabs.List.Props) {
  return (
    <BTabs.List
      className={cn(
        "relative z-0 flex gap-1 px-1 shadow-[inset_0_-1px] shadow-border",
        className,
      )}
      {...props}
    >
      {children}
      <BTabs.Indicator className="-translate-y-1/2 absolute top-1/2 left-0 z-[-1] h-6 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] rounded-sm bg-primary transition-all duration-200 ease-in-out" />
    </BTabs.List>
  );
}

export function TabsTrigger({ className, ...props }: BTabs.Tab.Props) {
  return (
    <BTabs.Tab
      className={cn(
        "before:-outline-offset-1 flex h-8 select-none items-center justify-center whitespace-nowrap break-keep border-0 px-2 font-medium text-primary text-sm outline-none before:inset-x-0 before:inset-y-1 before:rounded-sm before:outline-border hover:text-primary/90 focus-visible:relative focus-visible:before:absolute focus-visible:before:outline-2 data-[active]:text-primary-foreground/90",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: BTabs.Panel.Props) {
  return (
    <BTabs.Panel
      className={cn(
        "-outline-offset-1 relative flex items-center justify-center outline-border focus-visible:rounded-md focus-visible:outline-2",
        className,
      )}
      {...props}
    />
  );
}
