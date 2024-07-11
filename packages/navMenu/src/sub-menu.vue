<template>
  <li
    :class="Class"
    :style="titleStyle"
    v-click
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <div
      ref="subMenuTitle"
      class="z-sub-menu__title"
      @mouseenter="subMenuTitleHover"
      @click="showSubMenu"
    >
      <div class="z-sub-menu__title__right">
        <z-icon
          class="z-sub-menu__title__right--icon"
          v-if="icon"
          :name="icon"
        />
        <span
          class="z-sub-menu__title__right--title"
          v-show="!(!subMenuContext && menuContext?.collapse)"
        >
          <slot name="title">
            <span>{{ title }}</span>
          </slot>
        </span>
      </div>
      <z-icon
        v-show="!(!subMenuContext && menuContext?.collapse)"
        class="z-sub-menu__title__icon"
        name="icon-xialajiantouxiao"
      ></z-icon>
    </div>
    <transition name="fade">
      <ul class="z-sub-menu--inline" :style="menuInlineStyle" v-show="showMenu">
        <div :style="menuInlineBgStyle" class="z-sub-menu--inline--bg">
          <slot />
        </div>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
export default {
  name: "z-sub-menu",
};
</script>

<script setup lang="ts">
import {
  inject,
  provide,
  ref,
  watch,
  onUnmounted,
  toRefs,
  useSlots,
  computed,
  toRaw,
  onMounted,
  nextTick,
  getCurrentInstance,
} from "vue";
import { subMenuContextKey, subMenuProps } from "./sub-menu";
import { menuContextKey } from "./menu";
import { deepClone } from "../../utils";
import { useCompGlobal } from "../../utils/compGlobal";
const { compSize, compType } = useCompGlobal();

const showMenu = ref(false);
const cacheMenuOpen = ref(false);

const props = defineProps(subMenuProps);

const slot = useSlots().default()[0].children;
const { proxy } = getCurrentInstance();
const subMenuData = ref({
  title: props.title || slot,
  children: [],
  // 菜单的层级
  tier: 1,
});
const Class = computed(() => {
  return [
    "z-sub-menu",
    "z-menu-item",
    showMenu.value ? "is-open" : "",
    menuContext?.mode === "horizontal" ? "is-horizontal" : "",
    menuContext?.collapse && menuContext?.mode === "horizontal"
      ? "z-menu-item--horizontal"
      : "",
    `z-menu-item--${compType.value(menuContext)}`,
  ];
});

const collectMneu = (item) => {
  console.log(item);
  subMenuData.value.children.push(item);
  //   list.value.push(item);
};

const menuContext = inject(menuContextKey, null);
const subMenuContext = inject(subMenuContextKey, null);

console.log(props.path, toRaw(menuContext.opens), "menuContext");

// if (props.path in toRaw(menuContext.opens)) {
//   // showMenu.value = true;
// }

const showSubMenu = () => {
  // 垂直模式下 hover 触发 不能点击
  if (menuContext?.trigger === "hover" && menuContext?.mode != "horizontal") {
    return;
  }
  if (!menuContext?.collapse) {
    showMenu.value = !showMenu.value;
    cacheMenuOpen.value = showMenu.value;
  }
};

// 收集 子菜单数据
if (subMenuContext) {
  subMenuData.value.tier += subMenuData.value.tier;
  subMenuContext?.collectMneu(subMenuData.value);
} else {
  menuContext?.collectMneu(subMenuData.value);
}

// 子菜单的样式
const titleStyle = computed(() => {
  if (menuContext?.mode === "horizontal" && subMenuData?.value.tier > 1) {
    return {
      minWidth: "150px",
    };
  }
  if (menuContext?.mode === "horizontal" && subMenuData?.value.tier === 1) {
    return {
      minWidth: "fit-content",
    };
  }
  return {};
});
const menuInlineStyle = computed(() => {
  if (menuContext?.collapse) {
    return {
      position: "fixed",
      // top: "0",
      // left: "100%",
      width: "200px",
      zIndex: 1000,
    };
  }
  if (menuContext?.mode === "horizontal" && subMenuData?.value.tier > 1) {
    return {
      padding: "0px",
      minWidth: "150px",
      position: "absolute",
      top: "0",
      left: "100%",
    };
  }
  if (menuContext?.mode === "horizontal" && subMenuData?.value.tier === 1) {
    return {
      padding: "0px",
      minWidth: "150px",
      position: "absolute",
      top: "100%",
    };
  }
  return {};
});

//
const menuInlineBgStyle = computed(() => {
  if (menuContext?.mode === "horizontal" && subMenuData?.value.tier > 1) {
    return {
      marginLeft: "6px",
    };
  }
  if (menuContext?.mode === "horizontal" && subMenuData?.value.tier === 1) {
    return {
      marginTop: "6px",
    };
  }
  return {};
});

const itemPadding = computed(() => {
  if (
    menuContext?.mode === "horizontal" ||
    (menuContext?.collapse && subMenuContext)
  ) {
    return "0 20px";
  } else return "0 20px 0 " + subMenuData.value.tier * 20 + "px";
});

const mouseenter = (e) => {
  // e.stopPropagation();
  if (menuContext?.trigger === "hover" || menuContext?.collapse)
    showMenu.value = true;
  cacheMenuOpen.value = showMenu.value;
  menuContext?.setOverflowStyle(false);
  console.log(menuContext, "menuContext");
  // if (menuContext?.collapse) {
  //   showMenu.value = true;
  //   let subMneuDom = e.target.querySelector(".z-sub-menu--inline");
  //   subMneuDom.style.display = "block";
  //   subMneuDom.style.top = e.clientY + "px";
  //   subMneuDom.style.left = e.clientX + "px";
  //   console.log(subMneuDom, "e");
  // }
  return false;
};
const mouseleave = (e) => {
  e.stopPropagation();

  if (menuContext?.trigger === "hover" || menuContext?.collapse)
    showMenu.value = false;
  cacheMenuOpen.value = showMenu.value;
  // if (menuContext?.collapse) {
  //   showMenu.value = false;
  //   let subMneuDom = e.target.querySelector(".z-sub-menu--inline");
  //   subMneuDom.style.display = "none";
  // }
  return false;
};
const subMenuTitleHover = (e) => {
  console.log("subMenuTitleHover", e);
  e.stopPropagation();
  e.preventDefault();
  nextTick(() => {
    let curDom = document.querySelector(".z-sub-menu__title");
    let rect = curDom.getBoundingClientRect();
    let curRef = proxy.$refs.subMenuTitle;
    console.log(
      rect,
      proxy.$refs.subMenuTitle.offsetTop,
      window.scrollY,
      "curDom"
    );
    if (menuContext?.collapse) {
      const childMenuDom = e.target?.nextSibling;
      childMenuDom.style.position = "fixed";
      childMenuDom.style.display = "block";
      childMenuDom.style.top = e.clientY + "px";
      childMenuDom.style.left = rect.left + curRef.offsetWidth + "px";
      console.log(e.target.nextSibling, "222222");
    }
  });
};
watch(
  () => showMenu.value,
  () => {
    menuContext?.collectMenuState(props.path, showMenu.value);
  }
);
watch(
  () => menuContext?.collapse,
  () => {
    document
      .querySelector(".z-menu-item .z-sub-menu__title")
      .addEventListener("mouseenter", (e: any) => {});

    document
      .querySelector(".z-sub-menu__title")
      .addEventListener("mouseleave", (e: any) => {
        const childMenuDom = e.target?.nextSibling;
        childMenuDom.style.position = "fixed";
        childMenuDom.style.display = "none";
      });
  }
);

const vClick = {
  beforeMount(el) {
    const handler = (e) => {
      e.preventDefault();
      console.log(el.contains(e.target));
      if (!el.contains(e.target)) {
        showMenu.value = false;
      }
    };

    // 只在 horizontal 模式下生效
    menuContext?.mode === "horizontal" && menuContext?.trigger === "click"
      ? document.addEventListener("click", handler, true)
      : "";
  },
  updated(el) {
    console.log(menuContext?.trigger, menuContext?.mode);
  },
};

onUnmounted(() => {});

const setShowMenu = (flag) => {
  showMenu.value = flag;
};

onMounted(() => {
  console.log(document, "document");

  document
    .querySelector(".z-sub-menu__title")
    .addEventListener("mouseenter", (e: any) => {
      console.log(e, "mouseenter");
      if (menuContext?.collapse) {
        const childMenuDom = e.target?.nextSibling;
        childMenuDom.style.position = "fixed";
        childMenuDom.style.display = "block";
        childMenuDom.style.top = e.clientY + "px";
        childMenuDom.style.left = e.clientX + "px";
        console.log(e.target.nextSibling, "222222");
      }
    });

  document
    .querySelector(".z-sub-menu__title")
    .addEventListener("mouseleave", (e: any) => {
      if (menuContext?.collapse) {
        const childMenuDom = e.target?.nextSibling;
        childMenuDom.style.position = "fixed";
        childMenuDom.style.display = "none";
      }
    });
});

const context = ref({
  ...toRefs(props),
  collectMneu,
  setShowMenu,
  tier: subMenuData.value.tier,
  itemPadding,
});
menuContext?.collectMneuContext(context.value);
provide(subMenuContextKey, context.value);
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.z-sub-menu {
  position: relative;
}
.z-sub-menu__title {
  padding: v-bind(itemPadding);
  line-height: 50px;
  height: 50px;
  display: flex;

  white-space: nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .z-sub-menu__title__right {
    display: flex;
    align-items: center;
    .z-sub-menu__title__right--icon {
      margin-right: 10px;
      font-size: 18px;
    }
  }
  &:hover {
    transition: all 0.2s ease-out;
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    -ms-transition: all 0.2s ease-out;
    -o-transition: all 0.2s ease-out;
  }

  .z-sub-menu__title__icon {
    transition: all 0.3s;
    font-size: 12px;
    margin-left: 10px;
  }
}

.is-open {
  > .z-sub-menu__title {
    > .z-sub-menu__title__icon {
      transform: rotate(180deg);
    }
  }
}
.z-menu-item--horizontal {
  .z-sub-menu__title
    > .z-sub-menu__title__right
    > .z-sub-menu__title__right--icon {
    margin: 0;
  }
}
.z-sub-menu--inline {
  padding: 0;
  margin: 0;
  z-index: 1000;
  transition: all 0s;
  > div {
    background: $menu-light-theme;
  }
}

html.dark {
  .z-sub-menu--inline {
    > div {
      box-shadow: $border-dark-shadow;
      background: $menu-dark-theme;
    }
    //
  }
}
.is-horizontal {
  > .z-sub-menu--inline {
    > div {
      box-shadow: $border-light-shadow;
    }
  }
}

// 动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s transform 0.4s, opacity 0.1s;
}

.fade-enter-from {
  transform: translate(0%, -50);
  height: 0;
  opacity: 0;
}

.fade-leave-to {
  transform: translate(0%, -50) !important;
  height: 0;
  opacity: 0;
}
</style>
