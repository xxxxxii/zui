<template>
  <section class="z-container" :class="[`is-${direction}`]">
    <slot />
  </section>
</template>

<script lang="ts">
export default {
  name: "zContainer",
};
</script>

<script setup lang="ts">
const props = defineProps({
  direction: {
    type: String,
    default: "vertical",
  },
});
</script>

<style lang="scss" scoped>
.z-container {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
}
.is-vertical {
  flex-direction: column;
}
.is-horizontal {
  flex-direction: row;
}
</style>
