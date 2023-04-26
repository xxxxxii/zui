<template>
  <div>
    <h2>基础使用</h2>
    <z-radio-group v-model="radioValue">
      <z-radio label="重庆" value="chongqing"></z-radio>
      <z-radio label="上海" value="shanghai"></z-radio>
      <z-radio label="成都" value="chengdu"></z-radio>
      <z-radio label="深圳" value="shenzhen"></z-radio>
    </z-radio-group>
  </div>

  <div>
    <h2>单项禁用</h2>
    <z-radio-group v-model="radioValue">
      <z-radio label="重庆" value="chongqing" disabled></z-radio>
      <z-radio label="上海" value="shanghai" disabled></z-radio>
      <z-radio label="成都" value="chengdu"></z-radio>
      <z-radio label="深圳" value="shenzhen"></z-radio>
    </z-radio-group>

    <h2>全部 禁用</h2>
    <z-radio-group v-model="radioValue" disabled>
      <z-radio label="重庆" value="chongqing"></z-radio>
      <z-radio label="上海" value="shanghai"></z-radio>
      <z-radio label="成都" value="chengdu"></z-radio>
      <z-radio label="深圳" value="shenzhen"></z-radio>
    </z-radio-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const radioValue = ref("chongqing");
</script>
<style></style>
