<template>
  <nav :class="Class" :style="OverflowStyle">
    <slot />
  </nav>
</template>

<script lang="ts">
export default {
  name: "z-nav-menu",
};
</script>

<script setup lang="ts">
import { ref, computed, watch, toRefs, provide } from "vue";
import { menuContextKey, menuProps } from "./menu";

const props = defineProps(menuProps);
const emit = defineEmits(["clickMenuItem", "open", "close"]);

const Class = computed(() => {
  return ["z-nav-menu", props.mode === "horizontal" ? "is-horizontal" : ""];
});

const menu = [];
const collectMneu = (item) => {
  menu.push(item);
};

const menuWidth = computed(() => {
  if (props.collapse && props.mode === "horizontal") return "100%";
  if (props.collapse && props.mode === "vertical") return "58px";
  if (props.mode === "vertical" && !props.collapse) {
    return props.width;
  } else {
    return "100%";
  }
});

const menuActiveChange = (path) => {
  menuActive.value = path;
  emit("clickMenuItem", menuActive.value);
};

const openState = ref([]);
const closeState = ref([]);
const collectMenuState = (path, state) => {
  console.log(path, state);
  if (!path) return;
  //open
  if (state) {
    openState.value.push(path);
    let index = closeState.value.findIndex((item) => {
      return path === item;
    });
    closeState.value.splice(index, 1);
  } else {
    closeState.value.push(path);
    let index = openState.value.findIndex((item) => {
      return path === item;
    });
    openState.value.splice(index, 1);
  }
  emit("open", path, Array.from(new Set(openState.value)));
  emit("close", path, Array.from(new Set(closeState.value)));
};
const menuActive = ref(props.active);

const subMenuContextList = ref([]);
const collectMneuContext = (item) => {
  subMenuContextList.value.push(item);
};

watch(
  () => props.collapse,
  (newVal) => {
    if (newVal) {
      if (props.mode === "vertical") {
        setOverflowStyle(true);
      }

      subMenuContextList.value.map((item) => {
        item?.setShowMenu(false);
      });
    } else {
      if (props.opens && Array.isArray(props.opens)) {
        let arr = [];
        props.opens.forEach((menusPathItem) => {
          arr.push(
            ...subMenuContextList.value.filter((item) => {
              return item.path === menusPathItem;
            })
          );
        });
        console.log(props.opens, arr);
        arr.map((item) => {
          item?.setShowMenu(true);
        });
      }
    }
  },
  {
    immediate: true,
  }
);

// 监听 选中菜单
watch(
  () => props.active,
  (newVal) => {
    menuActive.value = newVal;
  }
);
const isOverflowHidden = ref(false);
const setOverflowStyle = (state) => {
  isOverflowHidden.value = state;
  console.log("setOverflowStyle", isOverflowHidden.value, state);
};

const OverflowStyle = computed(() => {
  console.log(isOverflowHidden.value, "isOverflowHidden");
  if (isOverflowHidden.value) {
    return {
      overflow: "hidden",
    };
  } else {
    return {
      overflow: "visible",
    };
  }
});

const context = ref({
  ...toRefs(props),
  menu,
  openState,
  menuActive,
  collectMneu,
  menuActiveChange,
  collectMenuState,
  collectMneuContext,
  setOverflowStyle,
});

provide(menuContextKey, context.value);
</script>

<style lang="scss" scoped>
.z-nav-menu {
  font-size: 14px;
  width: v-bind(menuWidth);
  background: $menu-light-theme;
  transition: width 0.3s;
  display: inline;
}
html.dark {
  .z-nav-menu {
    background: $menu-dark-theme;
  }
}
.is-horizontal {
  display: flex;
  flex-direction: row;
}
ul {
  list-style: none;
  li {
    list-style: none;
  }
}
</style>
