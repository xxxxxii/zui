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
    console.log(slots.default());
    return () =>
      h(
        props.type,
        {
          class: "demoClass",
          style: {},
          onclick: () => console.log(this),
        },
        slots.default()
      );
  },
});
