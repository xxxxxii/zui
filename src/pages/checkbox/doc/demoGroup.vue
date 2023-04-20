<template>
  <div>
    <z-checkbox-group v-model="activeArray" @update="checkboxUpdate">
      <z-checkbox value="beijing" label="北京"></z-checkbox>
      <z-checkbox value="chongqing" label="重庆"></z-checkbox>
      <z-checkbox value="shanghai" label="上海"></z-checkbox>
    </z-checkbox-group>
  </div>
  {{ activeArray }}

  <div>
    <z-checkbox-group
      v-model="activeArray"
      @update="checkboxUpdate"
      mode="vertical"
    >
      <z-checkbox value="beijing" label="北京"></z-checkbox>
      <z-checkbox value="chongqing" label="重庆"></z-checkbox>
      <z-checkbox value="shanghai" label="上海"></z-checkbox>
    </z-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeArray = ref(["beijing"]);

const checkboxUpdate = (val) => {
  console.log(val);
};
</script>
