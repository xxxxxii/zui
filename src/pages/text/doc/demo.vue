<template>
  <z-text :type="type" href="/button">
    <template #leftIcon>
      <z-icon class="icon" name="icon-pro-success"></z-icon>
    </template>
    this is text
    <z-text type="sup">
      <template #rightIcon>
        <z-icon class="icon" name="icon-pro-success"></z-icon> </template
    ></z-text>
  </z-text>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const type = ref("a");

setTimeout(() => {
  type.value = "del";
}, 2000);
</script>

<style scoped>
.icon {
  color: red;
}
</style>
