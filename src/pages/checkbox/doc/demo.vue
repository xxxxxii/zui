<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-06 14:11:35
-->
<template>
  <div>
    <h2>单个使用</h2>
    <z-checkbox
      v-for="item in list"
      :key="item.value"
      :value="item.value"
      v-model="checked"
      :label="item.label"
    ></z-checkbox>

    <z-checkbox value="chongqing" label="重庆" disabled></z-checkbox>
    <z-checkbox
      value="chongqing"
      label="重庆"
      v-model="checked"
      disabled
    ></z-checkbox>
  </div>

  <div>
    <h2>size</h2>
    <z-checkbox
      v-for="item in list"
      :key="item.value"
      :size="item.size"
      :value="item.value"
      v-model="checked"
      :label="item.label"
    ></z-checkbox>
    <z-checkbox
      value="beijing"
      label="北京"
      indeterminate
      size="lg"
    ></z-checkbox>
    <z-checkbox
      value="beijing"
      label="北京"
      indeterminate
      size="md"
    ></z-checkbox>
    <z-checkbox
      value="beijing"
      label="北京"
      indeterminate
      size="xs"
    ></z-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const list = ref([
  {
    label: "香蕉",
    value: "1",
    size: "lg",
  },
  {
    label: "苹果",
    value: "2",
    size: "md",
  },
]);

const checked = ref(true);
</script>

<style scoped>
.z-checkbox {
  padding: 10px;
}
</style>
