<template>
  <ul :class="Class">
    <template v-for="item in items">
      <li
        v-if="!item[menuKey.childrenKey]"
        @click="toRouter(item)"
        class="z-menu-item"
        :class="{ 'is-active': active === item[menuKey.activeKey] }"
      >
        <span class="z-menu-item-title">
          <span class="z-menu-item--left"
            ><z-icon :name="item[menuKey.iconKey]" class="z-menu-item--icon" />
            {{ item[menuKey.labelKey] }}
          </span>
        </span>
      </li>
      <div v-else class="z-menu-sub z-menu-item">
        <li class="z-menu-item-title">
          <span class="z-menu-item--left">
            <z-icon class="z-menu-item--icon" :name="item[menuKey.iconKey]" />
            {{ item[menuKey.labelKey] }} </span
          ><z-icon
            class="sub-menu--icon z-menu-sub-icon"
            name="icon-xialajiantouxiao"
            size="12"
          ></z-icon>
        </li>

        <div class="z-menu-sub-box">
          <zMenuItem
            :items="item[menuKey.childrenKey]"
            :menuKey="menuKey"
            :active="active"
            :mode="mode"
          ></zMenuItem>
        </div>
      </div>
    </template>
  </ul>
</template>

<script lang="ts">
export default {
  name: "zMenuItem",
};
</script>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import zMenuItem from "./menuItem.vue";
import { menuDto, menuKeyDto } from "./types/menu";
const props = defineProps({
  items: Array as () => Array<menuDto>,
  mode: {
    type: String,
    default: "horizontal",
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
  active: {
    type: String,
  },
});

const router = useRouter();
const toRouter = (item) => {
  item[props.menuKey.pathKey] && router.push(item[props.menuKey.pathKey]);
};

const Class = computed(() => {
  return [`z-menu-item--horizontal`];
});
</script>

<style scoped lang="scss">
.z-menu-item--horizontal {
  display: flex;
  flex-direction: column;

  padding: 0;

  .z-menu-sub {
    // height: fit-content;
    cursor: pointer;
    font-size: 14px;
    position: relative;
    ul {
      background: none;
    }
    .z-menu-sub-box {
      position: absolute;
      left: 100%;
      top: 0;
      display: none;
      li {
        height: fit-content;
        white-space: nowrap;
      }
    }
    .z-menu-sub-icon {
      transition: all 0.2s linear;
      transform: rotate(-90deg);
      margin-left: 5px;
    }
    &:hover {
      > .z-menu-sub-box {
        display: block;
      }
      .sub-menu--icon {
        transform: rotate(90deg);
      }
    }
  }
  li {
    height: fit-content;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
  }
}
html.dark {
  .z-menu-item {
    background: $menu-dark-bg;
    color: $dark-color;
  }
}
.z-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $menu-light-bg;
  .z-menu-item-title {
    padding: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // color: aqua;
    .z-menu-item--left {
      display: flex;
      align-items: center;
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
    &:hover {
      background: rgba($color: $primary, $alpha: 0.2);
      color: $primary;
    }
  }
}
.is-active {
  color: $primary;
}
</style>
