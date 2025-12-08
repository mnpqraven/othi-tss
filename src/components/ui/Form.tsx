import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import { type ComponentPropsWithRef, type Key, useId } from "react";
import { useHotkeys } from "@/hooks/useHotkeys";
import { Button } from "./Button";
import { GroupedMultiCombobox } from "./GroupedMultiCombobox";
import { Input } from "./Input";
import { Kbd } from "./Kbd";
import { Label } from "./Label";
import { MultiCombobox } from "./MultiCombobox";
import { NumberInput, NumberInputLabel, NumberInputShell } from "./NumberInput";
import { Select } from "./Select";
import { Textarea } from "./Textarea";
import { Combobox } from "./Combobox";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FieldInput,
    NumberInput: FieldNumberInput,
    Combobox: FieldCombobox,
    MultiCombobox: FieldMultiCombobox,
    GroupedMultiCombobox: FieldGroupedMultiCombobox,
    Select: FieldSelect,
    Textarea: FieldTextarea,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

export function SubmitButton({
  children,
  ...props
}: ComponentPropsWithRef<"button">) {
  const form = useFormContext();

  useHotkeys([
    {
      mods: ["CTRL"],
      key: "enter",
      action: () => form.handleSubmit({ context: "hotkey hook" }),
    },
  ]);

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button {...props} type="submit" disabled={isSubmitting}>
          <Kbd className="whitespace-nowrap">Ctrl ↵</Kbd>
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}

function ErrorMessages({
  errors,
}: {
  errors: Array<string | { message: string }>;
}) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === "string" ? error : error.message}
          className="mt-1 font-bold text-red-500"
        >
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </>
  );
}

export function FieldInput({
  label,
  ...props
}: ComponentPropsWithRef<typeof Input> & {
  label: string;
}) {
  const id = useId();
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

function FieldNumberInput({
  label,
  disabled,
  ...props
}: ComponentPropsWithRef<typeof NumberInputShell> & {
  label: string;
}) {
  const id = useId();
  const field = useFieldContext<number | null>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <NumberInputShell
        id={id}
        renderLabel={<NumberInputLabel htmlFor={id}>{label}</NumberInputLabel>}
        onValueChange={(e) => {
          if (e !== null) field.handleChange(e);
        }}
        value={field.state.value}
        onBlur={field.handleBlur}
        disabled={disabled}
        {...props}
      >
        <NumberInput disabled={disabled} />
      </NumberInputShell>

      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

function FieldTextarea({
  label,
  ...props
}: ComponentPropsWithRef<typeof Textarea> & {
  label: string;
}) {
  const id = useId();
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />

      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

function FieldCombobox<TItem, TValue extends Key = string>({
  label,
  idAccessor,
  options,
  ...props
}: ComponentPropsWithRef<typeof Combobox<TItem, TValue>> & {
  label: string;
}) {
  const id = useId();
  const field = useFieldContext<TValue>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Combobox
        id={id}
        options={options}
        value={options.find((e) => field.state.value === idAccessor(e))}
        idAccessor={idAccessor}
        onValueChange={(e) => field.handleChange(idAccessor(e))}
        {...props}
      />

      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

function FieldMultiCombobox<TItem, TValue extends Key = string>({
  label,
  idAccessor,
  options,
  ...props
}: ComponentPropsWithRef<typeof MultiCombobox<TItem, TValue>> & {
  label: string;
}) {
  const id = useId();
  const field = useFieldContext<TValue[]>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <MultiCombobox
        id={id}
        options={options}
        values={options.filter((e) =>
          field.state.value.includes(idAccessor(e)),
        )}
        idAccessor={idAccessor}
        onValueChange={(e) => {
          const next = e.map(idAccessor);
          field.handleChange(next);
        }}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

function FieldGroupedMultiCombobox<TGroup, TItem, TValue extends Key = string>({
  label,
  options,
  ...props
}: ComponentPropsWithRef<
  typeof GroupedMultiCombobox<
    TGroup extends { items: TItem[] } ? TGroup : never,
    TItem,
    TValue
  >
> & {
  label: string;
}) {
  const id = useId();
  const field = useFieldContext<TValue[]>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <GroupedMultiCombobox
        id={id}
        options={options}
        values={options
          .flatMap((e) => e.items)
          .filter((e) => field.state.value.includes(props.idAccessor(e)))}
        onValueChange={(e) => field.handleChange(e.map(props.idAccessor))}
        {...props}
      />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}

function FieldSelect<T>({
  label,
  items,
  ...props
}: ComponentPropsWithRef<typeof Select> & { label: string }) {
  const id = useId();
  const field = useFieldContext<T[]>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Select {...props} />
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}
