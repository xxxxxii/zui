<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-05 14:53:50
-->
<template>
  <div :class="Class">
  <slot ></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "z-scrollbar",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useCompGlobal } from "../../utils/compGlobal";
const { compTYpe } = useCompGlobal();

const props = defineProps({
  type: {
    type: String,
  },
});

const Class = computed(() => {
  return ["z-scrollbar", `z-scrollbar--${compTYpe.value(props)}`];
});
</script>

<style lang="scss" scoped>
.z-scrollbar {
  overflow: auto;
}
</style>
