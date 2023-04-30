<template>
  <h2>menu v2 折叠 collapse</h2>
  <z-button type="primary" @click="collapse = !collapse">collapse </z-button>
  <div>
    <z-nav-menu
      :collapse="collapse"
      @open="openMenu"
      @close="closeMenu"
      :opens="opens"
    >
      <z-sub-menu path="1" title="导航一" icon="icon-fanzhuanjingtou">
        <z-menu-item-group>
          <template #title>
            <span> 分组一 </span>
          </template>
          <z-menu-item path="1-1"> 选项1 </z-menu-item>
          <z-menu-item path="1-2"> 选项2 </z-menu-item>
          <z-menu-item path="1-3"> 选项3 </z-menu-item>
        </z-menu-item-group>
        <z-sub-menu path="1-4" title="导航二">
          <z-menu-item path="1-4-1"> 选项1 </z-menu-item>
          <z-menu-item path="1-4-2"> 选项2 </z-menu-item>
          <z-menu-item path="1-4-3"> 选项3 </z-menu-item>
        </z-sub-menu>
      </z-sub-menu>
      <z-menu-item icon="icon-jiudian" path="2"> 导航三 </z-menu-item>
      <z-menu-item icon="icon-jingdianwanfa1" path="3"> 导航四 </z-menu-item>
    </z-nav-menu>
  </div>

  <div style="height: 300px; margin-top: 20px">
    <z-nav-menu mode="horizontal" :collapse="collapse">
      <z-sub-menu path="1" title="导航一" icon="icon-fanzhuanjingtou">
        <z-menu-item-group>
          <template #title>
            <span> 分组一 </span>
          </template>
          <z-menu-item path="1-1"> 选项1 </z-menu-item>
          <z-menu-item path="1-2"> 选项2 </z-menu-item>
          <z-menu-item path="1-3"> 选项3 </z-menu-item>
        </z-menu-item-group>
        <z-sub-menu path="1-4" title="导航二">
          <z-menu-item path="1-4-1"> 选项1 </z-menu-item>
          <z-menu-item path="1-4-2"> 选项2 </z-menu-item>
          <z-menu-item path="1-4-3"> 选项3 </z-menu-item>
        </z-sub-menu>
      </z-sub-menu>
      <z-menu-item icon="icon-jiudian" path="2"> 导航三 </z-menu-item>
      <z-menu-item icon="icon-jingdianwanfa1" path="3"> 导航四 </z-menu-item>
    </z-nav-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const collapse = ref(false);

const opens = ref([]);

const openMenu = (path, paths) => {
  console.log("open", path, paths);

  let index = opens.value.findIndex((item) => {
    return item === path;
  });
  if (index === -1) {
    opens.value.push(path);
  }
  console.log(opens.value, index);
  // opens.value = Array.from(new Set(opens.value));
};
const closeMenu = (path, paths) => {
  console.log("close", path, paths);
};
</script>
