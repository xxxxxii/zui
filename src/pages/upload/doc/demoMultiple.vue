<template>
  <div>
    <h2>多文件选择：multiple</h2>
    <h2>基础使用</h2>
    <z-upload uploadUrl="/api/user/upload" multiple :fileList="[]">
      <z-button type="primary">文件上传</z-button>
      <template #tip>
        <span> 请上传图片 </span>
      </template>
    </z-upload>
  </div>
</template>

<script setup lang="ts"></script>
