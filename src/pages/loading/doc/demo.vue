<template>
  <div>
    <h2>全屏 loading</h2>
    <z-button @click="loading">loading</z-button>
  </div>
</template>

<script setup lang="ts">
import { ZLoading } from "../../../../packages";
// import { ZLoading } from "v3-yl-ui";

const loading = () => {
  ZLoading.server({});

  setTimeout(() => {
    ZLoading.stop();
  }, 4000);
};
</script>
