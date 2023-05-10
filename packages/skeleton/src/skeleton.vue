<script setup lang="ts" name="z-skeleton">
defineProps({
  bg: {
    //背景颜色
    type: String,
    default: "#efefef",
  },
  width: {
    //宽度
    type: Number,
  },
  height: {
    //高度
    type: Number,
  },
  animated: {
    // 动画
    type: Boolean,
    default: false,
  },
  fade: {
    // 淡入淡出
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="skeleton"
    :style="{ width: width + 'px', height: height + 'px' }"
    :class="{ shan: animated, fade }"
  >
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>

<style lang="scss" scoped>
.skeleton {
  display: inline-block;
  position: relative;
  // overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}

.fade {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
