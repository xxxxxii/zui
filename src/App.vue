<template>
  <div class="main">
    <z-global-config :config="config" style="height: 100vh; overflow: auto">
      <z-header class="doc-header">
        <div class="doc-header-box">
          <span class="logo"> ZUI </span>

          <span
            ><z-tag round>V {{ version }}</z-tag>
          </span>
          <div class="menu-box">
            <z-nav-menu
              class="top-menu"
              mode="horizontal"
              :active="active"
              @clickMenuItem="toRouter"
            >
              <z-menu-item
                :path="item.path"
                v-for="item in menus"
                :key="item.path"
              >
                {{ item?.label }}
              </z-menu-item>
            </z-nav-menu>
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
    </z-global-config>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { version } from "../package.json";

const config = ref({
  // type: "info",
  size: "md",
});

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

const toRouter = (path) => {
  router.push(path);
};

// 递归查询
const selectRoute = (children, path) => {
  if (children.children) {
    return selectRoute(children.children, path);
  } else {
    let result = children.filter((element) => {
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
  padding: 0;
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
#app {
  height: 100vh;
  .main {
    height: 100vh;
  }
}
.main-container {
  width: 80%;
  margin: 0 auto;
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
  .top-menu {
    justify-content: right;
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
