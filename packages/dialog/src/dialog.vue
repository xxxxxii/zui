<template>
  <transition name="fade">
    <div
      ref="dialogRef"
      :class="Class"
      v-if="modelValue"
      @click="maskClick && closeDiglog()"
    >
      <div
        class="z-dialog__wapwer"
        v-if="modelValue"
        @click.stop="false"
        v-drag="{
          isDrag: draggable,
          parentPos: 'fixed',
          dragDom: '.z-dialog__header',
        }"
      >
        <div class="z-dialog__header">
          <slot name="header">
            <span class="z-dialog__title">
              <slot name="title"> {{ title }} </slot>
            </span>

            <button
              class="z-dialog__headerbtn"
              @click="closeDiglog"
              v-if="showClose"
            >
              <z-icon name="icon-guanbijiantou" />
            </button>
          </slot>
        </div>
        <div class="z-dialog__body">
          <slot />
        </div>
        <div class="z-dialog__footer" v-if="useSlots().footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: "z-dialog",
};
</script>

<script setup lang="ts">
import { ref, useSlots, Ref, computed } from "vue";
import { diglogProps } from "./dialog";
import { Drag as vDrag } from "../../directives/drag";
import { watch } from "vue";

const props = defineProps(diglogProps);
const emit = defineEmits(["update:modelValue", "close"]);

const Class = computed(() => {
  return ["z-dialog", props.mask ? "z-dialog-mask" : ""];
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }
);

// 关闭diglog
function closeDiglog() {
  emit("close");
  emit("update:modelValue", false);
}

const dialogRef: Ref = ref(null);
</script>

<style lang="scss" scoped>
.z-dialog {
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
  &__wapwer {
    position: absolute;
    top: v-bind(top);
    width: v-bind(width);
    z-index: 1000;
    height: fit-content;
    background: $comp-light-bg;
    box-shadow: $border-light-shadow;
    border-radius: 3px;
    .z-dialog__header,
    .z-dialog__body,
    .z-dialog__footer {
      padding: 5px 10px;
    }
    .z-dialog__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      .z-dialog__headerbtn {
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
  .z-dialog {
    &__wapwer {
      background: $comp-dark-bg;
      box-shadow: $border-dark-shadow;
      .z-dialog__headerbtn {
        color: $dark-color;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
