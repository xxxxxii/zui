<!--
 * @Description: 
 * @version: 
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 14:15:06
-->
<template>
  <div>
    <z-color-picker v-model="colorValue" size="lg">
      {{ colorValue }}</z-color-picker
    >
    <z-color-picker v-model="colorValue"> {{ colorValue }}</z-color-picker>
    <z-color-picker v-model="colorValue" size="xs">
      {{ colorValue }}</z-color-picker
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const colorValue = ref("#434343");
</script>

<style scoped lang="scss"></style>
