import { NavigationMenu as BNavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavigationMenu({
  children,
  ...props
}: BNavigationMenu.Root.Props) {
  return (
    <BNavigationMenu.Root {...props}>
      {children}
      <BNavigationMenu.Portal>
        <BNavigationMenu.Positioner
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
          className="box-border h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] data-[instant]:transition-none data-[side=bottom]:before:top-[-10px] data-[side=left]:before:top-0 data-[side=right]:before:top-0 data-[side=bottom]:before:right-0 data-[side=left]:before:right-[-10px] data-[side=top]:before:right-0 data-[side=left]:before:bottom-0 data-[side=right]:before:bottom-0 data-[side=top]:before:bottom-[-10px] data-[side=bottom]:before:left-0 data-[side=right]:before:left-[-10px] data-[side=top]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=top]:before:h-2.5 data-[side=left]:before:w-2.5 data-[side=right]:before:w-2.5"
          style={{
            ["--duration" as string]: "0.35s",
            ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <BNavigationMenu.Popup className="data-[ending-style]:easing-[ease] dark:-outline-offset-1 relative h-[var(--popup-height)] w-[var(--popup-width)] xs:w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-lg bg-[canvas] text-gray-900 shadow-gray-200 shadow-lg outline outline-1 outline-gray-200 transition-[opacity,transform,width,height,scale,translate] duration-[var(--duration)] ease-[var(--easing)] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-150 dark:shadow-none dark:outline-gray-300">
            <BNavigationMenu.Arrow className="data-[side=right]:-rotate-90 flex transition-[left] duration-[var(--duration)] ease-[var(--easing)] data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=top]:rotate-180">
              <ArrowSvg />
            </BNavigationMenu.Arrow>
            <BNavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
          </BNavigationMenu.Popup>
        </BNavigationMenu.Positioner>
      </BNavigationMenu.Portal>
    </BNavigationMenu.Root>
  );
}

export function NavigationMenuList(props: BNavigationMenu.List.Props) {
  return <BNavigationMenu.List {...props} />;
}

export function NavigationMenuTrigger({
  children,
  className,
  ...props
}: BNavigationMenu.Trigger.Props) {
  return (
    <BNavigationMenu.Trigger
      className={cn(triggerClassName, className)}
      {...props}
    >
      {children}
      <BNavigationMenu.Icon className="transition-transform duration-200 ease-in-out data-[popup-open]:rotate-180">
        <ChevronDownIcon />
      </BNavigationMenu.Icon>
    </BNavigationMenu.Trigger>
  );
}

export function NavigationMenuItem(props: BNavigationMenu.Item.Props) {
  return <BNavigationMenu.Item {...props} />;
}

export function NavigationMenuContent({
  className,
  ...props
}: BNavigationMenu.Content.Props) {
  return (
    <BNavigationMenu.Content
      className={cn(contentClassName, className)}
      {...props}
    />
  );
}

const triggerClassName = `box-border flex items-center justify-center gap-1.5 h-10 px-2 xs:px-3.5 m-0 rounded-md bg-gray-50 text-gray-900 font-medium text-[0.925rem] xs:text-base leading-6 select-none no-underline hover:bg-gray-100 active:bg-gray-100 data-[popup-open]:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 focus-visible:relative`;

const contentClassName = `w-[calc(100vw_-_40px)] h-full p-6 xs:w-max xs:min-w-[400px] xs:w-max transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 data-[starting-style]:data-[activation-direction=left]:translate-x-[-50%] data-[starting-style]:data-[activation-direction=right]:translate-x-[50%] data-[ending-style]:data-[activation-direction=left]:translate-x-[50%] data-[ending-style]:data-[activation-direction=right]:translate-x-[-50%]`;

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-background"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-border dark:fill-none"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="dark:fill-border"
      />
    </svg>
  );
}
