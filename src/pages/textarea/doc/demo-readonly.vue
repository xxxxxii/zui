<template>
  <div>
    <div class="">
      <h2>只读：readonly</h2>
      <z-textarea v-model="textareaVal" readonly />
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
