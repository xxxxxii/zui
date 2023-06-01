<!--
 * @Author: xxxxxii 1973329248@qq.com
 * @Date: 2023-02-28 02:27:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-01 11:14:24
 * @FilePath: \z-ui\packages\button\button.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <button :disabled="disabled" :class="bClass">
    <span>
      <span v-if="loading" class="z-botton-loading">
        <z-icon :name="loadingIcon" />
      </span>
      <z-icon v-if="!loading && icon" :name="icon" />

      <span :class="{ 'z-button-text': icon }">
        <slot />
      </span>
    </span>
  </button>
</template>

<script lang="ts">
export default {
  name: "zButton",
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { useCompGlobal } from "../utils/compGlobal";
const { size } = useCompGlobal().gContent?.config;

const props = defineProps({
  type: {
    type: String,
  },
  size: {
    type: String,
  },
  icon: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
  plain: {
    type: Boolean,
  },
  round: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
  loadingIcon: {
    type: String,
    default: "icon-loading",
  },
});

const compSize = computed(() => {
  return props.size ? props.size : size ? size : "default";
});
const compTYpe = computed(() => {
  return props.type ? props.type : "default";
});
const bClass = computed(() => {
  return [
    "z-button",
    `z-button-${compTYpe.value}`,
    `z-button-${compSize.value}`,
    props.disabled ? "z-button-disabled" : "",
    props.loading ? "z-button-disabled" : "",
    props.plain ? "is-plain" : "",
    props.round ? "is-round" : "",
  ];
});
</script>

<style scoped lang="scss">
// 按钮基础样式
button {
  display: inline-flex;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  span {
    display: flex;
  }
}
.z-button {
  border: 1px solid #8e8e8e;
}
.z-button.is-round {
  border-radius: 20px;
}

// 按钮 size样式
.z-button-lg {
  padding: 12px 19px;
}
.z-button-md {
  padding: 9px 15px;
}
.z-button-xs {
  padding: 5px 11px;
}

// 按钮plain 和对应type 样式
.z-button-default {
  background: #fff;
}
.z-button-default.is-plain {
  color: #7f7f7f;
  border: 1px solid #7f7f7f;
  &:hover,
  &:focus {
    color: $primary;
    border: $primary solid 1px;
  }
}
.z-button-success {
  color: #fff;
  background: $success;
  border-color: $success;
}
.z-button-success.is-plain {
  color: $success;
  background: rgba($color: $success, $alpha: 0.1);
  border-color: rgba($color: $success, $alpha: 0.9);
  &:hover,
  &:focus {
    color: #fff;
    background: $success;
  }
}
.z-button-primary {
  color: #fff;
  background: $primary;
  border-color: $primary;
}
.z-button-primary.is-plain {
  color: $primary;
  background: rgba($color: $primary, $alpha: 0.1);
  border-color: rgba($color: $primary, $alpha: 0.9);
  &:hover,
  &:focus {
    color: #fff;
    background: $primary;
  }
}
.z-button-info {
  color: #fff;
  background: $info;
  border-color: $info;
}
.z-button-info.is-plain {
  color: $info;
  background: rgba($color: $info, $alpha: 0.1);
  border-color: rgba($color: $info, $alpha: 0.9);
  &:hover,
  &:focus {
    color: #fff;
    background: $info;
  }
}
.z-button-warning {
  color: #fff;
  background: $warning;
  border-color: $warning;
}
.z-button-warning.is-plain {
  color: $warning;
  background: rgba($color: $warning, $alpha: 0.1);
  border-color: rgba($color: $warning, $alpha: 0.9);
  &:hover,
  &:focus {
    color: #fff;
    background: $warning;
  }
}
.z-button-danger {
  color: #fff;
  background: $danger;
  border-color: $danger;
}
.z-button-danger.is-plain {
  color: $danger;
  background: rgba($color: $danger, $alpha: 0.1);
  border-color: rgba($color: $danger, $alpha: 0.9);
  &:hover,
  &:focus {
    color: #fff;
    background: $danger;
  }
}

// 按钮禁用
.z-button-disabled {
  opacity: 0.5;
  cursor: no-drop;
  &:hover,
  &:focus {
    opacity: 0.5;
  }
}
.z-button-text {
  padding: 0 0 0 6px;
}
.z-botton-loading {
  animation: rota 2s infinite;
}
@keyframes rota {
  to {
    transform: rotate(360deg);
  }
}
</style>
