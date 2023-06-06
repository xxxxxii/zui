<template>
  <transition :name="'fade-' + direction">
    <div
      ref="drawerRef"
      :class="Class"
      v-show="modelValue"
      @click="maskClick && closeDiglog()"
    >
      <div
        class="z-drawer__wapwer"
        @click.stop="false"
        v-drag="{
          isDrag: draggable,
          parentPos: 'fixed',
          dragDom: '.z-drawer__header',
        }"
      >
        <div class="z-drawer__header">
          <slot name="header">
            <span class="z-drawer__title">
              <slot name="title"> {{ title }} </slot>
            </span>

            <button
              class="z-drawer__headerbtn"
              @click="closeDiglog"
              v-if="showClose"
            >
              <z-icon name="icon-guanbijiantou" />
            </button>
          </slot>
        </div>

        <div class="z-drawer__body scrollbar-box">
          <slot />
        </div>

        <div class="z-drawer__footer" v-if="useSlots().footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: "z-drawer",
};
</script>

<script setup lang="ts">
import { ref, useSlots, Ref, computed } from "vue";
import { drawerProps } from "./drawer";
import { Drag as vDrag } from "../../directives/drag";

const props = defineProps(drawerProps);
const emit = defineEmits(["update:modelValue", "close"]);

const Class = computed(() => {
  return [
    "z-drawer",
    props.mask ? "z-drawer-mask" : "",
    `z-drawer--${props.direction}`,
  ];
});

// 关闭diglog
function closeDiglog() {
  emit("close");
  emit("update:modelValue", false);
}

const drawerRef: Ref = ref(null);
</script>

<style lang="scss" scoped>
@import "@/assets/style/scrollbar.scss";
.z-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  &-mask {
    background: $mask;
  }
  &--right {
    .z-drawer__wapwer {
      right: 0;
      height: 100vh;
      animation: drawerRight 0.5s ease-out;
    }
  }
  &--left {
    .z-drawer__wapwer {
      left: 0;
      height: 100vh;
      animation: drawerLeft 0.5s ease-out;
    }
  }
  &--top {
    .z-drawer__wapwer {
      top: 0;
      width: 100vw;
      animation: drawerTop 0.5s ease-out;
    }
  }
  &--bottom {
    .z-drawer__wapwer {
      bottom: 0;
      width: 100vw;
      animation: drawerBottom 0.5s ease-out;
    }
  }
  &__wapwer {
    position: absolute;
    width: v-bind(width);
    z-index: 1000;
    background: $comp-light-bg;
    box-shadow: $border-light-shadow;
    display: flex;
    flex-direction: column;
    .z-drawer__header,
    .z-drawer__body,
    .z-drawer__footer {
      padding: 5px 10px;
    }

    .z-drawer__body {
      flex: 1;
      overflow-y: auto;
    }
    .z-drawer__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      .z-drawer__headerbtn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 32px;
        height: 32px;
        font-size: 16px;
        cursor: pointer;
        outline: none;
        border: none;
        background: none;
        padding: 0;
        color: $light-color;
        &:hover {
          //   background: #f0f0f0;
        }
      }
    }
  }
}

html.dark {
  .z-drawer {
    &__wapwer {
      background: $comp-dark-bg;
      box-shadow: $border-dark-shadow;
      .z-drawer__headerbtn {
        color: $dark-color;
      }
    }
  }
}

@keyframes drawerRight {
  to {
    transform: translate(0%, 0);
  }
  from {
    transform: translate(100%, 0);
  }
}
@keyframes drawerLeft {
  to {
    transform: translate(0, 0);
  }
  from {
    transform: translate(-100%, 0);
  }
}
@keyframes drawerTop {
  to {
    transform: translate(0, 0);
  }
  from {
    transform: translate(0, -100%);
  }
}

@keyframes drawerBottom {
  to {
    transform: translate(0, 0);
  }
  from {
    transform: translate(0, 100%);
  }
}

.fade-right-enter-active,
.fade-left-enter-active,
.fade-top-enter-active,
.fade-bottom-enter-active,
.fade-right-leave-active,
.fade-top-leave-active,
.fade-bottom-leave-active,
.fade-left-leave-active {
  transition: all 0.5s ease-in;
}

.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  .z-drawer__wapwer {
    transform: translate(100%, 0);
    transition: all 0.3s linear;
  }
}
.fade-left-enter-from,
.fade-left-leave-to {
  opacity: 0;
  .z-drawer__wapwer {
    transform: translate(-100%, 0);
    transition: all 0.3s linear;
  }
}
.fade-top-enter-from,
.fade-top-leave-to {
  opacity: 0;
  .z-drawer__wapwer {
    transform: translate(0, -100%);
    transition: all 0.3s linear;
  }
}
.fade-bottom-enter-from,
.fade-bottom-leave-to {
  opacity: 0;
  .z-drawer__wapwer {
    transform: translate(0, 100%);
    transition: all 0.3s linear;
  }
}
</style>
