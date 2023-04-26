<template>
  <div class="z-radio-group">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "z-radio-group",
};
</script>

<script setup lang="ts">
import { ref, provide, watch } from "vue";
import { radioGroupContextKey, radioGroupProps } from "./radio-group";

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
.z-radio-group {
  display: inline-flex;
  flex-flow: wrap;
  align-items: center;
}
</style>
