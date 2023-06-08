<template>
  <div v-if="paneShow">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "z-tab-pane",
};
</script>
<script setup lang="ts">
import { inject, onMounted, ref, useSlots, computed } from "vue";
import { tabPaneProps } from "./tab-pane";
import { TabsContextKey } from "./tabs";

const tabsContent = inject(TabsContextKey, null);
const defSlot = useSlots().default();

const props = defineProps(tabPaneProps);
const tabName = ref(props.name ? props.name : tabsContent?.childName + "");
tabsContent?.updateChildName();
console.log(tabName.value, tabsContent?.modelValue);

const paneShow = computed(() => {
  return tabsContent?.selectTab && tabName.value === tabsContent?.selectTab;
});

const content = ref({
  ...props,
  tabName,
  defSlot,
});

tabsContent.collectChild(content.value);

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
