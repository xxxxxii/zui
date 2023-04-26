<template>
  <li :class="Class" @click="optionClick">
    <slot>{{ label }}</slot>
  </li>
</template>

<script lang="ts">
export default {
  name: "z-option-v2",
};
</script>
<script setup lang="ts">
import { inject, computed, watch } from "vue";
import { optionProps } from "./option";
import { selectContextKey } from "./select";
const props = defineProps(optionProps);

const selectContext = inject(selectContextKey, null);

selectContext?.collectData({ value: props.value, label: props.label });

const Class = computed(() => {
  return [
    "z-option-item",
    selectContext?.modelValue === props.value ||
    (selectContext?.modelValue as Array<number | string>)?.includes(props.value)
      ? "is-active"
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

.is-active {
  color: $primary;
}

html.dark {
  .z-option-item {
    &:hover {
      background: $hover-dark-bg;
    }
  }
}
</style>
