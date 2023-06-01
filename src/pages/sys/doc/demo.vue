<template>
  <z-global-config :config="config"> App 根组件 </z-global-config>
</template>

<script setup lang="ts">
import { ref } from "vue";

const config = ref({
  type: "info",
  size: "xs",
});
</script>

<style scoped lang="scss"></style>
