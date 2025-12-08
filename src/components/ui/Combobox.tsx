import { Combobox as BCombobox } from "@base-ui-components/react/combobox";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { type Key, useId } from "react";

interface Props<TItem, TValue extends Key = string> {
  value?: TItem;
  onValueChange?: (value: TItem, ev: BCombobox.Root.ChangeEventDetails) => void;
  options: TItem[];
  idAccessor: (item: TItem) => TValue;
  labelAccessor: (item: TItem) => string;
  placeholder?: string;
  id?: string;
}

export function Combobox<TItem, TValue extends Key = string>({
  value,
  options,
  onValueChange,
  idAccessor,
  labelAccessor,
  placeholder,
  id: propsId,
}: Props<TItem, TValue>) {
  const _id = useId();
  const id = propsId ?? _id;

  return (
    <BCombobox.Root
      items={options}
      multiple={false}
      value={value}
      onValueChange={onValueChange}
      itemToStringLabel={labelAccessor}
    >
      <BCombobox.Trigger className="focus-visible:-outline-offset-1 flex h-10 min-w-[12rem] select-none items-center justify-between gap-3 rounded-md border bg-transparent pr-3 pl-3.5 text-base text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary data-[popup-open]:bg-primary/20">
        <BCombobox.Value />
        <BCombobox.Icon>
          <ChevronsUpDown className="size-4" />
        </BCombobox.Icon>
      </BCombobox.Trigger>

      <BCombobox.Portal>
        <BCombobox.Positioner className="z-50 outline-none" sideOffset={4}>
          <BCombobox.Popup className="dark:-outline-offset-1 max-h-[24rem] max-w-[var(--available-width)] origin-[var(--transform-origin)] rounded-lg bg-card text-card-foreground shadow-gray-200 shadow-lg outline-1 outline-border transition-[transform,scale,opacity] [--input-container-height:3rem] data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none">
            <div className="h-[var(--input-container-height)] w-80 p-2 text-center">
              <BCombobox.Input
                id={id}
                placeholder={placeholder}
                className="focus:-outline-offset-1 h-10 w-full rounded-md border border-border pl-3.5 font-normal text-base text-primary focus:outline-2 focus:outline-primary"
              />
            </div>
            <BCombobox.Empty className="p-4 text-[0.925rem] text-primary leading-4 empty:m-0 empty:p-0">
              No item found.
            </BCombobox.Empty>
            <BCombobox.List className="max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))] scroll-py-2 overflow-y-auto overscroll-contain py-2 empty:p-0">
              {(item: TItem) => (
                <BCombobox.Item
                  key={idAccessor(item)}
                  value={item}
                  className="grid cursor-default select-none grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 outline-none [@media(hover:hover)]:[&[data-highlighted]]:relative [@media(hover:hover)]:[&[data-highlighted]]:z-0 [@media(hover:hover)]:[&[data-highlighted]]:text-card [@media(hover:hover)]:[&[data-highlighted]]:before:absolute [@media(hover:hover)]:[&[data-highlighted]]:before:inset-x-2 [@media(hover:hover)]:[&[data-highlighted]]:before:inset-y-0 [@media(hover:hover)]:[&[data-highlighted]]:before:z-[-1] [@media(hover:hover)]:[&[data-highlighted]]:before:rounded-sm [@media(hover:hover)]:[&[data-highlighted]]:before:bg-card-foreground"
                >
                  <BCombobox.ItemIndicator className="col-start-1">
                    <CheckIcon className="size-3" />
                  </BCombobox.ItemIndicator>
                  <div className="col-start-2">{labelAccessor(item)}</div>
                </BCombobox.Item>
              )}
            </BCombobox.List>{" "}
          </BCombobox.Popup>
        </BCombobox.Positioner>
      </BCombobox.Portal>
    </BCombobox.Root>
  );
}
