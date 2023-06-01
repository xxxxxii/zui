<template>
  <z-scrollbar>
    <ul class="z-select__dropdown">
      <slot />
    </ul>
  </z-scrollbar>
</template>

<script lang="ts">
export default {
  name: "zSelectDropdown",
};
</script>

<script setup lang="ts"></script>

<style scoped lang="scss">
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  max-height: 134px;
  overflow-y: auto;
  li {
    padding: 5px;
  }
}
</style>
