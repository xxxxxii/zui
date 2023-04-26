<template>
  <span :class="Class">
    <div class="z-tag__wrapper">
      <i v-if="icon" class="icon z-tag__wrapper__icon">
        <z-icon :name="icon" />
      </i>
      <slot />
      <i class="icon z-tag__wrapper__close" v-if="closeable" @click="tagClose">
        <z-icon name="icon-guanbijiantou"
      /></i>
    </div>
  </span>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "zTag",
});
</script>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  icon: {
    type: String,
  },
  closeable: Boolean,
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  plain: Boolean,
  bor: Boolean,
  round: Boolean,
});

const Class = computed(() => {
  return [
    "z-tag",
    `z-tag--${props.type}`,
    `z-tag--${props.size}`,
    props.plain ? `z-tag--${props.type}--plain` : "",
    props.bor ? `z-tag--${props.type}--border` : "",
    props.round ? `is-round` : "",
  ];
});
const emit = defineEmits(["close"]);

const tagClose = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.z-tag {
  display: inline-flex;
  font-size: 12px;
  padding: 0px 8px;
  height: 24px;
  align-items: center;
  justify-content: space-between;
  color: $dark-color;
  border-radius: 4px;

  &--lg {
    height: 32px;
    padding: 0px 10px;
  }
  &--md {
    height: 24px;
    padding: 0px 8px;
  }
  &--xs {
    height: 20px;
    padding: 0px 6px;
  }
  .z-tag__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      margin: 2px;
      width: 14px;
      height: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .z-tag__wrapper__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      margin: 0 0 0 5px;
      font-size: 10px;
      cursor: pointer;
      &:hover {
        background: rgba($color: #000000, $alpha: 0.1);
        border-radius: 50%;
      }
    }
  }
}

.z-tag--success {
  background: $success;
  &--plain {
    background: rgba($color: $success, $alpha: 0.1);
    color: $success;
  }
  &--border {
    border: solid 1px $success;
  }
}
.z-tag--primary {
  background: $primary;
  &--plain {
    background: rgba($color: $primary, $alpha: 0.1);
    color: $primary;
  }
  &--border {
    border: solid 1px $primary;
  }
}
.z-tag--info {
  background: $info;
  &--plain {
    background: rgba($color: $info, $alpha: 0.1);
    color: $info;
  }
  &--border {
    border: solid 1px $info;
  }
}
.z-tag--warning {
  background: $warning;
  &--plain {
    background: rgba($color: $warning, $alpha: 0.1);
    color: $warning;
  }
  &--border {
    border: solid 1px $warning;
  }
}
.z-tag--danger {
  background: $danger;
  &--plain {
    background: rgba($color: $danger, $alpha: 0.1);
    color: $danger;
  }
  &--border {
    border: solid 1px $danger;
  }
}

.is-round {
  border-radius: 999px;
}
</style>
