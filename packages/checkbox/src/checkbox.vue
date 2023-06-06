<template>
  <label :class="Class">
    <div class="z-checkbox__input">
      <input
        type="checkbox"
        v-bind="$attrs"
        :checked="checkState"
        @change="checkboxChange"
        :disabled="disabled"
        :value="value"
      />
      <span class="z-checkbox__mark"></span>
    </div>
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
import { computed, inject } from "vue";
import { checkboxProps } from "./checkbox";
import { checkboxGroupContextKey } from "./checkbox-group";

import { useCompGlobal } from "../../utils/compGlobal";
const { compSize, compType } = useCompGlobal();

const emit = defineEmits(["checked", "update:modelValue"]);
const props = defineProps(checkboxProps);

const checkboxGroupContext = inject(checkboxGroupContextKey, null);
console.log(checkboxGroupContext);

const checkState = computed(() => {
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
    `z-checkbox--${compType.value(props)}`,
    `z-checkbox--${compSize.value(props?.size ? props : checkboxGroupContext)}`,
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
  // transition: all 0.2s;
  &__input {
    outline: none;
    display: inline-flex;
    position: relative;
    vertical-align: middle;
  }
  input {
    display: none;
    cursor: pointer;
    &:checked ~ .z-checkbox__mark {
      &::after {
        display: block;
      }
    }
  }

  &__label {
    cursor: pointer;
    padding: 0 8px 0 6px;
    line-height: 14px;
  }
  &:hover {
    .z-checkbox__mark {
      background-color: none;
    }
  }

  .z-checkbox__mark {
    top: 0;
    left: 0;
    display: block;
    border-radius: 2px;
    border: 1px solid $light-border;
    position: relative;
    cursor: pointer;
    &::after {
      content: "";
      position: absolute;
      display: none;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: 4px;
      height: 8px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      animation: checkbox-ani 0.2s ease-out;
      @keyframes checkbox-ani {
        0% {
          transform: rotate(45deg) scale(0);
        }
        100% {
          transform: rotate(45deg) scale(1);
        }
      }
    }
  }
}

.z-checkbox--lg {
  .z-checkbox__mark {
    width: 14px;
    height: 14px;
    &::after {
      width: 4px;
      height: 8px;
      top: -2px;
    }
  }
}
.z-checkbox--md {
  .z-checkbox__mark {
    width: 12px;
    height: 12px;
    &::after {
      width: 3px;
      height: 6px;
      top: -1.5px;
      left: 0.7px;
    }
  }
}
.z-checkbox--xs {
  .z-checkbox__mark {
    width: 10px;
    height: 10px;
    &::after {
      width: 2px;
      height: 5px;
      top: -1px;
    }
  }
}

.z-checkbox--primary {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: $primary;
      border: 1px solid $primary;
    }
  }
  .z-checkbox__mark {
    &:hover {
      border: 1px solid $primary;
    }
  }
}

.z-checkbox--success {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: $success;
      border: 1px solid $success;
    }
  }
  .z-checkbox__mark {
    &:hover {
      border: 1px solid $success;
    }
  }
}

.z-checkbox--info {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: $info;
      border: 1px solid $info;
    }
  }
  .z-checkbox__mark {
    &:hover {
      border: 1px solid $info;
    }
  }
}
.z-checkbox--danger {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: $danger;
      border: 1px solid $danger;
    }
  }
  .z-checkbox__mark {
    &:hover {
      border: 1px solid $danger;
    }
  }
}
.z-checkbox--warning {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: $warning;
      border: 1px solid $warning;
    }
  }
  .z-checkbox__mark {
    &:hover {
      border: 1px solid $warning;
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
      border-radius: 1px;
      background-color: white;
      transform: rotate(0deg);
      animation: checkbox-ani 0.2s ease-out;
      @keyframes checkbox-ani {
        0% {
          transform: rotate(0deg) scale(0);
        }
        100% {
          transform: rotate(0deg) scale(1);
        }
      }
    }
  }
}
.is-indeterminate.z-checkbox--lg {
  .z-checkbox__mark {
    &::after {
      width: 8px;
      height: 0.5px;
    }
  }
}
.is-indeterminate.z-checkbox--md {
  .z-checkbox__mark {
    &::after {
      width: 6px;
      height: 0.4px;
    }
  }
}
.is-indeterminate.z-checkbox--xs {
  .z-checkbox__mark {
    &::after {
      width: 4px;
      height: 0.3px;
    }
  }
}
.is-disabled {
  cursor: no-drop;
  input {
    &:checked ~ .z-checkbox__mark {
      &::after {
        display: block;
      }
    }
  }
  input,
  .z-checkbox__mark {
    background-color: $light-disabled;
    cursor: no-drop;
    &::after {
      cursor: no-drop;
    }
  }
  .z-checkbox__label {
    cursor: no-drop;
  }
}
.is-disabled.z-checkbox--primary {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $primary, $alpha: 0.5);
      border: 1px solid $primary;
    }
  }
}
.is-disabled.z-checkbox--success {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $success, $alpha: 0.5);
      border: 1px solid $success;
    }
  }
}
.is-disabled.z-checkbox--danger {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $danger, $alpha: 0.5);
      border: 1px solid $danger;
    }
  }
}
.is-disabled.z-checkbox--info {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $info, $alpha: 0.5);
      border: 1px solid $info;
    }
  }
}
.is-disabled.z-checkbox--warning {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $warning, $alpha: 0.5);
      border: 1px solid $warning;
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
  .is-disabled {
    .z-checkbox__mark {
      background-color: $dark-disabled;
    }
  }
}
</style>
