<template>
  <div>
    <z-checkbox
      v-for="item in list"
      :key="item.value"
      :value="item.value"
      v-model="checked"
      :label="item.label"
    ></z-checkbox>

    <z-checkbox value="beijing" label="北京" indeterminate></z-checkbox>

    <z-checkbox value="chongqing" label="重庆" disabled></z-checkbox>
    <z-checkbox
      value="chongqing"
      label="重庆"
      v-model="checked"
      disabled
    ></z-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const list = ref([
  {
    label: "香蕉",
    value: "1",
  },
  {
    label: "苹果",
    value: "2",
  },
]);

const checked = ref(true);
</script>

<style scoped>
.z-checkbox {
  padding: 10px;
}
</style>
