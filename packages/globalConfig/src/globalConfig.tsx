/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-01 10:38:14
 */
import { defineComponent, h, Prop, provide, ref, toRefs } from "vue";
import { GlobalConfigContextKey,globalConfigProps } from "./globalConfig";

export default defineComponent({
  name: "z-global-config",
  props: globalConfigProps,

  setup(props, { slots, attrs }) {
    const context = ref({
      ...toRefs(props),
    });
    provide(GlobalConfigContextKey, context.value);

    return () => h("div", { class: "z-global-config" }, slots.default());
  },
});
