<template>
  <div>
    <h2>基础使用</h2>
    <z-progress showStriped />
  </div>
  <div>
    <h2>type: primary(默认)，success，info，danger，warning</h2>
    <div class="progress-box">
      <z-progress stripe type="success" />
    </div>
    <div class="progress-box">
      <z-progress stripe type="info" />
    </div>
    <div class="progress-box">
      <z-progress stripe type="danger" />
    </div>
    <div class="progress-box">
      <z-progress stripe type="warning" />
    </div>
  </div>
  <div>
    <h2>条纹 stripe</h2>
    <z-progress stripe />
  </div>

  <div>
    <h2>条纹 运动 dynamic</h2>
    <z-progress stripe dynamic />
  </div>

  <div>
    <h2>进度条深度 dept 0-100</h2>
    <z-progress stripe dynamic :dept="dept" showTxt :text="dept + '%'" />
  </div>

  <div>
    <h2>进度条文本 text:显示的文本，showTxt</h2>
    <z-progress :dept="dept" showTxt :text="dept + '%'" />
  </div>
  <div>
    <h2>进度条文本显示在 进度条上 textInside text showTxt</h2>
    <z-progress :dept="dept" showTxt :text="dept + '%'" textInside />
  </div>
  <div>
    <h2>进度条颜色 bg</h2>
    <z-progress
      stripe
      dynamic
      :dept="dept"
      showTxt
      :text="dept + '%'"
      textInside
      bg="#b1d5c8"
    />
  </div>
  <div>
    <h2>进度条高度 height,圆角大小:brdRs</h2>
    <z-progress
      :dept="dept"
      showTxt
      :text="dept + '%'"
      textInside
      bg="#34aeae"
      :height="20"
      :brdRs="10"
      dynamic
      stripe
    />
  </div>
  <div>
    <h2>进度条高度 height,圆角大小:brdRs</h2>
    <z-progress :dept="dept" bg="#34aeae" :height="5" dynamic stripe />
  </div>

  <div>
    <h2>圆环进度条</h2>
    <div class="round-progress">
      <z-progress :dept="dept" bg="#34aeae" round />
      <z-progress :dept="dept" bg="#34aeae" round type="success" />
      <z-progress :dept="dept" bg="#34aeae" round type="info" />
    </div>
  </div>
  <div>
    <h2>圆环进度条大小：radius，设置的是圆环的半径px</h2>

    <z-progress :dept="dept" round :radius="40" />
  </div>

  <div>
    <h2>圆环进度条文本：text，showTxt</h2>
    <z-progress
      :dept="dept"
      bg="#34aeae"
      round
      showTxt
      :radius="40"
      :text="dept + '%'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const dept = ref(0);

setInterval(() => {
  if (dept.value < 90) {
    dept.value += 10;
  }
}, 200);
</script>

<style scoped>
.progress-box {
  margin: 10px 0;
}

.round-progress {
  display: flex;
}
</style>
