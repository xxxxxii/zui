import type { ExtractPropTypes, InjectionKey, Prop, PropType } from "vue";

export type textTypes =
  | "span"
  | "del"
  | "ins"
  | "div"
  | "strong"
  | "em"
  | "dfn"
  | "code"
  | "samp"
  | "kbd"
  | "var";

export const textProps = {
  text: {
    type: String,
    default: "this is text",
  },
  type: {
    type: String,
    default: "div",
  } as Prop<textTypes>,
} as const;

export type TextProps = Partial<ExtractPropTypes<typeof textProps>>;

export interface TextContext extends TextProps {}

export const TextContextKey: InjectionKey<TextContext> = Symbol();
