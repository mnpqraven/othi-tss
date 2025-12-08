import { Combobox as BCombobox } from "@base-ui-components/react/combobox";
import { CheckIcon, XIcon } from "lucide-react";
import React, { Fragment, type Key, type ReactNode, useId } from "react";

interface WithItems<T> {
  items: T[];
}

type Props<
  TGroup extends WithItems<TItem>,
  TItem,
  TValue extends Key = string,
> = {
  values?: TGroup["items"];
  onValueChange?: (values: TGroup["items"]) => void;
  options: TGroup[];
  idAccessor: (item: TGroup["items"][number]) => TValue;
  labelAccessor: (item: TGroup["items"][number]) => ReactNode;
  groupIdAccessor: (item: TGroup) => TValue;
  groupLabelAccessor: (item: TGroup) => ReactNode;
  placeholder?: string;
  id?: string;
  truncateLength?: number;
};

export function GroupedMultiCombobox<
  TGroup extends WithItems<TItem>,
  TItem,
  TValue extends Key = string,
>({
  values,
  options,
  onValueChange,
  idAccessor,
  labelAccessor,
  placeholder,
  id: propsId,
  groupIdAccessor,
  groupLabelAccessor,
  truncateLength,
}: Props<TGroup extends WithItems<TItem> ? TGroup : never, TItem, TValue>) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const _id = useId();
  const id = propsId ?? _id;

  return (
    <BCombobox.Root
      items={options}
      multiple
      value={values}
      onValueChange={onValueChange}
    >
      <div className="flex flex-col gap-1">
        <BCombobox.Chips
          className="focus-within:-outline-offset-1 flex flex-wrap items-center gap-0.5 rounded-md border border-border px-1.5 py-1 focus-within:outline-2 focus-within:outline-primary"
          ref={containerRef}
        >
          <BCombobox.Value>
            {(_options: TItem[]) => (
              <Fragment>
                {(truncateLength === undefined
                  ? _options
                  : _options.slice(0, truncateLength)
                ).map((option) => (
                  <BCombobox.Chip
                    key={idAccessor(option)}
                    className="flex cursor-default items-center gap-1 rounded-md bg-secondary px-1.5 py-[0.2rem] text-secondary-foreground text-sm outline-none focus-within:bg-blue-800 focus-within:text-primary [@media(hover:hover)]:[&[data-highlighted]]:bg-blue-800 [@media(hover:hover)]:[&[data-highlighted]]:text-gray-50"
                  >
                    {labelAccessor(option)}
                    <BCombobox.ChipRemove
                      className="rounded-md p-1 text-inherit hover:bg-secondary-foreground/20"
                      aria-label="Remove"
                    >
                      <XIcon className="size-4" />
                    </BCombobox.ChipRemove>
                  </BCombobox.Chip>
                ))}

                {truncateLength !== undefined &&
                truncateLength < _options.length ? (
                  <div className="flex cursor-default items-center gap-1 rounded-md bg-secondary px-1.5 py-[0.2rem] text-secondary-foreground text-sm outline-none focus-within:bg-blue-800 focus-within:text-primary [@media(hover:hover)]:[&[data-highlighted]]:bg-blue-800 [@media(hover:hover)]:[&[data-highlighted]]:text-gray-50">
                    +{_options.length - truncateLength}
                  </div>
                ) : null}
                {/* NOTE: probably better to split for composition */}
                <BCombobox.Input
                  // TODO: refactor id as well
                  id={id}
                  placeholder={_options.length > 0 ? "" : placeholder}
                  className="h-8 min-w-12 flex-1 rounded-md border-0 bg-transparent pl-2 text-base text-primary outline-none"
                />
              </Fragment>
            )}
          </BCombobox.Value>
        </BCombobox.Chips>
      </div>

      <BCombobox.Portal>
        <BCombobox.Positioner
          className="z-50 outline-none"
          sideOffset={4}
          anchor={containerRef}
        >
          <BCombobox.Popup className="dark:-outline-offset-1 max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] scroll-pt-2 scroll-pb-2 overflow-y-auto overscroll-contain rounded-md bg-card text-card-foreground shadow-gray-200 shadow-lg outline-1 outline-border transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none">
            <BCombobox.Empty className="px-4 py-2 text-[0.925rem] text-primary leading-4 empty:m-0 empty:p-0">
              No item found.
            </BCombobox.Empty>
            <BCombobox.List>
              {(group: TGroup) => (
                <BCombobox.Group
                  key={groupIdAccessor(group)}
                  items={group.items}
                  className="block pb-2"
                >
                  <BCombobox.GroupLabel className="sticky top-0 z-1 mx-2 my-0 box-border select-none bg-card py-2 pl-2 font-semibold text-xs uppercase tracking-wider">
                    {groupLabelAccessor(group)}
                  </BCombobox.GroupLabel>
                  <BCombobox.Collection>
                    {(option: TItem) => (
                      <BCombobox.Item
                        key={idAccessor(option)}
                        className="grid cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none [@media(hover:hover)]:[&[data-highlighted]]:relative [@media(hover:hover)]:[&[data-highlighted]]:z-0 [@media(hover:hover)]:[&[data-highlighted]]:text-card [@media(hover:hover)]:[&[data-highlighted]]:before:absolute [@media(hover:hover)]:[&[data-highlighted]]:before:inset-x-2 [@media(hover:hover)]:[&[data-highlighted]]:before:inset-y-0 [@media(hover:hover)]:[&[data-highlighted]]:before:z-[-1] [@media(hover:hover)]:[&[data-highlighted]]:before:rounded-sm [@media(hover:hover)]:[&[data-highlighted]]:before:bg-card-foreground"
                        value={option}
                      >
                        <BCombobox.ItemIndicator className="col-start-1">
                          <CheckIcon className="size-3" />
                        </BCombobox.ItemIndicator>
                        <div className="col-start-2">
                          {labelAccessor(option)}
                        </div>
                      </BCombobox.Item>
                    )}
                  </BCombobox.Collection>
                </BCombobox.Group>
              )}
            </BCombobox.List>
          </BCombobox.Popup>
        </BCombobox.Positioner>
      </BCombobox.Portal>
    </BCombobox.Root>
  );
}
