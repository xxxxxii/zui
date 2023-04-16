<template>
  <div class="z-upload-box">
    <input
      type="file"
      class="file-input"
      ref="uploadFileRef"
      name="file"
      @change="fileChange"
      :multiple="multiple"
    />

    <!-- drop start -->
    <div
      class="z-upload--drop-box"
      v-if="drop"
      @click="selectChange"
      ref="dropRef"
    >
      <div v-if="hasSlot('selfDrop')">
        <slot name="selfDrop"></slot>
      </div>
      <div v-else class="drop-box--comp_self">
        <z-icon color="#6990f2" size="60" name="icon-yunshangchuan" />
        <span>{{ dropPrompt }}</span>
      </div>
    </div>
    <!-- drop end -->
    <span v-else @click="selectChange"><slot /></span>
    <span> <slot name="follow"></slot></span>
    <div class="z-upload-tip">
      <slot name="tip"></slot>
    </div>

    <div v-if="errorInfo" class="error-box">
      <span>{{ errorInfo }}</span>
    </div>
    <!-- <div class="file-list-box">
      <li v-for="(item, index) in fileList" :key="index">
        <span>{{ item.name }}</span>
        <span class="del-icon" @click="delFile(item, index)">
          <z-icon name="icon-close" />
        </span>
      </li>
    </div> -->

    <section v-if="showFileList" class="progress-area z-upload-file-list">
      <li class="row" v-for="(item, index) in fileList" :key="index">
        <!-- <i class="fas fa-file-alt"></i> -->
        <z-icon color="#6990f2" size="30" name="icon-dingdan" />
        <div class="content">
          <div class="content-main">
            <div class="details">
              <span class="name">{{ item.name }}</span>
              <span class="percent">
                <div v-if="item.status === 'uploading'">
                  {{ item.percentage }}%
                </div>

                <div v-if="item.status === 'success'">
                  <z-icon
                    name="icon-pro-success"
                    class="file-status--success"
                    style="font-size: 16px"
                    color="#2ed573"
                  ></z-icon>
                </div>
                <div v-if="item.status === 'error'">
                  <z-icon
                    name="icon-warning"
                    class="file-status--error"
                    color="#ff4757"
                  ></z-icon></div
              ></span>
            </div>
            <div v-if="item.status != 'success'" class="progress-bar">
              <div
                class="progress"
                :style="{ width: item.percentage + '%' }"
              ></div>
            </div>
          </div>
          <div class="content-option">
            <span>
              <z-icon
                name="icon-error"
                @click="cancelFile(item, index)"
              ></z-icon
            ></span>
          </div>
        </div>
      </li>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: "zUpload",
};
</script>

<script setup lang="ts">
import { onMounted, ref, watch, useSlots } from "vue";
import zIcon from "../icon";

const slots: any = useSlots();
const hasSlot = (name) => !!slots[name];
onMounted(() => {
  console.log();
});

const errorInfo = ref(null);
const dropRef = ref(null);
const dropPrompt = ref("拖入或点击文件上传");

const emit = defineEmits(["fileChange", "fileDel", "onSuccess", "beferUpload"]);

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  fileList: {
    type: Array,
  },
  drop: {
    type: Boolean,
    default: false,
  },
  uploadUrl: {
    type: String,
  },
  limit: {
    type: Object,
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
  // 是否自动上传
  autoUpload: {
    type: Boolean,
    default: true,
  },
});

const currentList = ref([]);

const fileList: any = ref(props.fileList ? props.fileList : []);
const uploadFileRef = ref(null);

// 向外暴露的值和方法
defineExpose({
  fileUpload,
  fileSingeUpload,
});
// 文件选择按钮
const selectChange = () => {
  uploadFileRef.value.click();
};

let tempIndex = 0; // 做一个标记
// 处理文件列表返回值
const handleStart = (rawFile: any) => {
  rawFile.uid = Date.now() + tempIndex++;
  return {
    status: "uploading",
    name: rawFile.name,
    size: rawFile.size,
    percentage: 0,
    uid: rawFile.uid,
    raw: rawFile,
  };
};

// 文件改变
const fileChange = async (e) => {
  errorInfo.value = null;
  if (e.target) {
    fileSeting(e.target.files);
  }

  // fileList.value.unshift(...e.target.files);
  // currentList.value = e.target.files;
  // emit("fileChange", {
  //   fileList: fileList.value,
  //   files: currentList.value,
  // });

  // if (props.uploadUrl) {
  //   fileUpload();
  // }
};

const fileSeting = async (files) => {
  let checkFileList = [...fileList.value, ...files];
  let checkRes = await checkFile(checkFileList);
  if (!checkRes) {
    return;
  }
  const list = [].slice.call(files).filter((file) => {
    return true;
  });
  currentList.value = list.map((p) => {
    return handleStart(p);
  });
  fileList.value.unshift(...currentList.value);

  emit("fileChange", {
    fileList: fileList.value,
    files: currentList.value,
  });

  if (props.autoUpload) {
    fileSingeUpload();
  }
};

function fileSingeUpload() {
  currentList.value.forEach((file: any) => {
    file["cancel"] = uploadFile(
      file.raw,
      function (progress) {
        file.percentage = progress;
      },
      function (res) {
        console.log(res);
        emit("onSuccess", {
          fileList: fileList.value,
          files: currentList.value,
          resData: res,
        });
        if (res.status === 201) {
          file.status = "success";
        } else {
          file.status = "error";
        }
      }
    );
  });
}

// 文件合并上传
async function fileUpload(url = props.uploadUrl, formData = filesFormData()) {
  emit("beferUpload", currentList.value);
  if (formData) {
    let res = await post(url, formData);
    emit("onSuccess", {
      fileList: fileList.value,
      files: currentList.value,
      resData: res,
    });
  }
}
function uploadFile(file, onProgress, onSuccess) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    onSuccess(xhr);
  };
  xhr.upload.onprogress = (e) => {
    onProgress(Math.floor((e.loaded / e.total) * 100));
  };
  xhr.open("POST", props.uploadUrl);
  const form = new FormData();
  form.append("file", file);
  xhr.send(form);

  return function () {
    xhr.abort();
  };
}

// 文件上传前验证
async function checkFile(fileList) {
  let sizeRes: any = true;
  let length: any = true;
  if (props.limit && fileList.length > 0) {
    if (props.limit.size) {
      sizeRes = await sizeCheck(fileList).catch((res) => {});
    }
    if (props.limit.maxFiles) {
      length = await lengthCheck(fileList).catch((res) => {});
    }
    return sizeRes && length;
  } else {
    return true;
  }
}

// 把文件放入FormData 中
function filesFormData() {
  const formData = new FormData();
  let uploadArr = fileList.value;
  if (props.uploadUrl) {
    uploadArr = currentList.value;
  }
  if (uploadArr.length <= 0) {
    errorInfo.value = "请选择文件！";
    return;
  }
  for (let file of uploadArr) {
    formData.append("file", file);
  }
  return formData;
}

// 删除文件
const delFile = (item: any, index) => {
  console.log(item, index);
  fileList.value.splice(index, 1);
  emit("fileDel", { item, index });
};
const cancelFile = (item, index) => {
  console.log(item);
  if (item.status === "success") {
  }
  if (item.status === "uploading") {
    item.cancel();
  }
  fileList.value.splice(index, 1);
};

// 封装的上传文件的fetch
function post(url, param, requestOptions = {}) {
  //封装post方法
  const request = {
    header: {
      "content-type": "application/json",
    },
    method: "POST",
    body: param,
    credentials: "same-origin",
  };
  let requestSet = Object.assign(request, requestOptions);

  return new Promise(async (resove, reject) => {
    fetch(url, requestSet)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        resove(resData);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

// 文件大小验证（组件自带的 通过limit.size定义的）
const sizeCheck = (files: FileList) => {
  return new Promise((resolve, reject) => {
    const { size } = props.limit;
    console.log("sizeCheck", files);
    let errorFileList = [];
    if (size) {
      let index = 0;
      while (index < files.length) {
        const file = files[index];
        const fileSize = file.size / 1024;
        if (fileSize > size) {
          errorFileList.push(file.name);
          //   ZMessage({ type: "error", message: msg });
        }
        index++;
      }
      if (errorFileList.length > 0) {
        const msg = `${errorFileList
          .map((item) => item)
          .join(",")}文件大小超出${size}K，请重新调整！`;
        errorInfo.value = msg;
        reject(new Error(msg));
      }
      resolve(true);
    }
    resolve(true);
  });
};

// 文件数量验证（组件自带的 通过limit.maxFiles定义的）
const lengthCheck = (files: FileList) => {
  return new Promise((resolve, reject) => {
    const { maxFiles } = props.limit;
    console.log("lengthCheck", files);
    if (maxFiles) {
      console.log(files.length, maxFiles);
      if (files.length > maxFiles) {
        const msg = `文件数量不得超过${maxFiles}个`;
        errorInfo.value = msg;
        reject(new Error(msg));
      }
      resolve(true);
    }
    resolve(true);
  });
};

onMounted(() => {
  if (props.drop) {
    let dropDom = dropRef.value;
    dropDom.addEventListener(
      "drop",
      async (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(e.dataTransfer.files);
        errorInfo.value = null;
        if (e.dataTransfer) {
          fileSeting(e.dataTransfer.files);
        }
        // let checkFileList = [...fileList.value, ...e.dataTransfer.files];
        // let checkRes = await checkFile(checkFileList);
        // if (!checkRes) {
        //   return;
        // }

        // fileList.value.unshift(...e.dataTransfer.files);
        // currentList.value = e.dataTransfer.files;
        // emit("fileChange", fileList.value);

        // if (props.uploadUrl) {
        //   fileUpload();
        // }
      },
      false
    );
    dropDom.addEventListener("dragleave", (e) => {
      e.stopPropagation();
      e.preventDefault();
      dropPrompt.value = "拖入或点击文件上传";
    });
    dropDom.addEventListener("dragenter", (e) => {
      e.stopPropagation();
      e.preventDefault();
      dropPrompt.value = "松开完成";
    });
    dropDom.addEventListener("dragover", (e) => {
      e.stopPropagation();
      e.preventDefault();
    });
    dropDom.addEventListener("mouseleave", (e) => {
      dropPrompt.value = "拖入或点击文件上传";
    });
  }
});
</script>

<style lang="scss">
.z-upload-box {
  .z-upload-tip {
    font-size: 0.7rem;
    color: $text;
    margin: 0.4rem 0 0 0;
  }
  .error-box {
    font-size: 0.7rem;
    color: $danger;
  }
  .file-input {
    display: none;
  }
  .z-upload--drop-box {
    border: 2px dashed $primary;
    border-radius: 0.5rem;
    font-size: 2rem;
    color: $second-color;
    cursor: pointer;
    overflow: hidden;
    .drop-box--comp_self {
      width: 100%;
      min-height: 10rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    span {
      font-size: 0.8rem;
    }
  }
  .file-list-box {
    li {
      font-size: 0.8rem;
      line-height: 1.1rem;
      color: $second-color;
      display: flex;
      justify-content: space-between;
      > .del-icon {
        cursor: pointer;
      }
    }
  }
}
section .row {
  margin-bottom: 6px;
  background: #e9f0ff;
  list-style: none;
  padding: 8px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
html.dark {
  section .row {
    background: $comp-dark-bg;
  }
}
section .row i {
  color: #6990f2;
  font-size: 30px;
}
.progress-area .row .content {
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
  width: 100%;
  .content-main {
    flex: 1;
  }
  .content-option {
    flex: none;
    margin-left: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
.progress-area .details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.progress-area .content .progress-bar {
  height: 6px;
  width: 100%;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 30px;
  margin-top: 7px;
}
.content .progress-bar .progress {
  height: 100%;
  width: 0%;
  background: #6990f2;
  border-radius: inherit;
}
</style>
