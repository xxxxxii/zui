<template>
  <main class="z-main"><slot /></main>
</template>

<script lang="ts">
export default {
  name: "zMain",
};
</script>

<script setup lang="ts">
const props = defineProps({
  padding: {
    type: String,
    default: "20px",
  },
});
</script>

<style lang="scss" scoped>
.z-main {
  flex: 1;
  flex-basis: auto;
  // overflow: auto;
  box-sizing: border-box;
  padding: v-bind(padding);
}
</style>
