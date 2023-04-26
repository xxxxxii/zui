<template>
  <label :class="Class">
    <input
      type="radio"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="radioChange"
      v-bind="$attrs"
    /><span> </span
    ><span class="z-radio__label">
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts">
export default {
  name: "z-radio",
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { inject, computed } from "vue";
import { radioProps } from "./radio";
import { radioGroupContextKey } from "./radio-group";

const props = defineProps(radioProps);

const radioGroupContext = inject(radioGroupContextKey, null);

const Class = computed(() => {
  return [
    "z-radio",
    props.disabled || radioGroupContext?.disabled ? "is-disabled" : "",
  ];
});

// 是否选中
const checked = computed(() => {
  return radioGroupContext?.modelValue === props.value;
});

// 是否禁用
const disabled = computed(() => {
  return radioGroupContext?.disabled || props.disabled;
});

// change 事件
const radioChange = (e) => {
  radioGroupContext?.update({
    checked: e.target.checked,
    value: e.target.value,
  });
};
</script>

<style lang="scss" scoped>
.z-radio {
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: all 0.5s linear;

  &__label {
    padding: 0 8px 0 6px;
  }

  input[type="radio"] + span {
    content: "";
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #999999;
    box-sizing: border-box;
    position: relative;
    // margin-top: -0.1rem;
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
      height: 8px;
      border: solid rgba($color: $primary, $alpha: 0.2) 1px;
      background-color: white;
      border-radius: 50%;
      //   border-width: 0 2px 2px 0;
      //   transform: rotate(45deg);
    }
  }

  input[type="radio"]:checked + span {
    background-color: $primary;
    background-clip: content-box;
    border: 1px solid $primary;
    // padding: 0.1rem;
    box-sizing: border-box;
    position: relative;
    &::after {
      display: block;
    }
  }

  input[type="radio"] {
    display: none;
  }
}
.is-disabled {
  cursor: no-drop;
  input[type="radio"] + span {
    background-color: $light-disabled;
  }
  input[type="radio"]:checked + span {
    background-color: rgba($color: $primary, $alpha: 0.5);
  }
}
html.dark {
  .is-disabled {
    cursor: no-drop;
    input[type="radio"] + span {
      background-color: $dark-disabled;
    }
    input[type="radio"]:checked + span {
      background-color: rgba($color: $primary, $alpha: 0.5);
    }
  }
}
</style>
