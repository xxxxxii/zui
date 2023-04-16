<template>
  <div>
    <h2>select:size</h2>
    <z-select v-model="value" size="lg"> </z-select>
    <z-select v-model="value"> </z-select>
    <z-select v-model="value" size="xs"> </z-select>
  </div>

  <div>
    <h2>select</h2>
    <z-select :options="options" v-model="value1" width="100px" />
    <z-select :options="options" v-model="value1" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
const value1 = ref("");

const options = ref([
  {
    label: "重庆",
    icon: "icon-tingche1",
    value: "1",
  },
  {
    label: "上海",
    icon: "icon-tingche1",
    value: "2",
  },
  {
    label: "成都",
    icon: "icon-tingche1",
    value: "3",
  },
  {
    label: "广州",
    icon: "icon-tingche1",
    value: "4",
  },
]);
</script>
