<template>
  <div>
    <h2>基础使用</h2>
    <z-button type="primary" @click="showDialog = true"> show dialog </z-button>
    <z-dialog title="this Title" v-model="showDialog">
      <!-- <template #header> 123566713421714 </template> -->
      <div>this is dialog content</div>
    </z-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showDialog = ref(false);
</script>
