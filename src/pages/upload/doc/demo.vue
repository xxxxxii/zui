<template>
  <div>
    <h2>基础使用</h2>
    <z-upload uploadUrl="/api/user/upload" :fileList="fileList">
      <z-button type="primary">文件上传</z-button>
      <template #tip>
        <span> 请上传图片 </span>
      </template>
    </z-upload>
  </div>
</template>

<script setup lang="ts">
const fileList = [
  {
    name: "test.md",
    status: "success",
  },
];
</script>
