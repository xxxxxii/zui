<template>
  <ul class="z-select-dropdown">
    <z-options
      v-for="(item, index) in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :multiple="multiple"
      :active="(modelValue as any).includes(item.value)"
      @selected="selected"
      @cancel="cancel"
    />
    <!-- <slot /> -->
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [Number, String, Array],
    required: true,
  },
  options: {
    type: Array as () => Array<{ value: string; label: string }>,
    default: [
      {
        id: 1,
        label: "选项一",
        value: "1",
      },
      {
        id: 2,
        label: "选项二",
        value: "2",
      },
      {
        id: 3,
        label: "选项三",
        value: "3",
      },
    ],
  },
  multiple: {
    type: Boolean,
  },
});
const emit = defineEmits(["singeItem", "multipleItem", "update:modelValue"]);

if (
  typeof props.modelValue === "number" ||
  (typeof props.modelValue === "string" && props.modelValue != "")
) {
  emit("update:modelValue", [props.modelValue]);
}

const selected = (val) => {
  console.log(val);
  // 多选
  if (props.multiple) {
    console.log(props.modelValue);
    emit("multipleItem", val);
  } else {
    emit("singeItem", val);
  }
};
const cancel = (val) => {
  console.log(val);
};
</script>
