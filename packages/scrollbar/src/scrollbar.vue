<template>
  <div class="z-scrollbar">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "z-scrollbar",
};
</script>

<style lang="scss" scoped>
html.dark {
  .z-scrollbar {
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      //   border: 2px solid #f2f2f2;
      background-color: $comp-dark-bg;
    }
    /* 内层轨道样式 */
    ::-webkit-scrollbar-track-piece {
      background-color: $comp-dark-bg;
    }
  }
}
.z-scrollbar {
  /* 整个滚动条的样式 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border: 1px solid #f2f2f2;
    background-color: $comp-light-bg;
  }

  /* 滚动条的轨道两端按钮，允许通过点击微调小方块的位置 */
  ::-webkit-scrollbar-button {
    display: none;
  }

  /* 滚动条的轨道样式 */
  ::-webkit-scrollbar-track {
    background-color: none;
  }

  /* 内层轨道样式 */
  ::-webkit-scrollbar-track-piece {
    background-color: $comp-light-bg;
  }

  /* 滚动条里面的小方块，能上下移动 */
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    // box-shadow: inset 0 0 1px 0 #f2f2f2;
    // border: 3px solid #f2f2f2;
    background-color: rgba($color: $primary, $alpha: 0.3);
  }

  /* 滚动条滑块hover时样式 */
  ::-webkit-scrollbar-thumb:vertical:hover,
  ::-webkit-scrollbar-thumb:horizontal:hover {
    background-color: rgba($color: $primary, $alpha: 0.9);
    cursor: pointer;
  }
}
</style>
