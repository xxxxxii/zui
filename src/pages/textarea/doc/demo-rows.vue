<template>
  <div>
    <div class="main-box">
      <h2>设置多少行：rows</h2>
      <z-textarea v-model="textareaVal" :rows="10" />
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
