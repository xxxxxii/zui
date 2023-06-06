<!--
 * @Description: 
 * @version: 
 * @Author: yulinZ
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-06 10:41:34
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
}
.icon {
  width: v-bind(size + "px");
  height: v-bind(size + "px");
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
