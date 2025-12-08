import { Input as BInput } from "@base-ui-components/react/input";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: BInput.Props) {
  return (
    <BInput
      className={cn(
        "focus:-outline-offset-1 h-10 w-full rounded-md border border-border pl-3.5 text-base text-primary focus:outline-2 focus:outline-primary",
        className,
      )}
      {...props}
    />
  );
}
