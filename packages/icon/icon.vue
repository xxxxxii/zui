<!--
 * @Description: 
 * @version: 
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 11:35:54
-->
<template>
  <div class="z-icon">
    <svg
      class="icon"
      aria-hidden="true"
      :font-size="size"
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
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
