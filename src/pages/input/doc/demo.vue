<template>
  <div>
    <h2>基础用法</h2>
    <z-input v-model="input"></z-input>
    <z-input v-model="input" type="password"></z-input>
  </div>
  <div>
    <h2>size</h2>
    <z-input v-model="input"></z-input>
    <z-input v-model="input" size="lg"></z-input>
    <z-input v-model="input" size="xs"></z-input>
  </div>
  <div>
    <h2>设置width:可任意单位 px,%</h2>
    <z-input v-model="input" width="300px"></z-input>
  </div>

  <div>
    <h2>设置placeholder,同原生</h2>
    <z-input v-model="input" placeholder="请输入内容"></z-input>
  </div>

  <div>
    <h2>disabled</h2>
    <z-input v-model="input" disabled></z-input>
  </div>

  <div class="main-box">
    <h2>clearable</h2>
    <z-input v-model="input" clearable></z-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const input = ref("22222222");
</script>

<style scoped>
.main-box {
  width: 200px;
}
</style>
