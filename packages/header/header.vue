<template>
  <header class="z-header">
    <slot />
  </header>
</template>

<script lang="ts">
export default {
  name: "zHeader",
};
</script>

<script setup lang="ts">
const props = defineProps({
  height: {
    type: String,
    default: "60px",
  },
  padding: {
    type: String,
    default: "0 20px",
  },
});
</script>

<style lang="scss" scoped>
.z-header {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  padding: v-bind(padding);
  height: v-bind(height);
}
</style>
