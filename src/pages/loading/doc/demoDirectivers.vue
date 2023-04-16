<template>
  <div>
    <h2>指令方式</h2>
    <div class="box" v-loading="isLoading">test</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isLoading = ref(true);

// setTimeout(() => {
//   isLoading.value = false;
// }, 5000);
</script>

<style scoped>
.box {
  height: 400px;
  width: 400px;
}
</style>
