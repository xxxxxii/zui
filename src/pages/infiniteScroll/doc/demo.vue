<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-05 14:40:07
-->
<template>
  <div>
    <h2>无限滚动</h2>
    <z-infinite-scroll :listData="listData" :num="4"> </z-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";

// 生成1000000条数据
function getData() {
  let data = [];
  for (var i = 0; i < 1000; i++) {
    data.push({
      name: "test" + i,
      id: i,
      template: h("div", {}, [
        h("img", {
          src: "https://blogyl.xyz/_nuxt/banner.b86feb61.jpg",
          height: "300",
          style: {
            width: "100%",
            objectFit: "cover",
          },
        }),
        h("h2", i),
      ]),
    });
  }
  return data;
}

const listData = getData();
</script>

<style scoped lang="scss">
.z-infinite-scroll {
  width: 100%;
  height: 800px;
  // overflow: hidden;
  overflow-y: auto;
}
</style>
