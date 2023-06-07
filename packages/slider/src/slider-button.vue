<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-07 16:37:22
-->
<template>
  <!-- <z-popover placement="top" title="title"> -->
  <div class="z-slider__dot">
    <div class="z-slider__mark"></div>
  </div>
  <!-- </z-popover> -->
</template>

<script lang="ts">
export default {
  name: "z-slider-button",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style scoped lang="scss">
@include b("slider") {
  @include e("dot") {
    @include e("mark") {
      position: relative;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: $primary;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: "";
        width: 80%;
        height: 80%;
        background: #fff;
        border-radius: 50%;
        @extend .pos-center;
      }
    }
  }
}
</style>
