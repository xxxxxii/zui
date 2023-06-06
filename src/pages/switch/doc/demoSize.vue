<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-06 10:50:42
-->
<template>
  <div>
    <h2>不同大小size</h2>
    {{switchVal}}
    <z-switch v-model="switchVal" />
    <z-switch v-model="switchVal" type="info" size="lg" />
    <z-switch v-model="switchVal" type="success" size="md" />
    <z-switch v-model="switchVal" type="danger" size="xs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const switchVal = ref(true);
</script>
