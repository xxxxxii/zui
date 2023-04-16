<!--
 * @Author: xxxxxii 1973329248@qq.com
 * @Date: 2023-02-28 03:49:19
 * @LastEditors: xxxxxii 1973329248@qq.com
 * @LastEditTime: 2023-02-28 04:21:37
 * @FilePath: \z-ui\packages\input\input.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div :class="zClass">
    <input
      :placeholder="placeholder"
      :disabled="disabled"
      type="text"
      @input="input"
      :value="modelValue"
      :readonly="readonly"
      class="z-input_inner"
    />
    <span class="right-icon">
      <i v-if="rightIcon">
        <z-icon :name="rightIcon" />
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
};
</script>

<script setup lang="ts">
import { computed } from "vue";
const emit = defineEmits(["update:modelValue"]);
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
    default: "md",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rightIcon: {
    type: String,
  },
});

const zClass = computed(() => {
  return [
    "z-input",
    {
      "z-input-disabled": props.disabled,
    },
    {
      "z-input-clearable": props.clearable,
    },
    `z-input-${props.size}`,
  ];
});

const input = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
const clearValue = () => {
  emit("update:modelValue", "");
};
</script>

<style scoped lang="scss">
.z-input {
  display: inline-flex;
  // flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-image: none;
  width: 100%;
  // transform: translateZ(0);
  position: relative;
  .z-input_inner {
    // width: 100%;
    // flex-grow: 1;
    // -webkit-appearance: none;
    // font-size: inherit;
    // padding: 0;
    // outline: none;
    // border: none;
    // background: none;
    box-sizing: border-box;
  }
  input {
    outline: none;
    width: 100%;
    line-height: 1;
    border: 1px solid $light-border;
    font-size: 14px;
    color: $color;
    padding: 10px 8px;
    border-radius: 5px;
    transition: all 0.2s ease;
    background: $comp-light-bg;
    &:focus {
      border: 1px solid $primary;
    }
  }
  .right-icon {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    // top: 50%;
    // transform: translate(0, -50%);

    right: 12px;
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
html.dark {
  .z-input {
    .z-input_inner {
      border: 1px solid $dark-border;
      background: $comp-dark-bg;
      color: $dark-color;
    }
  }
  .z-input-disabled {
    input {
      background: $dark-disabled;
    }
  }
}
.z-input-lg {
  input {
    padding: 14px 10px;
  }
}
.z-input-xs {
  input {
    padding: 6px 6px;
  }
}

.z-input-disabled {
  input {
    cursor: no-drop;
    background: $light-disabled;
  }
}
.z-input-clearable {
  input {
    padding-right: 22px;
  }
}
</style>
