<template>
  <li
    class="z-menu-item"
    :class="[
      menuContext?.menuActive === props.path && props.path ? 'is-active' : '',
      menuContext?.collapse && menuContext?.mode === 'horizontal'
        ? 'z-menu-item--horizontal'
        : '',
    ]"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @click="menuItemClick"
  >
    <z-icon v-if="icon" class="z-menu-item--icon" :name="icon" />
    <div class="z-menu-item--title" :style="labelStyle">
      <div class="z-menu-item__margin" :style="titleMarginStyle">
        <slot>
          {{ label }}
        </slot>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
export default {
  name: "z-menu-item",
};
</script>

<script setup lang="ts">
import { inject, useSlots, computed, ref } from "vue";
import { menuItemProps } from "./menu-item";
import { subMenuContextKey } from "./sub-menu";
import { menuContextKey } from "./menu";
import { uuidv4 } from "../../utils";

const props = defineProps(menuItemProps);

const menuContext = inject(menuContextKey, null);
const subMenuContext = inject(subMenuContextKey, null);
const slot = useSlots().default()[0].children;
const menuItemId = "menu-item-" + uuidv4();

if (subMenuContext) {
  subMenuContext?.collectMneu({
    label: props.label || slot,
    path: props.path || menuItemId,
  });
} else {
  menuContext?.collectMneu({
    label: props.label || slot,
    path: props.path || menuItemId,
  });
}

const menuItemClick = () => {
  menuContext?.menuActiveChange(props.path);
  console.log(menuContext);
};
const itemPadding = computed(() => {
  console.log(
    showTitle.value,
    menuContext?.collapse && subMenuContext && showTitle.value
  );
  // 横向菜单下或者在收缩状态下
  if (
    menuContext?.mode === "horizontal" ||
    (menuContext?.collapse && subMenuContext)
  )
    return "0 20px";

  // 竖向排列下
  if (subMenuContext) {
    return "0 20px 0 " + (subMenuContext?.tier + 1) * 20 + "px";
  } else {
    return "0 20px";
  }
});

const showTitle = ref(false);

const mouseenter = () => {
  if (menuContext?.collapse) showTitle.value = true;
};
const mouseleave = () => {
  if (menuContext?.collapse) showTitle.value = false;
};

const labelStyle = computed(() => {
  if (menuContext?.collapse && !subMenuContext && showTitle.value)
    return {
      position: "absolute",
      left: "100%",
      top: "0",
      bottom: "0",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      zIndex: 1000,
    };
  if (menuContext?.collapse && subMenuContext)
    return {
      display: "block",
    };
  if (!subMenuContext && menuContext?.collapse)
    return {
      display: "none",
    };
});

const titleMarginStyle = computed(() => {
  if (menuContext?.collapse && !subMenuContext && showTitle.value) {
    return {
      marginLeft: "10px",
      background: "#2d3436",
      padding: "5px 10px",
      borderRadius: "4px",
      color: "#fff",
      fontSize: "12px",
    };
  }
});
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.z-menu-item {
  padding: v-bind(itemPadding);
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  &--title {
    display: flex;
    align-items: center;
    .z-menu-item__margin {
      // height: "32px";
      display: flex;
      align-items: center;
    }
  }
  .z-menu-item--icon {
    font-size: 18px;
    margin-right: 10px;
    // display: flex;
    // align-items: center;
    // width: 44px;
    // height: 44px;
  }
  &:hover {
    @extend .menu-hover;
  }
}
.z-menu-item--horizontal {
  .z-menu-item--icon {
    margin: 0;
  }
}
.is-active {
  color: $primary;
}
html.dark {
  .z-menu-item {
    &--title {
      .z-menu-item__margin {
      }
    }
  }
}
</style>
