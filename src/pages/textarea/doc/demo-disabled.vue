<template>
  <div>
    <div class="">
      <h2>禁用：disabled</h2>
      <z-textarea v-model="textareaVal" disabled />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const textareaVal = ref("");
</script>

<style scoped>
.main-box {
  width: 300px;
}
</style>
