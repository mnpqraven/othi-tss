import { Dialog as BDialog } from "@base-ui-components/react/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export function Dialog({ ...props }: BDialog.Root.Props) {
  return <BDialog.Root {...props} />;
}

export function DialogTitle({ className, ...props }: BDialog.Title.Props) {
  return (
    <BDialog.Title
      className={cn("-mt-1.5 mb-1 font-semibold text-lg", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: BDialog.Description.Props) {
  return (
    <BDialog.Description
      className={cn("mb-6 text-base", className)}
      {...props}
    />
  );
}

export function DialogTrigger({ ...props }: BDialog.Trigger.Props) {
  return <BDialog.Trigger render={<Button />} {...props} />;
}

export function DialogContent({
  className,
  children,
  ...props
}: BDialog.Popup.Props) {
  return (
    <BDialog.Portal>
      <BDialog.Backdrop className="fixed inset-0 min-h-dvh bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:opacity-70" />
      <BDialog.Popup
        className={cn(
          "-mt-8 -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-3rem)] rounded-lg bg-primary-foreground p-6 text-foreground outline outline-border transition-all duration-150 data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </BDialog.Popup>
    </BDialog.Portal>
  );
}
