<template>
  <div>
    <h2>文件大小数量限制：limit</h2>
    <z-upload
      uploadUrl="/api/user/upload"
      :limit="{
        maxFiles: 2,
        size: 1024,
      }"
      :fileList="fileList"
      multiple
    >
      <z-button type="primary">文件上传</z-button></z-upload
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fileList = ref([
  {
    name: "test.md",
  },
]);
</script>
