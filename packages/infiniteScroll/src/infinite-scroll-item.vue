<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-05 17:00:42
-->
<template>
  <div class="z-infinite-scroll-item">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "z-infinite-scroll-item",
};
</script>

<script setup lang="ts">
import { ref, provide, watch } from "vue";
import { radioGroupContextKey, radioGroupProps } from "./infinite-scroll-item";

const props = defineProps(radioGroupProps);
const emit = defineEmits(["update:modelValue", "update"]);

const update = ({ checked, value }) => {
  console.log(checked, value);
  emit("update:modelValue", value);
};

const context = ref({
  ...props,
  update,
});

watch(
  () => props.modelValue,
  (newVal) => {
    // 触发表单验证
    // formItemContext?.validate("change").catch(() => {});
    emit("update:modelValue", newVal);
    emit("update", newVal);
    context.value.modelValue = newVal;
  }
);

provide(radioGroupContextKey, context.value);
</script>

<style scoped lang="scss">
.z-infinite-scroll-item {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
