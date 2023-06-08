<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-08 14:58:33
-->
<template>
  <div :class="Class" ref="zSliderRef">
    <span
      class="z-slider__input"
      @mousedown="mousedown"
      @mouseup="mouseup"
      :style="{ background: trackBg ? trackBg : '' }"
    >
      <div class="z-slider__bar" :style="barStyle" @click="barClick"></div>
      <div class="z-slider__button" v-move :style="{ left: mouseX + '%' }">
        <z-popover
          :placement="placement"
          :visible="tipShow"
          :title="mouseX"
          width="30px"
        >
          <zSliderButton />
        </z-popover>
      </div>
      <div
        v-if="range"
        class="z-slider__button--start"
        v-move
        :style="{ left: mouseXStart + '%' }"
      >
        <z-popover
          :placement="placement"
          :visible="tipShow"
          :title="mouseXStart"
          width="30px"
        >
          <zSliderButton />
        </z-popover>
      </div>

      <template v-if="mark">
        <div
          class="z-slider__markbox"
          v-for="(value, key, index) in mark"
          :key="index"
          :style="{ left: key + '%' }"
        >
          <div class="z-slider__mark"></div>
          <div class="z-slider__markpos">
            <div v-if="value?.label" class="z-slider__scale">
              {{ value?.label }}
            </div>
          </div>
        </div>
      </template>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "z-slider",
};
</script>

<script setup lang="ts">
import { ref, computed, watch, VNode, Ref } from "vue";
import { onMounted, nextTick } from "vue";
import { uuidv4 } from "../../utils/uuid";
import { useCompGlobal } from "../../utils/compGlobal";
import { getType } from "../../utils";
import zSliderButton from "./slider-button.vue";
const { compSize, compType } = useCompGlobal();
const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: [Number, Array],
    default: 0,
  },
  decimal: {
    type: Number,
    default: 0,
  },
  range: {
    type: Boolean,
  },
  mark: {
    type: Object,
  },
  type: {
    type: String,
  },
  trackBg: {
    type: String,
  },
  barColor: {
    type: String,
  },
  size: {
    type: String,
  },
  placement: {
    type: String,
    default: "top",
  },
});

const tipShow = ref(false);

const zSliderRef: Ref = ref(null);
// class setting
const Class = computed(() => {
  return [
    "z-slider",
    `z-slider--${compSize.value(props)}`,
    `z-slider--${compType.value(props)}`,
  ];
});

// bar css setting
const barStyle = computed(() => {
  if (!props.range) {
    return {
      width: mouseX.value + "%",
      background: props?.barColor ? props?.barColor : "",
    };
  } else
    return {
      width: mouseX.value - mouseXStart.value + "%",
      left: mouseXStart.value + "%",
      background: props?.barColor ? props?.barColor : "",
    };
});

const mouseX: any = ref(
  props?.range ? props?.modelValue[1] : props?.modelValue
);

const mouseXStart: any = ref(props?.range ? props?.modelValue[0] : 0);

// range init
if (props?.range && mouseX.value < mouseXStart.value) {
  mouseX.value = mouseXStart.value;
}

const mark = ref({});
console.log(getType(mark.value[0]) === "Object");
// mark init
if (props.mark) {
  for (let key in props.mark) {
    if (typeof props.mark[key] === "string" && props.mark[key] != "") {
      mark.value[key] = {
        label: props.mark[key],
      };
    } else {
      mark.value[key] = props.mark[key];
    }
  }
}

const vMove = {
  beforeMount(el: HTMLElement) {
    console.log(el.className);
    let domClass = el.className;

    el.onmouseleave = () => {
      tipShow.value = false;
    };
    el.onmousedown = async function docMove(event: MouseEvent) {
      await nextTick();
      document.onselectstart = function () {
        return false;
      };
      let barWidth = zSliderRef.value.offsetWidth;
      let x = event.clientX - el.offsetLeft;

      window.onmousemove = function docMove(e: MouseEvent) {
        tipShow.value = true;
        let moveX = e.clientX - x;
        console.log(moveX);
        if (moveX < 0) moveX = 0;
        if (moveX > barWidth - el.offsetWidth / 2) moveX = barWidth;

        // 计算百分比
        if (domClass === "z-slider__button--start") {
          console.log(domClass);
          if (mouseXStart.value >= mouseX.value) {
            mouseX.value = mouseXStart.value;
            el.style.zIndex = "1000";
          }
          mouseXStart.value = parseFloat(
            ((moveX / barWidth) * 100).toFixed(props.decimal)
          );
          emit("change", [mouseXStart.value, mouseX.value]);
          emit("update:modelValue", [mouseXStart.value, mouseX.value]);
        } else {
          if (mouseXStart.value >= mouseX.value) {
            mouseXStart.value = mouseX.value;
            el.style.zIndex = "1000";
          }
          mouseX.value = parseFloat(
            ((moveX / barWidth) * 100).toFixed(props.decimal)
          );
          emit("change", mouseX.value);
          emit("update:modelValue", mouseX.value);
        }
      };
    };
    window.onmouseup = () => {
      window.onmousemove = null;
      document.onselectstart = null;
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
