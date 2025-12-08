import { ScrollArea as BScrollArea } from "@base-ui-components/react/scroll-area";
import { cn } from "@/lib/utils";

export function ScrollArea({
  children,
  className,
  ...props
}: BScrollArea.Root.Props) {
  return (
    <BScrollArea.Root
      className={cn("max-w-[calc(100vw-8rem)]", className)}
      {...props}
    >
      <BScrollArea.Viewport
        className={
          "-outline-offset-1 max-h-[inherit] overscroll-contain rounded-md pr-2.5 outline-1 outline-transparent focus-visible:outline-2 focus-visible:outline-primary"
        }
      >
        {children}
      </BScrollArea.Viewport>
      <BScrollArea.Scrollbar className="pointer-events-none my-2 mr-1 flex w-1 justify-center rounded bg-secondary/20 opacity-0 transition-opacity delay-300 data-[hovering]:pointer-events-auto data-[scrolling]:pointer-events-auto data-[hovering]:opacity-100 data-[scrolling]:opacity-100 data-[hovering]:delay-0 data-[scrolling]:delay-0 data-[hovering]:duration-75 data-[scrolling]:duration-75">
        <BScrollArea.Thumb className="w-full rounded bg-secondary" />
      </BScrollArea.Scrollbar>
    </BScrollArea.Root>
  );
}
