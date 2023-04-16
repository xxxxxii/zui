<template>
  <li
    @click.stop="selectOption"
    class="z-options"
    :class="{ 'is-select': active }"
    :data-value="value"
  >
    {{ label }}
  </li>
</template>

<script lang="ts">
export default {
  name: "zOptions",
};
</script>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: [String, Number],
  },
  label: {
    type: String,
  },
  multiple: {
    type: Boolean,
  },
  active: Boolean,
});
const emit = defineEmits(["selected", "cancel"]);

const selectOption = (e) => {
  let target = e.target;

  console.log(props.multiple);
  // 单选
  if (!props.multiple) {
    Array.from(target.parentNode.children).forEach((item) => {
      (item as HTMLElement).classList.remove("is-select");
    });
    target.classList.add("is-select");
    emit("selected", { label: props.label, value: props.value });
  } else {
    console.log(target.classList.contains("is-select"));
    if (target.classList.contains("is-select")) {
      target.classList.remove("is-select");
      emit("cancel", { label: props.label, value: props.value });
    } else {
      target.classList.add("is-select");
      emit("selected", { label: props.label, value: props.value });
    }
  }
};
</script>

<style scoped lang="scss">
html.dark {
  .z-options {
    &:hover {
      background: $hover-dark-bg;
      opacity: 0.8;
    }
  }
}
.z-options {
  padding: 0px 20px;
  line-height: 32px;
  cursor: pointer;
  &:hover {
    background: $hover-light-bg;
    opacity: 0.8;
  }
}
.is-select {
  color: $primary;
}
</style>
