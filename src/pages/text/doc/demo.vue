<template>
  <z-text :type="type" href="/button"> 111111111111111111111 </z-text>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const type = ref("a");

setTimeout(() => {
  type.value = "del";
}, 2000);
</script>

<style></style>
