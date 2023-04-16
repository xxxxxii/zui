<template>
  <div>
    <h2>基础使用</h2>
    <z-icon name="icon-pdf"></z-icon>
    <h2>设置图标颜色：color</h2>
    <z-icon name="icon-pdf" color="#0051dc"></z-icon>
    <h2>设置图标大小：size</h2>
    <z-icon name="icon-pdf" color="#0051dc" size="32"></z-icon>
    <h2>设置图标样式：styles 对象</h2>
    <z-icon name="icon-pdf" :styles="styles"></z-icon>
  </div>
</template>

<script setup lang="ts">
const styles = { color: "#00dcd8", fontSize: 44 };
</script>
