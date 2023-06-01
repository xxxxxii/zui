import { computed } from "vue";

export function pub() {
  const dataFormat = computed(() => (props, key = "format") => {
    console.log(props, "months");
    // 没有设置格式化的格式时，初始化
    if (!props[key]) {
      if (props.type === "month") {
        return "YYYY-MM";
      } else {
        return "YYYY-MM-DD";
      }
    } else {
      return props[key];
    }
  });

  return {
    dataFormat,
  };
}
