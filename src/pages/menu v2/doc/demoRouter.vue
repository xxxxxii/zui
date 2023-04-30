<template>
  <div>
    <h2>menu v2 垂直菜单</h2>
    <z-nav-menu :active="active" @clickMenuItem="clickMenuItem">
      <z-sub-menu title="导航一" icon="icon-fanzhuanjingtou">
        <z-menu-item-group>
          <template #title>
            <span> 分组一 </span>
          </template>
          <z-menu-item path="1"> 选项1 </z-menu-item>
          <z-menu-item path="2"> 选项2 </z-menu-item>
          <z-menu-item path="3"> 选项3 </z-menu-item>
        </z-menu-item-group>
        <z-sub-menu title="导航二">
          <z-menu-item path="4-1"> 选项1 </z-menu-item>
          <z-menu-item path="4-2"> 选项2 </z-menu-item>
          <z-menu-item path="4-3"> 选项3 </z-menu-item>
        </z-sub-menu>
      </z-sub-menu>
      <z-menu-item icon="icon-jiudian" path="5"> 导航三 </z-menu-item>
      <z-menu-item icon="icon-jingdianwanfa1" path="6"> 导航四 </z-menu-item>
    </z-nav-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const active = ref("1");

const router = useRouter();
const clickMenuItem = (path) => {
  console.log(path);
  router.push(path);
};
</script>
