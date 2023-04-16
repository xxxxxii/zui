<template>
  <div class="icons-main">
    <div
      class="icon-box"
      v-for="item in data.glyphs"
      :key="item.icon_id"
      @click="copyIcon(item)"
    >
      <span>
        <z-icon :name="'icon-' + item.font_class" size="22"></z-icon>
        <span class="icon-name">{{ item.font_class }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import data from "~/icon/font/iconfont.json";

const copyIcon = (item) => {
  console.log(item);
};
</script>

<style scoped lang="scss">
.icons-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  .icon-box {
    width: 120px;
    height: 80px;
    display: flex;
    justify-content: center;
    // align-items: center;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: #ccedf9;
    }
    > span {
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
    .icon-name {
      font-size: 12px;
      word-break: break-all;
    }
  }
}
</style>
