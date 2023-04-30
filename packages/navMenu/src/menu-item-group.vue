<template>
  <li class="z-menu-item-group">
    <div class="z-menu-item-group__title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <ul>
      <slot />
    </ul>
  </li>
</template>

<script lang="ts">
export default {
  name: "z-menu-item-group",
};
</script>

<script setup lang="ts">
import { computed, inject } from "vue";
import { menuItemGroupProps } from "./menu-item-group";
import { subMenuContextKey } from "./sub-menu";
import { menuContextKey } from "./menu";

const props = defineProps(menuItemGroupProps);

const menuContext = inject(menuContextKey, null);
const subMenuContext = inject(subMenuContextKey, null);

const itemPadding = computed(() => {
  if (
    menuContext?.mode === "horizontal" ||
    (menuContext?.collapse && subMenuContext)
  )
    return "0 20px";
  if (subMenuContext) {
    return "0 20px 0 " + (subMenuContext?.tier + 1) * 20 + "px";
  } else {
    return "0 20px";
  }
});
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
ul {
  padding: 0;
}
.z-menu-item-group__title {
  color: #7f7f7f;
  font-size: 12px;
  padding: v-bind(itemPadding);
  padding-top: 5px;
}
</style>
