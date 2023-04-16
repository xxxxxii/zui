<template>
  <div>
    <div>
      <h2>使用</h2>
      <z-textarea v-model="textareaVal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const textareaVal = ref("");
</script>

<style scoped></style>
