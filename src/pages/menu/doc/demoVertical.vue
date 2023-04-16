<template>
  <div>
    <h2>侧边菜单：mode="vertical"</h2>
    <!-- mode="horizontal" -->
    <z-menu
      :menuKey="menuKey"
      :items="menus"
      :collapse="true"
      :active="'首页'"
      v-model="active"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref("首页");

const menuKey = ref({
  labelKey: "name",
  pathKey: "path",
  childrenKey: "children",
  iconKey: "icon",
  activeKey: "name",
});

const menus = ref([
  {
    name: "首页",
    icon: "icon-ARsaoyisao",
  },
  {
    name: "组件",
    icon: "icon-guojijiudian",
  },
  {
    name: "一级菜单",
    icon: "icon-zulin",
    children: [
      {
        name: "二级菜单1",
        icon: "icon-pingfen",
      },
      {
        name: "二级菜单2",
        icon: "icon-zhekou",
        children: [
          {
            name: "三级菜单",
            icon: "icon-toutiao",
          },
        ],
      },
    ],
  },
  {
    name: "组件",
    icon: "icon-kuandai",
  },
]);
</script>
