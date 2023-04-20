<template>
  <label :class="Class">
    <input
      type="checkbox"
      v-bind="$attrs"
      :checked="checkState"
      @change="checkboxChange"
      :disabled="disabled"
      :value="value"
    />
    <span class="z-checkbox__mark"></span>
    <span class="z-checkbox__label"
      ><slot> {{ label }} </slot>
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: "z-checkbox",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { checkboxProps } from "./checkbox";
import { inject } from "vue";
import { checkboxGroupContextKey } from "./checkbox-group";

const emit = defineEmits(["checked", "update:modelValue"]);
const props = defineProps(checkboxProps);

const checkboxGroupContext = inject(checkboxGroupContextKey, null);

const checkState = computed(() => {
  //   if (checkboxGroupContext?.modelValue) {
  //     // 如果是被 checkbox-group 组件包裹着的话就判断数组中有没有符合的值
  //     return checkboxGroupContext?.modelValue.find(
  //       (item) => item === props.value
  //     );
  //   } else {
  //     return props.modelValue;
  //   }
  let checked = checkboxGroupContext?.modelValue.includes(props.value);
  if (checked) {
    emit("update:modelValue", true);
    return checkboxGroupContext?.modelValue.includes(props.value);
  } else {
    return props.modelValue;
  }
});

const Class = computed(() => {
  return [
    "z-checkbox",
    props.indeterminate ? "is-indeterminate" : "",
    props.disabled ? "is-disabled" : "",
    checkboxGroupContext?.mode === "vertical" ? "is-vertical" : "",
  ];
});

const checkboxChange = (e) => {
  checkboxGroupContext?.collectField({
    value: e.target.value,
    checked: e.target.checked,
  });
  emit("update:modelValue", e.target.checked);
  emit("checked", { checked: e.target.checked, value: e.target.value });
};
</script>

<style lang="scss" scoped>
.z-checkbox {
  font-size: 14px;
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  position: relative;
  transition: all 0.5s;
  input {
    // visibility: hidden;
    display: none;
    cursor: pointer;
    &:checked ~ .z-checkbox__mark {
      background-color: blue;
      &::after {
        display: block;
      }
    }
  }

  &__label {
    padding: 0 8px 0 6px;
  }
  &:hover {
    .z-checkbox__mark {
      background-color: none;
    }
  }

  .z-checkbox__mark {
    // position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    display: block;
    border-radius: 2px;
    border: 1px solid $light-border;
    position: relative;
    // background-color: lightgray;

    &::after {
      content: "";
      position: absolute;
      display: none;
      top: -2px;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    &:hover {
      border: 1px solid $primary;
    }
  }
}
.is-indeterminate {
  .z-checkbox__mark {
    &::after {
      content: "";
      position: absolute;
      display: none;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 8px;
      height: 0.5px;
      //   border: solid white;
      border-radius: 1px;
      background-color: white;
      //   border-width: 0 2px 2px 0;
      transform: rotate(0deg);
    }
  }
}
.is-disabled {
  cursor: no-drop;
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $primary, $alpha: 0.3);
      &::after {
        display: block;
      }
    }
  }
  input,
  .z-checkbox__mark {
    cursor: no-drop;
    &::after {
      cursor: no-drop;
    }
  }
}
.is-vertical {
  padding: 6px 0;
}

html.dark {
  .z-checkbox {
    .z-checkbox__mark {
      border: 1px solid $dark-border;
    }
  }
}
</style>
