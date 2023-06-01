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

import { useCompGlobal } from "../../utils/compGlobal";
const { compSize, compTYpe } = useCompGlobal();

const emit = defineEmits(["checked", "update:modelValue"]);
const props = defineProps(checkboxProps);

const checkboxGroupContext = inject(checkboxGroupContextKey, null);

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
    `z-checkbox--${compTYpe.value(props)}`,
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
  }
  &:hover {
    .z-checkbox__mark {
      background-color: none;
    }
  }

  .z-checkbox__mark {
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    display: block;
    border-radius: 2px;
    border: 1px solid $light-border;
    position: relative;
    cursor: pointer;
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
  }
}

.z-checkbox--primary {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: $primary;
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
}
.is-disabled.z-checkbox--primary {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $primary, $alpha: 0.5);
    }
  }
}
.is-disabled.z-checkbox--success {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $success, $alpha: 0.5);
    }
  }
}
.is-disabled.z-checkbox--danger {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $danger, $alpha: 0.5);
    }
  }
}
.is-disabled.z-checkbox--info {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $info, $alpha: 0.5);
    }
  }
}
.is-disabled.z-checkbox--warning {
  input {
    &:checked ~ .z-checkbox__mark {
      background-color: rgba($color: $warning, $alpha: 0.5);
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
