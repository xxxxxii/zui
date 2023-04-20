<template>
  <div>
    <h2>select</h2>
    <z-select v-model="value" size="lg" width="100%" @change="change">
    </z-select>
  </div>
  <div></div>

  <div>
    <h2>select</h2>
    <z-select :options="options" v-model="value1" width="100px"> </z-select>
    <z-select :options="options" v-model="value1"> </z-select>
  </div>

  <div>
    <h2>可搜索</h2>
    <z-select :options="options" v-model="value1" width="100px" seach>
    </z-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref("1");
const value1 = ref("1");
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

const change = (val) => {
  console.log(val);
};
</script>
