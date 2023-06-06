<template>
  <li
    :class="Class"
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
import { useCompGlobal } from "../../utils/compGlobal";
const { compSize, compType } = useCompGlobal();

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

const Class = computed(() => {
  // (menuContext?.menuActive === props.path && props.path) ||
  return [
    "z-menu-item",
    menuContext?.menuActive === props?.path
      ? `is-active--${compType.value(menuContext)}`
      : "",
    menuContext?.collapse && menuContext?.mode === "horizontal"
      ? "z-menu-item--horizontal"
      : "",
    `z-menu-item--${compType.value(menuContext)}`,
  ];
});

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

const labelStyle: any = computed(() => {
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
  }
  &:hover {
    transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    -ms-transition: all 0.2s ease-out;
    -o-transition: all 0.2s ease-out;
  }
}

.z-menu-item--info {
  &:hover {
    background: rgba($info, 0.2);
    color: $info;
  }
}
.z-menu-item--primary {
  &:hover {
    background: rgba($primary, 0.2);
    color: $primary;
  }
}
.z-menu-item--success {
  &:hover {
    background: rgba($success, 0.2);
    color: $success;
  }
}

.z-menu-item--danger {
  &:hover {
    background: rgba($danger, 0.2);
    color: $danger;
  }
}

.z-menu-item--warning {
  &:hover {
    background: rgba($warning, 0.2);
    color: $warning;
  }
}
.z-menu-item--horizontal {
  .z-menu-item--icon {
    margin: 0;
  }
}
.is-active--primary {
  color: $primary;
}
.is-active--success {
  color: $success;
}
.is-active--info {
  color: $info;
}
.is-active--warning {
  color: $warning;
}
.is-active--danger {
  color: $danger;
}
</style>
