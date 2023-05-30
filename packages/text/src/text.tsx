import { defineComponent, h, Prop } from "vue";
import { textProps } from "./text";

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

export default defineComponent({
  name: "z-text",
  props: {
    text: {
      type: String,
      default: "this is text",
    },
    type: {
      type: String,
      default: "div",
    } as Prop<textTypes>,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(props.type, {}, [
        slots.leftIcon ? slots.leftIcon() : "",
        slots.default ? slots.default() : "",
        slots.rightIcon ? slots.rightIcon() : "",
      ]);
  },
});
