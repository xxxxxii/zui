<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-02 10:32:19
-->
<template>
  <li :class="Class" @click="optionClick">
    <slot>{{ label }}</slot>
  </li>
</template>

<script lang="ts">
export default {
  name: "z-option",
};
</script>
<script setup lang="ts">
import { inject, computed, watch } from "vue";
import { optionProps } from "./option";
import { selectContextKey } from "./select";
import { useCompGlobal } from "../../utils/compGlobal";
const { compSize, compType } = useCompGlobal();
const props = defineProps(optionProps);

const selectContext = inject(selectContextKey, null);

selectContext?.collectData({ value: props.value, label: props.label });

const Class = computed(() => {
  return [
    "z-option-item",
    selectContext?.modelValue === props.value ||
    (selectContext?.modelValue as Array<number | string>)?.includes(props.value)
      ? `is-active--${compType.value(props)}`
      : "",
  ];
});
const optionClick = (e) => {
  console.log(e);
  selectContext?.changeOption({ value: props.value, label: props.label });
};
</script>

<style scoped lang="scss">
.z-option-item {
  padding: 5px;
  font-size: 14px;
  &:hover {
    background: $hover-light-bg;
  }
}

.is-active--primary {
  color: $primary;
}
.is-active--success {
  color: $success;
}
.is-active--info {
  color: $info;
}
.is-active--danger {
  color: $danger;
}
.is-active--warning {
  color: $warning;
}

html.dark {
  .z-option-item {
    &:hover {
      background: $hover-dark-bg;
    }
  }
}
</style>
