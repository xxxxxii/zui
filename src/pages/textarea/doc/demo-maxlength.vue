<template>
  <div>
    <div class="">
      <h2>设置最大输入值：maxlength</h2>
      <z-textarea v-model="textareaVal" :maxlength="10" />
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
