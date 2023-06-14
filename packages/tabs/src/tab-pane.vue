<template>
  <div v-if="paneShow" :id="tabName">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "z-tab-pane",
};
</script>
<script setup lang="ts">
import { inject, onMounted, ref, computed, getCurrentInstance } from "vue";
import { tabPaneProps } from "./tab-pane";
import { TabsContextKey } from "./tabs";
const { proxy } = getCurrentInstance();

const tabsContent = inject(TabsContextKey, null);

const props = defineProps(tabPaneProps);
const tabName = ref(props.name ? props.name : props.lable);
console.log(tabName.value, tabsContent?.selectTab);

const paneShow = computed(() => {
  return tabsContent?.selectTab === tabName.value;
});

const content = ref({
  ...props,
  tabName,
});

onMounted(() => {
  // 收集子组件实例
  tabsContent.collectChild(proxy);
});
</script>

<style scoped lang="scss"></style>
