<template>
  <div>
    <div class="">
      <h2>设置提示：placeholder</h2>
      <z-textarea v-model="textareaVal" placeholder="请输入" />
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
