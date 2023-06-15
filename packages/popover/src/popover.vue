<template>
  <div
    v-click
    :id="compId"
    class="z-popover"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div class="z-popover__trigger" ref="popoverTriggerRef">
      <!-- @click="clickTrigger" -->
      <slot />
    </div>

    <transition name="popover">
      <div
        v-show="visible"
        class="z-popover__content"
        :style="contentStyle"
        ref="popoverContent"
      >
        <span v-if="$slots.content">
          <slot name="content" />
        </span>
        <span v-else class="z-popover__text">
          <div>{{ title }}</div>
          <div v-if="content" class="z-popover__text__content">
            {{ content }}
          </div>
        </span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: "z-popover",
};
</script>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { popoverProps } from "./popover";
import { onMounted, nextTick } from "vue";
import { uuidv4 } from "../../utils/uuid";
const emit = defineEmits(["hover", "clickTarget"]);
const props = defineProps(popoverProps);
console.log(props.width);

const vClick = {
  beforeMount(el) {
    const handler = (e) => {
      if (!props.selfSet) {
        if (el.contains(e.target)) {
          console.log(e.target);
          visible.value = !visible.value;
        } else {
          visible.value = false;
        }
      } else {
        emit("clickTarget", { el: el, target: e.target });
      }
    };
    document.addEventListener("click", handler);
  },
};

const compId = "popover-" + uuidv4();

const visible = ref(props.visible);
// visible.value = true;
const mouseenter = () => {
  emit("hover", true);
  if (props.trigger === "hover" && !props.selfSet) {
    visible.value = true;
    getContentHeight();
  }
};

const mouseleave = () => {
  emit("hover", false);
  if (props.trigger === "hover" && !props.selfSet) {
    visible.value = false;
  }
};

const clickTrigger = () => {
  if (props.trigger === "click") {
    visible.value = !visible.value;
    // getContentHeight();
  }
};

// 获取z-popover__content 的高度
const popoverContent = ref(null);
const popoverTriggerRef = ref(null);
const height = ref(null);
const triggerHeight = ref(null);

// 获取组件内容的高度
const getContentHeight = () => {
  nextTick(() => {
    let dom = popoverContent.value;
    triggerHeight.value = popoverTriggerRef.value.offsetHeight;
    height.value = dom.offsetHeight;
    console.log(triggerHeight.value);
  });
};
watch(
  () => props.visible,
  (newVal) => {
    visible.value = newVal;
  }
);
watch(
  () => visible.value,
  (newVal) => {
    if (newVal) {
      eventPos();
      window.addEventListener("scroll", eventPos);
    } else {
      window.removeEventListener("scroll", eventPos);
    }
  }
);

const aniYHeight = computed(() => {
  if (placement.value === "bottom") {
    return "-15px";
  } else {
    return "15px";
  }
});
const placement = ref(props.placement);
const contentStyle = computed(() => {
  if (placement.value === "bottom") {
    return {
      width: props.width,
      marginTop: "10px",
    };
  } else {
    return {
      width: props.width,
      bottom: triggerHeight.value + "px",
      marginBottom: "10px",
    };
  }
});
function offsetTop(elements) {
  var top = elements.offsetTop;
  var parent = elements.offsetParent;
  while (parent != null) {
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  // console.log(top);
  return top;
}

const eventPos = () => {
  nextTick(() => {
    getContentHeight();
    /*当前元素与页面顶部距离*/
    let currentDom = document.querySelector(
      "#" + compId + " >.z-popover__trigger"
    );
    let domBottomHeight =
      window.innerHeight -
      currentDom?.getBoundingClientRect().y -
      currentDom?.getBoundingClientRect().height;
    let domTopHeight = currentDom?.getBoundingClientRect().top;
    console.log(domTopHeight, domBottomHeight);
    if (props.placement === "bottom") {
      if (domBottomHeight > height.value) {
        placement.value = "bottom";
        console.log("ok", domBottomHeight, height.value);
      } else {
        placement.value = "top";
        console.log("no", domBottomHeight);
      }
    } else {
      if (domTopHeight > height.value) {
        placement.value = "top";
      } else {
        placement.value = "bottom";
      }
    }
  });
};

onMounted(() => {});
</script>

<style scoped lang="scss">
.popover-enter-active,
.popover-leave-active {
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
}

.popover-enter-from,
.popover-leave-to {
  transform: translate(0, v-bind(aniYHeight));
  opacity: 0;
  -webkit-transform: translate(0, v-bind(aniYHeight));
  -moz-transform: translate(0, v-bind(aniYHeight));
  -ms-transform: translate(0, v-bind(aniYHeight));
  -o-transform: translate(0, v-bind(aniYHeight));
}
.z-popover {
  position: relative;
  display: inline-block;
  width:  v-bind(width);

  &__content {
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    z-index: 1000;
    width: v-bind(width);
    background-color: $comp-light-bg;
    box-shadow: $border-light-shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    >span{
      width: 100%;
    }
  }
}
.z-popover__content {
}
.z-popover__text {
  display: block;
  box-sizing: border-box;
  padding: 5px 10px;
  &__content {
    word-break: break-all;
  }
}
html.dark {
  .z-popover {
    &__content {
      background-color: $comp-dark-bg;
      box-shadow: $border-dark-shadow;
    }
  }
}
</style>
