<template>
  <div :class="Class">
    <div class="loader z-loading--loader">
      <div v-if="loadingType === 'dot' && !icon" class="dot-box">
        <div class="dot" v-for="item in 5"></div>
      </div>
      <div v-if="loadingType === 'round' && !icon" class="round loading">
        <svg
          version="1.1"
          id="loader-1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 40 40"
          enable-background="new 0 0 40 40"
          xml:space="preserve"
        >
          <path
            opacity="0.2"
            fill="#000"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          ></path>
          <path
            fill="#000"
            d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.5s"
              repeatCount="indefinite"
            ></animateTransform>
          </path>
        </svg>
      </div>
      <div v-if="icon" class="loading" v-html="icon"></div>
      <div class="tip-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, computed } from "vue";

const props = defineProps({
  bg: {
    type: String,
    default: "rgba(1, 1, 1, .7)",
  },
  text: {
    type: String,
  },
  loadingType: {
    type: String,
    default: "round",
  },
  icon: {
    type: String,
  },
  elH: {
    type: Number,
  },
});

const Class = computed(() => {
  return ["mask", "z-loading"];
});

const bgColor = computed(() => {
  return props.bg;
});

const bgSize = computed(() => {
  if (!props.elH) {
    let size = 70;
    if (props.loadingType === "dot") {
      size = 20;
    }
    return `${size}px`;
  } else {
    let size = props.elH * 0.5;
    if (props.loadingType === "dot") {
      size = props.elH * 0.2;
    }
    if (size > 70) {
      size = 70;
    }
    return `${size}px`;
  }
});
</script>

<style lang="scss" scoped>
.mask,
.z-loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: v-bind(bgColor);
  z-index: 1000;
  .loader {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 40%;
    margin-left: 10%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tip-text {
    color: #ededed;
    padding-top: 0.1em;
    font-size: 12px;
  }

  .round {
    width: v-bind(bgSize);
    height: v-bind(bgSize);
    color: $primary;
    svg path,
    svg rect {
      fill: $primary;
    }
  }
  .dot {
    width: v-bind(bgSize);
    height: v-bind(bgSize);
    border-radius: 100%;
    display: inline-block;
    animation: slide 1s infinite;
  }
  .dot:nth-child(1) {
    animation-delay: 0.1s;
    background: $primary;
  }
  .dot:nth-child(2) {
    animation-delay: 0.2s;
    background: $primary;
  }
  .dot:nth-child(3) {
    animation-delay: 0.3s;
    background: $primary;
  }
  .dot:nth-child(4) {
    animation-delay: 0.4s;
    background: $primary;
  }
  .dot:nth-child(5) {
    animation-delay: 0.5s;
    background: $primary;
  }
}

@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
