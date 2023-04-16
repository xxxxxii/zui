<template>
  <div>
    <div class="">
      <h2>是否显示输入总数：showWordCount</h2>
      <z-textarea v-model="textareaVal" :rows="10" showWordCount />
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
