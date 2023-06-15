<!--
 * @Description: 
 * @version: 
 * @Author: yulinZ
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-14 21:57:03
-->
<template>
  <div class="z-icon">
    <svg
      class="icon"
      aria-hidden="true"
      :color="color"
      :style="styles"
    >
      <use :xlink:href="`#${name}`"></use>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "zIcon",
};
</script>

<script setup lang="ts">
import "./font/iconfont.js";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: String,
    default: "14",
  },
  styles: {
    type: Object,
  },
});
</script>

<style scoped>
.z-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  fill: currentColor;
}
.icon {
  width: v-bind(size + "px");
  height: v-bind(size + "px");
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
