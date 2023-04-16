<template>
  <div>
    <h2>拖拽上传</h2>
    <z-upload uploadUrl="/api/user/upload" drop>
      <z-button type="primary">文件上传</z-button>
    </z-upload>

    <h2>自定义拖拽上传区域</h2>
    <z-upload uploadUrl="/api/user/upload" drop>
      <z-button type="primary">文件上传</z-button>
      <template #selfDrop>
        <div class="drop">拖拽上传</div>
      </template>
    </z-upload>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.drop {
  height: 300px;
  background-color: antiquewhite;
  cursor: pointer;
}
</style>
