<template>
  <div class="container">
    <z-scrollbar>
      <div class="left-menu">
        <!-- <z-menu
          :items="menuList"
          :menuKey="menuKey"
          v-model="currentPath"
          @toRouter="toRouter"
        /> -->
        <z-nav-menu :active="currentPath" @clickMenuItem="clickMenuItem">
          <z-menu-item-group
            v-for="(menuItem, menuGroup, index) in menuListGroup"
            :key="menuGroup"
          >
            <template #title>
              <span style="font-size: 16px"> {{ menuGroup }} </span>
            </template>
            <z-menu-item
              :path="item.path"
              v-for="item in menuItem"
              :key="item.path"
            >
              {{ item?.meta?.title }}
            </z-menu-item>
          </z-menu-item-group>
        </z-nav-menu>
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
import { utils } from "../../packages";

const router = useRouter();
const route = useRoute();

console.log(routesList.getRoutes(), 222222);
const menuKey = ref({
  labelKey: "name",
  pathKey: "path",
  childrenKey: "children",
  iconKey: "icon",
  activeKey: "path",
});

// 获取到路由列表，因为挂载到home页面下的子路由所以需要找到home对象的子路由
let menuList: any = routesList.getRoutes().find((item) => {
  return item.name === "comp";
}).children;

// 路由分组
let menuListGroup: any = utils.groupBy(menuList, (item) => item.meta.group);
console.log(menuListGroup, "22222222222222222222222222222222222222222222");

const clickMenuItem = (path) => {
  router.push(path);
};
const active = ref("");

const toRouter = (path) => {
  router.push(path);
};

// 设置当前路由地址，用作菜单的选中
const currentPath = ref(route.path);

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
