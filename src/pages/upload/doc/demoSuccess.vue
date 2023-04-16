<template>
  <div>
    <h2>
      事件回调：onSuccess:文件上传成功回调，fileChange：文件选择改变回调,fileDel:文件删除回调
    </h2>
    <z-upload
      uploadUrl="/api/user/upload"
      @fileChange="fileChange"
      @onSuccess="fileSuccess"
      @fileDel="fileDel"
      @beferUpload="beferUpload"
      :fileList="fileList"
      multiple
      ref="uploadRef"
    >
      <z-button class="upload-btn" type="primary">点击上传</z-button></z-upload
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const uploadRef = ref(null);

const fileList = ref([
  {
    name: "test.md",
  },
]);

const fileSuccess = ({ fileList, resData, files }) => {
  console.log(fileList, files, resData);
};

const fileChange = ({ fileList, files }) => {
  console.log(fileList, files);
  //   uploadRef.value.fileList = [...files];
};

const fileDel = ({ item, index }) => {
  console.log(item, index);
};
const beferUpload = (files) => {
  console.log(files, "222222222222");
};
</script>
