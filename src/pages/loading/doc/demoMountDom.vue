<template>
  <div>
    <h2>挂载元素上</h2>
    <div class="loading-box"></div>
    <z-button @click="loading">loading</z-button>
  </div>
</template>

<script setup lang="ts">
import { ZLoading } from "../../../../packages";

const loading = () => {
  ZLoading.server({
    el: ".loading-box",
    text: "获取数据中",
    icon: `
    <svg
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        fill="red"
        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </path>
    </svg>
      `,
  });
  //   setTimeout(() => {
  //     ZLoading.stop();
  //   }, 4000);
};
</script>

<style scoped>
.loading-box {
  height: 200px;
  width: 200px;
  background-color: bisque;
  /* position: relative; */
}
</style>
