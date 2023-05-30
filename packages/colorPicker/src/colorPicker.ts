import type { ExtractPropTypes, InjectionKey, Prop, PropType } from "vue";

export const colorPickerProps = {
  modelValue: {
    type: String,
    default: "#434343",
    require: true,
  },
  size: {
    type: String,
    default: "md",
  },
} as const;

export type ColorPickerProps = Partial<
  ExtractPropTypes<typeof colorPickerProps>
>;

export interface TColorPickerContext extends ColorPickerProps {}

export const TColorPickerContextKey: InjectionKey<TColorPickerContext> =
  Symbol();
