<template>
  <h2>基础使用</h2>
  <div class="trag-box">
    <div class="trag-dom" v-drag>drag</div>
  </div>

  <h2>
    参数配置:{ isDrag: isDrag, dragDom: '.drag-box', parentPos: 'fixed',
    }isDrag:是否可拖动，dragDom：拖动的dom元素，parentPos：设置父级元素的position:方式
  </h2>

  <z-switch v-model="isDrag" />
  <div class="trag-box">
    <div
      class="trag-dom"
      v-drag="{
        isDrag: isDrag,
        dragDom: '.drag-box',
      }"
    >
      drag
      <div class="drag-box"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Drag as vDrag } from "../../../../packages";

const isDrag = ref(true);
</script>

<style scoped>
.trag-box {
  width: 100%;
  height: 300px;
  background: greenyellow;
}
.trag-dom {
  width: 100px;
  height: 100px;
  background: blueviolet;
  color: #fff;
}
.drag-box {
  width: 50px;
  height: 50px;
  background: yellowgreen;
}
</style>
