import { Checkbox as BCheckbox } from "@base-ui-components/react/checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({ className, ...props }: BCheckbox.Root.Props) {
  return (
    <BCheckbox.Root
      className={cn(
        "flex size-5 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-border focus-visible:outline-offset-2 data-[unchecked]:border data-[unchecked]:border-border data-[checked]:bg-primary",
        className,
      )}
      {...props}
    >
      <BCheckbox.Indicator className="text-primary-foreground data-[unchecked]:hidden">
        <CheckIcon className="size-3" />
      </BCheckbox.Indicator>
    </BCheckbox.Root>
  );
}
