<template>
  <nav :class="Class" v-if="hasSlot('default') != true">
    <ul>
      <template v-for="(item, index) in items">
        <li
          v-if="!item[menuKey.childrenKey]"
          class="z-menu-item"
          :class="{ 'is-active': modelValue === item[menuKey.activeKey] }"
          @click="toRouter(item)"
        >
          <span class="z-menu-item--title">
            <span class="z-menu-item--left">
              <z-icon
                class="z-menu-item--icon"
                v-if="item[menuKey.iconKey]"
                :name="item[menuKey.iconKey]"
              />
              <span class="z-menu-item--text">
                {{ item[menuKey.labelKey] }}
              </span>
            </span>
          </span>
        </li>
        <li
          v-if="item[menuKey.childrenKey] && mode === 'horizontal'"
          class="z-menu-item"
        >
          <span class="z-menu-item--title">
            <z-icon
              :name="item[menuKey.iconKey]"
              v-if="item[menuKey.iconKey]"
              class="z-menu-item--icon"
            />
            <span class="z-menu-item--text"
              >{{ item[menuKey.labelKey] }}
              <z-icon
                class="sub-menu--icon"
                name="icon-xialajiantouxiao"
                size="12"
              ></z-icon>
            </span>
          </span>

          <zMenuItem
            class="sub-menu--box"
            :items="item[menuKey.childrenKey]"
            :mode="mode"
            :menuKey="menuKey"
          ></zMenuItem>
        </li>
        <!--  -->
        <div
          v-if="item[menuKey.childrenKey] && mode === 'vertical'"
          class="sub-menu--vertical"
          @mouseenter="mouseEnter"
          @mouseleave="mouseLeave"
        >
          <li
            class="sub-title--vertical z-menu-item"
            :class="{ 'is-open': subMenuShow }"
            @click.prevent="showSubMenu"
          >
            <span class="z-menu-item--title">
              <span class="z-menu-item--left">
                <z-icon
                  class="z-menu-item--icon"
                  v-if="item[menuKey.iconKey]"
                  :name="item[menuKey.iconKey]"
                />
                <span class="z-menu-item--text">
                  {{ item[menuKey.labelKey] }}
                </span>
              </span>

              <z-icon
                class="sub-menu--icon"
                name="icon-xialajiantouxiao"
                size="12"
              ></z-icon>
            </span>
          </li>
          <zMenuVItem
            class="sub-menu-item"
            :class="{
              'sub-menu-show': subMenuShow,
              'sub-menu-hidden': !subMenuShow,
            }"
            :items="item[menuKey.childrenKey]"
            :collapse="collapse"
            :active="modelValue"
            :menuKey="menuKey"
            @updateActive="updateActive"
          />
        </div>
      </template>
    </ul>
  </nav>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "zMenu",
};
</script>

<script setup lang="ts">
import { computed, useSlots, ref, watch } from "vue";
import { useRouter } from "vue-router";
import zMenuItem from "./menuItem.vue";
import zMenuVItem from "./menuVItem.vue";
import { menuDto, menuKeyDto } from "./types/menu";

const slots: any = useSlots();
const hasSlot = (name) => !!slots[name];

const props = defineProps({
  mode: {
    type: String,
    default: "vertical",
  },
  items: {
    type: Array as () => Array<menuDto>,
    default: [],
  },
  menuKey: {
    type: Object as () => menuKeyDto,
    default: {
      labelKey: "label",
      pathKey: "path",
      childrenKey: "children",
      iconKey: "icon",
      activeKey: "path",
    },
  },
  collapse: {
    type: Boolean,
  },
  modelValue: {
    type: String,
  },
  width: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const router = useRouter();
const toRouter = (item) => {
  emit("update:modelValue", item[props.menuKey.activeKey]);
  item[props.menuKey.pathKey] && router.push(item[props.menuKey.pathKey]);
};

const updateActive = (val) => {
  emit("update:modelValue", val);
};

// watch(props.items, (newVal, oldVal) => {
//   let activeItem = newVal.findIndex((item) => {
//     return item.isActive === true;
//   });
//   console.log(newVal, activeItem);
// });

function setItemTier(items, tier) {
  items.forEach((item) => {
    item["tier"] = tier;
    if (item.children) {
      // item["tier"] = item.tier + 1 || i;
      setItemTier(item.children, item["tier"] + 1);
    }
  });
}

setItemTier(props.items, 0);
console.log(props.items);

const Class = computed(() => {
  return [
    "z-menu",
    `z-menu--${props.mode}`,
    props.collapse ? `z-menu--collapse` : "",
  ];
});

const subMenuShow = ref(false);
const showSubMenu = (e) => {
  if (!props.collapse) {
    subMenuShow.value = !subMenuShow.value;
  }
};
const mouseEnter = (e) => {
  if (props.collapse) subMenuShow.value = true;
};
const mouseLeave = (e) => {
  if (props.collapse) subMenuShow.value = false;
};

const menuWidth = computed(() => {
  return props.width ? props.width : "200px";
});
</script>

<style scoped lang="scss">
.z-menu {
  font-size: 14px;
  background: $menu-light-bg;
}
html.dark {
  .z-menu--collapse {
    .sub-menu-item {
      position: absolute;
      width: fit-content;
      top: 0;
      left: 100%;
      display: none;
      background: $menu-dark-bg;
      // box-shadow: $border-dark-shadow;
    }
  }
  .z-menu {
    background: $menu-dark-bg;
  }
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    height: 56px;
    cursor: pointer;
    // transition: all 0.3s linear;
  }
}

.z-menu--horizontal {
  display: flex;
  align-items: center;
  ul {
    display: flex;
    .z-menu-item {
      white-space: nowrap;
      position: relative;

      .sub-menu--icon {
        margin-left: 5px;
        transition: all 0.2s linear;
      }
      &:hover {
        .sub-menu--icon {
          transform: rotate(180deg);
        }
        .sub-menu--box {
          display: block;
          //   background: $light-bg;
          color: $light-color;
        }
      }

      .sub-menu--box {
        position: absolute;
        padding: 0;
        display: none;
        top: 100%;
        left: 0;
      }
    }
    li {
      height: 60px;
    }
  }
}

.z-menu--vertical {
  display: flex;
  flex-direction: column;
  width: v-bind(menuWidth);
  ul {
    display: flex;
    flex-direction: column;
    .sub-menu--vertical {
      display: flex;
      flex-direction: column;
      height: auto;

      &:hover {
        background: none;
      }
      li {
        // padding: 0 20px;
      }
      .sub-title--vertical {
        display: flex;
        line-height: 56px;
        align-items: center;
        white-space: nowrap;
        justify-content: space-between;

        &:hover {
          background: rgba($color: $primary, $alpha: 0.2);
          color: $primary;
        }
      }
      .sub-menu--icon {
        // transition: all 0.2s linear;
      }
    }
  }
}

.z-menu-item {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .z-menu-item--title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .z-menu-item--left {
      display: flex;
      justify-content: space-between;
    }
    .z-menu-item--text {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .z-menu-item--icon {
      font-size: 1.2rem;
      margin-right: 5px;
      transition: all 0.2s linear;
    }
  }
  &:hover {
    background: rgba($color: $primary, $alpha: 0.2);
    color: $primary;
  }
}

.z-menu--collapse {
  width: 70px !important;

  .z-menu-item {
    text-align: center;
    .z-menu-item--title {
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      .z-menu-item--icon {
        margin: 0;
      }
    }
    .z-menu-item--text {
      display: none;
    }
    .sub-menu--icon {
      display: none;
    }
  }
  .sub-menu--vertical {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .sub-menu-item {
    position: absolute;
    width: fit-content;
    top: 0;
    left: 100%;
    display: none;
    background: $menu-light-bg;
    // box-shadow: $border-light-shadow;
  }
}

.sub-menu--icon {
  margin-left: 5px;
}
.is-open {
  .sub-menu--icon {
    transform: rotate(180deg);
  }
}
.is-active {
  color: $primary;
}
.sub-menu-item {
  display: none !important;
}
.sub-menu-show {
  display: block !important;
}
.sub-menu-hidden {
  display: none !important;
}
</style>
