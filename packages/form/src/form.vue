<template>
  <form class="z-form">
    <slot />
  </form>
</template>

<script lang="ts">
export default {
  name: "z-form",
};
</script>

<script setup lang="ts">
import { provide, ref } from "vue";
import { FormContext, formProps, formContextKey } from "./form";
import { FormItemContext } from "./form-item";
import { Values } from "async-validator";
const props = defineProps(formProps);

const fields: FormItemContext[] = [];

// form 验证方法
const validate = async (
  callback?: (valid: boolean, fields?: Values) => void
) => {
  let errors: Values = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (error) {
      errors = {
        ...errors,
        ...(error as Values).fields,
      };
    }
    console.log(field);
  }

  console.log(errors);
  if (Object.keys(errors).length === 0) {
    return callback?.(true);
  } else {
    if (callback) {
      callback(false, errors);
    } else {
      return Promise.reject(errors);
    }
  }
};

// form restForm
const restValidate = () => {
  for (let field of fields) {
    // 恢复初始值
    props.model[field?.prop] = field?.compInitData;
    field.resetField();
  }
};

// 收集form-item 的实列
const collectField: FormContext["collectField"] = (context) => {
  fields.push(context);
  console.log(fields);
};

const context = ref({
  ...props,
  collectField,
});
// 传递上下文
provide(formContextKey, context.value);

// 暴露form 的validate方法
defineExpose({
  validate,
  restValidate,
});
</script>

<style scoped lang="scss"></style>
