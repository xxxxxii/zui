<template>
  <div>
    <h2>无限滚动</h2>
    <z-infinite-scroll>
      <z-infinite-scroll-item v-for="(item, index) in listData" :key="index">
        {{ item }}
      </z-infinite-scroll-item>
    </z-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 生成1000000条数据
function getData() {
  let data = [];
  for (var i = 0; i < 1000; i++) {
    data.push({
      name: "test" + i,
      id: i,
    });
  }
  return data;
}

const listData = getData();
</script>

<style scoped lang="scss"></style>
