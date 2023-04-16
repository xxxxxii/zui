<template>
  <div
    class="z-row"
    :style="{ marginLeft: '-' + marginStr, marginRight: '-' + marginStr }"
  >
    <slot :spac="spac" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "zRow",
});
</script>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  spac: {
    type: Number,
    default: 0,
  },
});

const marginStr = computed(() => {
  return props.spac / 2 + "px";
});
</script>

<style lang="scss" scoped>
.z-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
}
::v-slotted(.z-col) {
  padding-left: v-bind(marginStr);
  padding-right: v-bind(marginStr);
}
</style>
