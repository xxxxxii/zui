<template>
  <footer class="z-footer">
    <slot />
  </footer>
</template>

<script lang="ts">
export default {
  name: "zFooter",
};
</script>

<script setup lang="ts">
const props = defineProps({
  padding: {
    type: String,
    default: "0 20px",
  },
});
</script>

<style lang="scss" scoped>
.z-header {
  box-sizing: border-box;
  flex-shrink: 0;
  padding: v-bind(padding);
}
</style>
