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
import { ref, computed, h, render, createVNode } from "vue";
const menus: any = ref([
  // {
  //   path: "/",
  //   label: "ZUI",
  // },
  {
    path: "/comp",
    label: "组件",
  },
]);

const active = ref("/comp");

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
