<template>
  <div>
    <div class="">
      <h2>设置宽度:width</h2>
      <z-textarea v-model="textareaVal" :rows="10" showWordCount width="90%" />
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
