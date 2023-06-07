<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-07 18:12:06
-->
<template>
  {{ modelValue }}
  <div :class="Class" ref="zSliderRef">
    <span class="z-slider__input" @mousedown="mousedown" @mouseup="mouseup">
      <div
        class="z-slider__bar"
        :style="{ width: mouseX + '%' }"
        @click="barClick"
      ></div>
      <div class="z-slider__button" v-move :style="{ left: mouseX + '%' }">
        <zSliderButton />
      </div>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "z-slider",
};
</script>

<script setup lang="ts">
import { ref, computed, watch, VNode } from "vue";
import { onMounted, nextTick } from "vue";
import { uuidv4 } from "../../utils/uuid";
import { useCompGlobal } from "../../utils/compGlobal";
import { Ref } from "vue";
import zSliderButton from "./slider-button.vue";
const { compSize, compType } = useCompGlobal();
const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  decimal: {
    type: Number,
    default: 0,
  },
});

const zSliderRef: Ref = ref(null);
// class setting
const Class = computed(() => {
  return [
    "z-slider",
    `z-slider--${compSize.value(props)}`,
    `z-slider--${compType.value(props)}`,
  ];
});

const mouseX: any = ref(props?.modelValue);

const vMove = {
  beforeMount(el: HTMLElement) {
    el.onmousedown = async function docMove(event: MouseEvent) {
      await nextTick();
      let barWidth = zSliderRef.value.offsetWidth;
      let x = event.clientX - el.offsetLeft;

      window.onmousemove = function docMove(e: MouseEvent) {
        let moveX = e.clientX - x;
        console.log(moveX);
        if (moveX < 0) moveX = 0;
        if (moveX > barWidth - el.offsetWidth / 2) moveX = barWidth;

        // 计算百分比
        mouseX.value = parseFloat(
          ((moveX / barWidth) * 100).toFixed(props.decimal)
        );

        emit("change", mouseX.value);
        emit("update:modelValue", mouseX.value);
      };
    };
    window.onmouseup = () => {
      window.onmousemove = null;
    };
  },
};

const barClick = (e: Event) => {
  console.log((e.target as HTMLElement).clientLeft);
};
const mousedown = (e) => {
  console.log(e.clientX, e.offsetLeft);
};
const mouseup = (e) => {};

onMounted(() => {});
</script>
