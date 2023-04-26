<template>
  <div class="container">
    <z-scrollbar>
      <div class="left-menu">
        <z-menu :items="menuList" :menuKey="menuKey" v-model="currentPath" />
      </div>
    </z-scrollbar>

    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import routesList from "../router/index";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
console.log(routesList.getRoutes(), 222222);
const menuKey = ref({
  labelKey: "name",
  pathKey: "path",
  childrenKey: "children",
  iconKey: "icon",
  activeKey: "path",
});

// 获取到路由列表，因为挂载到home页面下的子路由所以需要找到home对象的子路由
const menuList = routesList.getRoutes().find((item) => {
  return item.name === "comp";
}).children;

const router = useRouter();
const route = useRoute();

const active = ref("");

// 设置当前路由地址，用作菜单的选中
const currentPath = ref(route.path);
console.log(currentPath.value, menuList);

// 跳转到对应的路由
const routeTo = (item, index) => {
  currentPath.value = "/" + item.path;
  router.push({
    path: item.path,
  });
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  // height: calc(100vh - 60px);
  display: flex;
  .left-menu {
    // width: 360px;
    overflow-y: auto;
    position: fixed;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      .active {
        background-color: rgb(133, 172, 252);
        border-left: 3px solid rgb(24, 95, 237);
      }

      .list-item {
        padding: 10px;
        cursor: pointer;
        dl {
          padding: 0;
          margin: 0;
        }
        &:hover {
          background-color: rgb(223, 252, 252);
        }
      }
    }
  }
  .main {
    width: calc(100% - 200px);
    // flex: 1;
    height: auto;
    // overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    margin-left: 220px;
  }
}
</style>
