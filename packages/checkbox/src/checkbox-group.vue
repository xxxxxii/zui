<template>
  <div :class="Class">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "z-checkbox-group",
};
</script>

<script setup lang="ts">
import { provide, ref, computed, inject, watch } from "vue";
import { checkboxGroupContextKey, checkboxGroupProps } from "./checkbox-group";
import { formItemContextKey } from "../../form/src/form-item";
import { formContextKey } from "../../form/src/form";
const props = defineProps(checkboxGroupProps);

const emit = defineEmits(["update:modelValue", "update"]);

// console.log(props.modelValue);
// if (!Array.isArray(props.modelValue)) {
//   emit("update:modelValue", []);
// }

// 表单上下文，用于验证
const formItemContext = inject(formItemContextKey, null);
const formContext = inject(formContextKey, null);

const Class = computed(() => {
  return ["z-checkbox-group", `is-${props.mode}`];
});

const collectField = ({ value, checked }) => {
  const selectArr = ref([]);
  selectArr.value.push(...props.modelValue);
  if (checked) {
    selectArr.value.push(value);
  } else {
    console.log(selectArr.value);
    let index = selectArr.value.findIndex((item) => item === value);
    console.log(index);
    selectArr.value.splice(index, 1);
  }
  console.log(selectArr.value, value, checked);
  let newArr = Array.from(new Set(selectArr.value));

  // 触发表单验证
  formItemContext?.validate("change").catch(() => {});
  emit("update:modelValue", newArr);
  emit("update", newArr);
};

const context = ref({
  ...props,
  collectField,
});
watch(
  () => props.modelValue,
  (newVal) => {
    // 触发表单验证
    // let isRest = formContext?.formRest;
    // console.log(isRest);
    // if (!isRest) {
    formItemContext?.validate("change").catch(() => {});
    // }

    emit("update:modelValue", newVal);
    context.value.modelValue = newVal;
  }
);

provide(checkboxGroupContextKey, context.value);
</script>

<style scoped lang="scss">
.z-checkbox-group {
  display: inline-flex;
  flex-flow: wrap;
  align-items: center;
}
.is-vertical {
  display: inline-flex;
  flex-direction: column;
  padding: 8px 0;
}
</style>
