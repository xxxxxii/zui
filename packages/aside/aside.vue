<template>
  <aside class="z-aside">
    <slot />
  </aside>
</template>

<script lang="ts">
export default {
  name: "zAside",
};
</script>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: String,
    default: "200px",
  },
});
</script>

<style lang="scss" scoped>
.z-aside {
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: v-bind(width);
}
</style>
