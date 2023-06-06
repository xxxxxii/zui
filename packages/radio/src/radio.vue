<template>
  <label :class="Class">
    <div class="z-radio__input">
      <input
        type="radio"
        :value="value"
        :checked="checked"
        :disabled="disabled"
        @change="radioChange"
        v-bind="$attrs"
      /><span> </span>
    </div>
    <span class="z-radio__label">
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

import { useCompGlobal } from "../../utils/compGlobal";
const { compSize, compType } = useCompGlobal();

const props = defineProps(radioProps);

const radioGroupContext = inject(radioGroupContextKey, null);
console.log(radioGroupContext);

const Class = computed(() => {
  return [
    "z-radio",
    `z-radio__dot--${compType.value(props)}`,
    `z-radio--${compSize.value(props?.size ? props : radioGroupContext)}`,
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
  justify-content: center;
  font-size: 14px;
  transition: all 0.5s linear;

  &__input {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    position: relative;
    vertical-align: middle;
  }
  &__label {
    padding: 0 8px 0 6px;
    cursor: pointer;
    line-height: 14px;
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

    cursor: pointer;
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
      width: 4px;
      height: 4px;
      border: solid rgba($color: $primary, $alpha: 0.2) 1px;
      background-color: white;
      border-radius: 50%;
      animation: checked-ani 0.2s ease-out;
    }
  }

  input[type="radio"]:checked + span {
    // background-color: $primary;
    background-clip: content-box;
    // border: 1px solid $primary;
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

.z-radio--lg {
  input[type="radio"] + span {
    width: 16px;
    height: 16px;
  }
}
.z-radio--md {
  input[type="radio"] + span {
    width: 14px;
    height: 14px;
  }
}
.z-radio--xs {
  input[type="radio"] + span {
    width: 12px;
    height: 12px;
  }
}

.z-radio__dot--primary {
  input[type="radio"]:checked + span {
    background-color: $primary;
    border: 1px solid $primary;
  }
}
.z-radio__dot--success {
  input[type="radio"]:checked + span {
    background-color: $success;
    border: 1px solid $success;
  }
}

.z-radio__dot--info {
  input[type="radio"]:checked + span {
    background-color: $info;
    border: 1px solid $info;
  }
}

.z-radio__dot--danger {
  input[type="radio"]:checked + span {
    background-color: $danger;
    border: 1px solid $danger;
  }
}
.z-radio__dot--warning {
  input[type="radio"]:checked + span {
    background-color: $warning;
    border: 1px solid $warning;
  }
}
.is-disabled {
  cursor: no-drop;
  input[type="radio"] + span {
    cursor: no-drop;
    background-color: $light-disabled;
  }
  .z-radio__label {
    cursor: no-drop;
  }
}
.is-disabled.z-radio__dot--primary {
  input[type="radio"]:checked + span {
    background-color: rgba($color: $primary, $alpha: 0.5);
  }
}

.is-disabled.z-radio__dot--success {
  input[type="radio"]:checked + span {
    background-color: rgba($color: $success, $alpha: 0.3);
  }
}
.is-disabled.z-radio__dot--info {
  input[type="radio"]:checked + span {
    background-color: rgba($color: $info, $alpha: 0.5);
  }
}
.is-disabled.z-radio__dot--danger {
  input[type="radio"]:checked + span {
    background-color: rgba($color: $danger, $alpha: 0.5);
  }
}
.is-disabled.z-radio__dot--warning {
  input[type="radio"]:checked + span {
    background-color: rgba($color: $warning, $alpha: 0.5);
  }
}
html.dark {
  .is-disabled {
    cursor: no-drop;
    input[type="radio"] + span {
      background-color: $dark-disabled;
    }
  }
}
</style>
