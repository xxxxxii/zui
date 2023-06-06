/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-06 15:22:55
 */
import type { ExtractPropTypes, InjectionKey, PropType } from "vue";

export const radioProps = {
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
  value: {
    type: [String, Number] as PropType<string | number>,
  },
  size: {
    type: String,
  },
} as const;

export type RadioProps = Partial<ExtractPropTypes<typeof radioProps>>;

export interface RadioContext extends RadioProps {
  // collectField: (field: FormItemContext) => void
}

export const checkboxContextKey: InjectionKey<RadioContext> = Symbol();
