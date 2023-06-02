<!--
 * @Author: xxxxxii 1973329248@qq.com
 * @Date: 2023-02-28 03:49:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-02 10:12:02
 * @FilePath: \z-ui\packages\input\input.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="zClass">
    <input
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="$attrs"
      @input="input"
      :value="modelValue"
      :readonly="readonly"
      @blur="inputBlur"
      class="z-input_inner"
    />
    <span class="right-icon" v-if="rightIcon || clearable">
      <i v-if="rightIcon">
        <z-icon :name="rightIcon" />
      </i>
      <i
        v-if="!clearable && validState === 'success'"
        class="right-icon--valid-success"
      >
        <z-icon name="icon-zhengque" />
      </i>
      <i
        v-if="clearable && !rightIcon ? (modelValue ? true : false) : false"
        @click="clearValue"
      >
        <z-icon name="icon-close" color="#8c8c8c"></z-icon>
      </i>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "zInput",
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { formItemContextKey } from "../form/src/form-item";
import { inject } from "vue";
import { computed, ref, watch } from "vue";
import { useCompGlobal } from "../utils/compGlobal";
const emit = defineEmits(["update:modelValue", "blur"]);

const { compSize, compTYpe } = useCompGlobal();
const fromItemContext = inject(formItemContextKey, null);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    // required: true, // 设置必传
  },
  placeholder: {
    type: String,
    default: "Please Input",
  },
  disabled: Boolean,
  clearable: Boolean,
  size: {
    type: String,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rightIcon: {
    type: String,
  },
  type: {
    type: String,
  },
  number: Boolean,
});

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    console.log(typeof newVal, newVal);
    fromItemContext
      ?.validate("change")
      .then((res) => {})
      .catch(() => {});
  }
);
const zClass = computed(() => {
  return [
    "z-input",
    {
      "z-input-disabled": props.disabled,
    },
    {
      "z-input-clearable": props.clearable,
    },
    `z-input--${compSize.value(props)}`,
    `z-input--${compTYpe.value(props)}`,
  ];
});

const validState = ref(null);

const input = (e: Event) => {
  fromItemContext
    ?.validate("change")
    .then((res) => {
      console.log("input", e.target.value);
      // validState.value = "success";
    })
    .catch(() => {
      // validState.value = "error";
    });
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
const inputBlur = (e: Event) => {
  fromItemContext
    ?.validate("blur")
    .then(() => {
      console.log("input");
      validState.value = "success";
    })
    .catch(() => {
      validState.value = "error";
    });
  emit("blur", (e.target as HTMLInputElement).value);
};
const clearValue = () => {
  emit("update:modelValue", "");
};
</script>

<style scoped lang="scss">
.z-input {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-image: none;
  width: 100%;
  position: relative;
  .z-input_inner {
    outline: none;
    width: 100%;
    border: 1px solid $light-border;
    font-size: 14px;
    color: $color;
    border-radius: $input-border-radius;
    transition: all 0.2s ease-out;
    background: $comp-light-bg;
  }
  .right-icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    .right-icon--valid-success {
      color: $success;
    }
    right: 6px;
    top: 0;
    bottom: 0;
    margin: auto;

    width: 14px;
    height: 14px;
    cursor: pointer;
    i {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
.z-input--primary {
  .z-input_inner {
    &:focus {
      border: 1px solid $primary;
    }
  }
}

.z-input--success {
  .z-input_inner {
    &:focus {
      border: 1px solid $success;
    }
  }
}

.z-input--info {
  .z-input_inner {
    &:focus {
      border: 1px solid $info;
    }
  }
}
.z-input--danger {
  .z-input_inner {
    &:focus {
      border: 1px solid $danger;
    }
  }
}

.z-input--warning {
  .z-input_inner {
    &:focus {
      border: 1px solid $warning;
    }
  }
}

.z-input--lg {
  input {
    height: calc($input-lg-height - 2px);
    padding: 0 $input-lg-x-padding;
  }
  .right-icon {
    right: $input-lg-x-padding;
  }
}
.z-input--md {
  input {
    height: calc($input-md-height - 2px);
    padding: 0 $input-md-x-padding;
  }
  .right-icon {
    right: $input-md-x-padding;
  }
}
.z-input--xs {
  input {
    height: calc($input-xs-height - 2px);
    padding: 0 $input-xs-x-padding;
  }
  .right-icon {
    right: $input-xs-x-padding;
  }
}
html.dark {
  .z-input {
    .z-input_inner {
      border: 1px solid $dark-border;
      background: $comp-dark-bg;
      color: $dark-color;
    }
  }
  .z-input-disabled {
    .z-input_inner {
      background: $dark-disabled;
    }
  }
}
.z-input-disabled {
  .z-input_inner {
    cursor: no-drop;
    background: $light-disabled;
  }
}
.z-input-clearable {
  input {
    padding-right: 22px;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
/* 火狐 */
input {
  -moz-appearance: textfield;
}
</style>
