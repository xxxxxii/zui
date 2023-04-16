<template>
  <div class="wrapper">
    <header>File Uploader JavaScript</header>
    <form action="#" @click="selectFile">
      <input
        class="file-input"
        type="file"
        name="file"
        hidden
        multiple
        @change="fileChange"
        ref="fileRef"
      />
      <!-- <i class="fas fa-cloud-upload-alt"></i> -->
      <z-icon color="#6990f2" size="60" name="icon-yunshangchuan" />
      <p>Browse File to Upload</p>
    </form>
    <section class="progress-area">
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
    <section class="uploaded-area">
      <!-- <li v-for="(item, index) in fileList" :key="index">
        {{ item.name }}--{{ item.percentage }}--{{ item.status }}
        <z-progress
          :dept="item.percentage"
          :text="item.percentage + '%'"
          showTxt
        />
      </li> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
let tempIndex = 0; // 做一个标记
const uploadSetting = reactive({
  action: "/api/user/upload", //上传地址
  autoUpload: true, //是否自动上传
});
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

const targList = ref([]);
const fileList = ref([]);
const fileRef = ref(null);
const selectFile = () => {
  fileRef.value.click();
};

const fileChange = async (e) => {
  if (e.target) {
    const list = [].slice.call(e.target.files).filter((file) => {
      return true;
    });
    targList.value = list.map((p) => {
      return handleStart(p);
    });
    fileList.value.unshift(...targList.value);

    console.log(targList.value, fileList.value);
    console.log(fileList.value);
    if (uploadSetting.autoUpload) {
      if (uploadSetting.action === "") {
        throw "need action";
        return;
      }
      targList.value.forEach((file: any) => {
        file["cancel"] = uploadFile(
          file.raw,
          function (progress) {
            file.percentage = progress;
            console.log(fileList.value, list);
            console.log(progress);
          },
          function (res) {
            console.log(res);
            if (res.status === 201) {
              file.status = "success";
            } else {
              file.status = "error";
            }
          }
        );
      });
    }
  }
};

function uploadFile(file, onProgress, onSuccess) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    onSuccess(xhr);
  };
  xhr.upload.onprogress = (e) => {
    onProgress(Math.floor((e.loaded / e.total) * 100));
  };
  xhr.open("POST", "/api/user/upload");
  const form = new FormData();
  form.append("file", file);
  xhr.send(form);

  return function () {
    xhr.abort();
  };
}

const cancelFile = (item, index) => {
  console.log(item);
  if (item.status === "success") {
  }
  if (item.status === "uploading") {
    item.cancel();
  }
  fileList.value.splice(index, 1);
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 430px;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 7px 7px 12px rgba(0, 0, 0, 0.05);
}

.wrapper header {
  color: #6990f2;
  font-size: 27px;
  font-weight: 600;
  text-align: center;
}
.wrapper form {
  height: 167px;
  display: flex;
  cursor: pointer;
  margin: 30px 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed #6990f2;
}
form :where(i, p) {
  color: #6990f2;
}
form i {
  font-size: 50px;
}
form p {
  margin-top: 15px;
  font-size: 16px;
}

section .row {
  margin-bottom: 10px;
  background: #e9f0ff;
  list-style: none;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
section .row i {
  color: #6990f2;
  font-size: 30px;
}
section .details span {
  font-size: 14px;
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
.uploaded-area {
  max-height: 232px;
  overflow-y: scroll;
}
.uploaded-area.onprogress {
  max-height: 150px;
}
.uploaded-area::-webkit-scrollbar {
  width: 0px;
}
.uploaded-area .row .content {
  display: flex;
  align-items: center;
}
.uploaded-area .row .details {
  display: flex;
  margin-left: 15px;
  flex-direction: column;
}
.uploaded-area .row .details .size {
  color: #404040;
  font-size: 11px;
}
.uploaded-area i.fa-check {
  font-size: 16px;
}
</style>
