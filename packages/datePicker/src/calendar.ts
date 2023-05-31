import type { ExtractPropTypes, InjectionKey, Prop, PropType } from "vue";

export const calendarProps = {
  modelValue: {
    type: String,
  },
  size: {
    type: String,
    default: "md",
  },
  format: {
    type: String,
  },
  valueFormat: {
    type: String,
  },
  type: {
    type: String,
    default: "dates",
  },
} as const;

export type CalendarProps = Partial<ExtractPropTypes<typeof calendarProps>>;

export interface CalendarContext extends CalendarProps {}

export const CalendarContextKey: InjectionKey<CalendarContext> = Symbol();
