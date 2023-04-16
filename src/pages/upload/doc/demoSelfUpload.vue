<template>
  <div>
    <h2>
      手动上传:
      可以调用组件自己的上传方法,也可以通过回调函数获取文件，使用自己的上传方式
    </h2>
    <div>
      <z-upload
        :uploadUrl="uploadUrl"
        ref="uploadRef"
        multiple
        :autoUpload="false"
      >
        <z-button type="primary">文件上传</z-button>
        <template #follow>
          <z-button class="upload-btn" @click="clickUpload">点击上传</z-button>
        </template>
      </z-upload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const uploadRef = ref(null);
const uploadUrl = "/api/user/upload";

const clickUpload = () => {
  // fileSingeUpload
  uploadRef.value!.fileSingeUpload();
};
</script>

<style scoped>
.upload-btn {
  margin: 10px;
}
</style>
