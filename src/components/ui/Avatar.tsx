import { Avatar as BAvatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

interface Props extends Omit<BAvatar.Image.Props, "src"> {
  email?: string;
  src?: string | null;
  root?: BAvatar.Root.Props;
}

export function Avatar({
  email,
  className,
  src,
  root,
  children,
  ...props
}: Props) {
  return (
    <BAvatar.Root
      {...root}
      className={cn(
        "inline-flex size-6 select-none items-center justify-center overflow-hidden rounded-full bg-primary align-middle font-medium text-base text-primary-foreground",
        root?.className,
      )}
    >
      {children ?? (
        <>
          <AvatarImage src={src || undefined} {...props} />
          <AvatarFallback>{email?.charAt(0).toUpperCase()}</AvatarFallback>
        </>
      )}
    </BAvatar.Root>
  );
}

export function AvatarImage({ className, ...props }: BAvatar.Image.Props) {
  return (
    <BAvatar.Image
      width="24"
      height="24"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: BAvatar.Fallback.Props) {
  return (
    <BAvatar.Fallback
      className={cn(
        "flex size-full items-center justify-center text-base",
        className,
      )}
      {...props}
    />
  );
}
