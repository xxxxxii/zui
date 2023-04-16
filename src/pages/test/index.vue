<template>
  <div class="mask" id="mask">
    <h3>拖拽到这里上传</h3>
  </div>
  <div class="upload-progress" v-if="allFileList.length > 0">
    <div class="item" v-for="item in allFileList">
      <div class="item-name">{{ item.name }}</div>
      <div class="item-progress">
        <!-- <z-progress
          :height="3"
          :dept="item.percentage || 0"
          :text="item.percentage + '%'"
          showTxt
        /> -->
        {{ item.percentage }}
        <div class="file-progress">
          <div
            class="file-progress-bar"
            :style="{ width: item.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

const show = ref<boolean>(true); // 是否展示遮罩
const fileList = ref<any>([]); // 上传的文件列表
const allFileList = ref<any>([]); // 上传的文件列表
const accept = ref<string>(".jpg,.gif,.png,.jpeg");
const uploadSetting = reactive({
  action: "/api/user/upload", //上传地址
  autoUpload: true, //是否自动上传
});
let tempIndex = 0; // 做一个标记
onMounted(() => {
  disableDefaultEvents();
  init();
});
// 初始化拖入事件
const init = () => {
  const ele = document.querySelector("body");
  if (ele) {
    ele.addEventListener("dragenter", () => {
      show.value = true;
    }); //拖后放
    ele.addEventListener("dragleave", (e: any) => {
      if (
        e.target.nodeName === "HTML" ||
        e.target === e.explicitOriginalTarget ||
        (!e.fromElement &&
          (e.clientX <= 0 ||
            e.clientY <= 0 ||
            e.clientX >= window.innerWidth ||
            e.clientY >= window.innerHeight))
      ) {
        show.value = false;
      }
    }); //拖离
    ele.addEventListener("drop", (e) => {
      show.value = false;
      e.preventDefault();
      onDrop(e);
    }); //拖进
  }
};
// 禁用默认拖拽事件
const disableDefaultEvents = () => {
  const doc = document.documentElement;
  doc.addEventListener("dragleave", (e) => e.preventDefault()); //拖离
  doc.addEventListener("drop", (e) => e.preventDefault()); //拖后放
  doc.addEventListener("dragenter", (e) => e.preventDefault()); //拖进
  doc.addEventListener("dragover", (e) => e.preventDefault()); //拖来拖去
};
// 拖入时的事件
const onDrop = (e: any) => {
  if (e.dataTransfer) {
    const list = [].slice.call(e.dataTransfer.files).filter((file) => {
      return true;
    });
    fileList.value = list.map((p) => {
      return handleStart(p);
    });
    allFileList.value.unshift(...fileList.value);
    console.log(fileList.value);
    if (uploadSetting.autoUpload) {
      if (uploadSetting.action === "") {
        throw "need action";
        return;
      }
      fileList.value.forEach((file: any) => {
        uploadFile(
          file.raw,
          function (progress) {
            file.percentage = progress;
            console.log(fileList.value, list);
            console.log(progress);
          },
          function (res) {
            console.log(res);
          }
        );
      });
    }
  }
};

// 处理文件列表返回值
const handleStart = (rawFile: any) => {
  rawFile.uid = Date.now() + tempIndex++;
  return {
    status: "ready",
    name: rawFile.name,
    size: rawFile.size,
    percentage: 0,
    uid: rawFile.uid,
    raw: rawFile,
  };
};

//文件上传方法
function uploadFile(file, onProgress, onSuccess) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    onSuccess(xhr);
  };
  xhr.upload.onprogress = (e) => {
    let progress = Math.floor((e.loaded / e.total) * 100);
    file.percentage = progress;
    onProgress(progress);
  };

  xhr.open("POST", "/api/user/upload");
  const form = new FormData();
  form.append("file", file);
  xhr.send(form);

  return function () {
    xhr.abort();
  };
}
</script>
<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 200px;
  border: 1px salmon solid;

  h3 {
    margin: -0.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }
}

.upload-progress {
  position: fixed;
  background-color: #fff;
  right: 0;
  bottom: 0;
  z-index: 9999;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  width: 500px;
  height: auto;
  padding: 10px 21px;

  .item {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 0;
    justify-content: space-between;

    .item-name {
      width: 30%;
    }

    .item-progress {
      width: 67%;
    }
  }
}
.file-progress {
  width: 100%;
  height: 5px;
  position: relative;
  .file-progress-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: red;
  }
}
</style>
