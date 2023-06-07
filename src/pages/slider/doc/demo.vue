<template>
  <div>
    <h2>滑块</h2>
    {{ sliderValue }}
    <z-slider v-model="sliderValue" @change="change" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sliderValue = ref(10);

const change = (val) => {
  console.log(val);
};
</script>

<style scoped lang="scss"></style>
