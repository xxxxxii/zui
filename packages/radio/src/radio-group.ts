/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-06 15:38:52
 */
import type { ExtractPropTypes, InjectionKey, PropType } from "vue";

export const radioGroupProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
  },
} as const;

export type RadioGroupProps = Partial<ExtractPropTypes<typeof radioGroupProps>>;

export interface RadioGroupContext extends RadioGroupProps {
  // collectField: (field: FormItemContext) => void
  update: (item: any) => void;
}

export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol();
