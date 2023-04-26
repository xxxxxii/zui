<template>
  <ul class="z-select__dropdown">
    <slot />
  </ul>
</template>

<script lang="ts">
export default {
  name: "zSelectDropdown",
};
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  li {
    padding: 5px;
  }
}
</style>
