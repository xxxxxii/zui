<template>
  <z-header class="doc-header">
    <div class="doc-header-box">
      <span class="logo"> ZUI </span>
      <div class="menu-box">
        <z-menu :items="menus" mode="horizontal" v-model="active" />
        <z-switch
          v-model="themeVal"
          size="lg"
          :text="switchText"
          showText
          activeIcon="icon-dark"
          inActiveIcon="icon-light-on"
          @change="themeChange"
        >
        </z-switch>
      </div>
    </div>
  </z-header>
  <z-main padding="0" class="main-container">
    <router-view />
  </z-main>
</template>

<script setup lang="ts">
import { Result } from "postcss";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const menus: any = ref([
  {
    path: "/comp",
    label: "组件",
  },
  {
    path: "/updateLog",
    label: "更新日志",
  },
]);
const router = useRouter();
const route = useRoute();
const active = ref("/");

// 递归查询
const selectRoute = (children, path) => {
  if (children.children) {
    return selectRoute(children.children, path);
  } else {
    let result = children.filter((element) => {
      console.log(element, path);
      return element.path === path;
    });
    return result;
  }
};

const activeMenuSetting = (path) => {
  let menusArr = menus.value.filter((item) => {
    return item.path === path;
  });
  if (menusArr.length > 0) {
    active.value = menusArr[0].path;
  } else {
    let routerArr = router.getRoutes();
    routerArr.forEach((item) => {
      if (item.children && item.children.length > 0) {
        let arr = selectRoute(item.children, path);
        if (arr) {
          active.value = item.path;
        }
      }
    });
  }
};

watch(
  () => route.fullPath,
  (newVal) => {
    activeMenuSetting(newVal);
  }
);

const theme = computed(() => {
  const htmlDom: HTMLElement = document.querySelector("html");
  if (htmlDom.className.indexOf("dark") > -1) {
    return true;
  } else {
    return false;
  }
});
const themeVal = ref(theme.value);
const switchText = ref({
  type: "icon",
  name: "icon-light-on",
});

const themeChange = (status) => {
  console.log(status);
  const htmlDom: HTMLElement = document.querySelector("html");
  if (status) {
    htmlDom.classList.add("dark");
    switchText.value.name = "icon-light-on";
  } else {
    htmlDom.classList.remove("dark");

    switchText.value.name = "icon-dark";
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  width: 100%;
  min-width: 320px;
  // min-height: 100vh;
  line-height: 1.4;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-color);
  background-color: var(--bg-color);
  direction: ltr;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.main-container {
  width: 80%;
  margin: 0 auto;
  // margin-top: 60px;
}
table {
  width: 100%;
  td,
  th {
    padding: 10px 30px;
  }
}
table,
td,
th {
  text-align: center;
  border: 1px solid $second-color;
  border-collapse: collapse;
}

table td {
  padding: 10px 30px;
}
.main-container {
  position: relative;
}
html.dark {
  .doc-header {
    background: $menu-dark-bg;
  }
}
.doc-header {
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: $menu-light-bg;
  .doc-header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
  }
  .logo {
    margin: 0 15px;
    font-size: 44px;
    flex: none;
  }
}
.menu-box {
  display: flex;
  align-items: center;
  flex: auto;
  justify-content: flex-end;
}
</style>
