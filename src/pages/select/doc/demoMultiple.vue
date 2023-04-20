<template>
  <div>
    <h2>多选:multiple</h2>
    <z-select
      :options="options"
      v-model="value"
      multiple
      width="200px"
      @change="change"
      seach
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("");

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
  {
    label: "深圳",
    icon: "icon-tingche1",
    value: "5",
  },
  {
    label: "北京",
    icon: "icon-tingche1",
    value: "6",
  },
]);
const change = (val) => {
  console.log(val);
};
</script>
