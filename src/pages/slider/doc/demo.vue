<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-08 11:36:50
-->
<template>
  <div>
    <h2>滑块</h2>
    {{ sliderValue }}
    <z-slider v-model="sliderValue" @change="change" />
  </div>
  <div>
    <h2>刻度 mark</h2>
    <z-slider v-model="sliderValue" @change="change" :mark="mark" />
  </div>
  <div>
    <h2>自定义颜色</h2>
    <z-slider
      v-model="sliderValue"
      @change="change"
      :mark="mark"
      track-bg="#d5ebe1"
      bar-color="#ea5514"
    />
  </div>
  <div>
    <h2>size</h2>
    <z-slider v-model="sliderValue" @change="change" :mark="mark" size="lg" />
    <z-slider v-model="sliderValue" @change="change" :mark="mark" size="md" />
    <z-slider v-model="sliderValue" @change="change" :mark="mark" size="xs" />
  </div>
  <div>
    <h2>range</h2>
    {{ sliderValue }}
    <z-slider v-model="sliderRangeValue" @change="change" range />
    <z-slider v-model="sliderRangeValue1" @change="change" range />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sliderValue = ref(10);

const sliderRangeValue = ref([20, 50]);

const sliderRangeValue1 = ref([10, 60]);

const mark = ref({
  0: {
    label: "0%",
  },
  10: "",
  40: {
    label: "40%",
  },
});

const change = (val) => {
  console.log(val);
};
</script>

<style scoped lang="scss"></style>
