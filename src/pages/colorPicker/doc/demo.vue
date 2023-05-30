<!--
 * @Description: 
 * @version: 
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 15:08:15
-->
<template>
  <div>
    <z-color-picker v-model="colorValue"> {{ colorValue }}</z-color-picker>
  </div>
  <div>
    <z-date-picker></z-date-picker>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const colorValue = ref("#434343");
</script>

<style scoped lang="scss"></style>
