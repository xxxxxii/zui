<script setup lang="ts">
import { ref, computed } from "vue";
import { Skeleton, SkeletonItem } from "../../../../packages";

const vSkeleton = Skeleton;
const vSkeletonItem = SkeletonItem;
const dataList: any = ref([{}, {}, {}, {}, {}, {}]);
const loading = ref(true);

function getData() {
  setTimeout(() => {
    dataList.value = [
      {
        img: "https://pic4.zhimg.com/80/v2-13b5b879b41bee342a071aaa36909987_1440w.webp",
        avatar:
          "https://img1.baidu.com/it/u=3789652124,1621870174&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      },
      {
        img: "https://pic2.zhimg.com/v2-de05f7e91e0b99f9c277757c1192ba95_r.jpg",
        avatar:
          "https://img1.baidu.com/it/u=3789652124,1621870174&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      },
      {
        img: "https://pic4.zhimg.com/80/v2-8c29198625ff99eee0073bbbb137bbc7_1440w.webp",
        avatar:
          "https://img1.baidu.com/it/u=3789652124,1621870174&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      },
      {
        img: "https://pic4.zhimg.com/80/v2-50b2b4132aeafddb382ca20c839d23d7_1440w.webp",
        avatar:
          "https://img1.baidu.com/it/u=3789652124,1621870174&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      },
      {
        img: "https://pic4.zhimg.com/80/v2-da217cabde0a382120e68118571d60e3_1440w.webp",
        avatar:
          "https://img1.baidu.com/it/u=3789652124,1621870174&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      },
      {
        img: "https://pic3.zhimg.com/80/v2-a28dea49b2c0ed8ba1eb5145ff88b392_1440w.webp",
        avatar:
          "https://img1.baidu.com/it/u=3789652124,1621870174&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",
      },
    ];
    loading.value = false;
  }, 5000);
}

getData();
</script>

<template>
  <div class="skeleton-box">
    <br />

    <label for="loading">点击切换</label>
    <input v-model="loading" id="loading" type="checkbox" />

    <br /><br />

    <z-row :spac="10">
      <z-col :col="8" v-for="item in dataList">
        <div class="card col" v-skeleton.animated="loading">
          <img class="cover" :src="item?.img" v-skeleton-item />
          <div class="details row">
            <div class="row-left">
              <img class="avatar" :src="item?.avatar" v-skeleton-item />
            </div>
            <div class="flex1">
              <h3 class="title">
                <span v-skeleton-item>授人以鱼，不如授人以渔！</span>
              </h3>
              <div class="line">
                <span class="info" v-skeleton-item>天使降临到我身边</span>
                <span class="info">&nbsp;</span>
                <span class="info" v-skeleton-item>⚪</span>
              </div>
              <div class="line">
                <span class="info" v-skeleton-item>8.9K views ·</span>
                <span class="info">&nbsp;</span>
                <span class="info" v-skeleton-item>1 day ago</span>
              </div>
            </div>
            <button class="btn" v-skeleton-item>:</button>
          </div>
        </div>
      </z-col>
    </z-row>
  </div>
</template>

<style scoped>
:root {
  font-size: 16px;
}
.card {
  /* width: 20em; */
  margin-top: 10px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 20%);
  overflow: hidden;
}

.cover {
  width: 100%;
  height: 203px;
  object-fit: cover;
}

.details {
  margin: 12px;
}

.avatar {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  object-fit: cover;
  border-radius: 36px;
}

.title {
  margin: 0 0 4px 0;
  font-size: 16px;
  line-height: 22px;
  /* color: #030303; */
  font-weight: 500;
}

.btn {
  margin: -4px 0 0 16px;
  width: 32px;
  height: 32px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
  background: #0000000d;
  color: rgb(2, 151, 151);
}

.line {
  line-height: 20px;
}

.info {
  font-size: 12px;
  line-height: 14px;
  color: rgb(96, 96, 96);
}

.row {
  display: flex;
}
.row-left {
  display: flex;
  align-items: center;
}
.col {
  display: flex;
  flex-direction: column;
}
.aic {
  align-items: center;
}
.flex1 {
  flex: 1;
}

label:active + input[type="checkbox"],
input[type="checkbox"]:active {
  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
