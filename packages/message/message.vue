<template>
  <transition name="message" @before-leave="onClose" @after-leave="onDestroy">
    <div :style="{ top: topOffset + 'px' }" :class="zClass" v-if="visiable">
      <z-icon v-show="isIcon" :name="iconName" :color="iconColor"  size="16"></z-icon>
      <span>
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, onUnmounted } from "vue";
import zIcon from "../icon";
const props = defineProps({
  topOffset: {
    type: Number,
    required: true,
    default: 20,
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  id: {
    type: String,
    required: true,
  },
  onDestroy: {
    type: Function,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  type: {
    type: String,
    default: "success",
  },
  center: {
    type: Boolean,
    default: false,
  },
  isIcon: {
    type: Boolean,
    default: true,
  },
});

const iconType = ref({
  success: "icon-pro-success",
  warning: "icon-warning",
  info: "icon-huodongxiangqu",
  error: "icon-error",
});

const iconIconType = ref({
  success: "#52c41a",
  warning: "#ffc107",
  info: "#0dcaf0",
  error: "#ce2435",
});

const iconName = computed(() => {
  return iconType.value[props.type];
});
const iconColor = computed(() => {
  return iconIconType.value[props.type];
});
const zClass = computed(() => {
  return [
    "z-message",
    `z-message-${props.type}`,
    props.center ? "is-center" : "",
    props.isIcon ? "" : "",
  ];
});

const visiable = ref(false);

let timer = null;
const timeStart = () => {
  timer = setTimeout(() => {
    visiable.value = false;
  }, props.duration);
};
onMounted(() => {
  visiable.value = true;
  timeStart();
});

onUnmounted(() => {});
</script>

<style scoped lang="scss">
.message-enter-active,
.message-leave-active {
  transition: transform 0.4s, opacity 0.4s;
}

.message-enter-from {
  transform: translate(-50%, -100%);
  opacity: 0;
}

.message-leave-to {
  transform: translate(-50%, -20px) !important;
  opacity: 0;
}

.z-message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(119, 119, 118);
  border-radius: 5px;
  padding: 0.5rem;
  z-index: 999;
  transition: all 0.4s linear;
  display: flex;
  align-items: center;
  line-height: 14px;
  > .z-icon {
    margin-right: 6px;
  }
}

.is-center {
  justify-content: center;
  min-width: 300px;
}
.message-icon {
  width: 1rem;
  height: 1rem;
}

.z-message-success {
  background: $second-success;
  color: $success;
}
.z-message-warning {
  background: $second-warning;
  color: $warning;
}
.z-message-info {
  background: $second-info;
  color: $info;
}
.z-message-error {
  background: $second-danger;
  color: $danger;
}
</style>
