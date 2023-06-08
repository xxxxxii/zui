/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-08 14:42:52
 */
import type { ExtractPropTypes, InjectionKey, PropType } from "vue";

export const popoverProps = {
  title: {
    type: [String, Number] as PropType<string | number>,
  },
  content: {
    type: [String, Number] as PropType<string | number>,
  },
  placement: {
    type: String,
    default: "bottom",
  },
  visible: {
    type: Boolean,
  },
  selfSet: {
    type: Boolean,
    default: false,
  },
  trigger: {
    type: String,
    default: "hover",
  },
  width: {
    type: String,
    default: "150px",
  },
} as const;

export type PopoverProps = Partial<ExtractPropTypes<typeof popoverProps>>;

export interface PopoverContext extends PopoverProps {
  // collectField: (field: FormItemContext) => void
}

export const PopoverContextKey: InjectionKey<PopoverContext> = Symbol();
