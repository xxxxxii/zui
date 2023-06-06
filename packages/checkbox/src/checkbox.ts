import type { ExtractPropTypes, InjectionKey, PropType } from "vue";

export const checkboxProps = {
  label: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number] as PropType<string | number>,
  },
  size: {
    type: String,
  },
} as const;

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>;

export interface CheckboxContext extends CheckboxProps {
  // collectField: (field: FormItemContext) => void
}

export const checkboxContextKey: InjectionKey<CheckboxContext> = Symbol();
