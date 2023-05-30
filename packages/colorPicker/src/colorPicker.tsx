import { defineComponent, computed, Prop } from "vue";
import { colorPickerProps } from "./colorPicker";
import "./colorPicker.scss";

export default defineComponent({
  name: "z-color-picker",
  emits: ["update:modelValue"],
  props: colorPickerProps,

  setup(props, { slots, attrs, emit }) {
    const Class = computed(() => {
      return [`z-color-picker`, `z-color-picker-${props.size}`];
    });

    const colorChange = (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      emit("update:modelValue", value);
    };

    return () => (
      <div class={Class.value}>
        <input value={props.modelValue} onChange={colorChange} type="color" />
        {slots.default()}
      </div>
    );
  },
});
