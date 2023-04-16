<template>
  <ul class="sub-menu--vertical-box">
    <div class="title-box">
      <template v-for="(item, index) in items">
        <li
          v-if="!item[menuKey.childrenKey]"
          class="menu-item-title"
          :class="{ 'is-active': active === item[menuKey.activeKey] }"
          :style="{ paddingLeft: item.tier * 10 + 20 + 'px' }"
          @click="toRouter(item)"
        >
          <span>
            <z-icon
              class="menu-item-title--icon"
              :name="item[menuKey.iconKey]"
            />{{ item[menuKey.labelKey] }}</span
          >
        </li>
        <div
          v-if="item[menuKey.childrenKey]"
          class="z-menu-sub"
          @mouseleave="mouseLeave"
          @mouseenter="mouseEnter"
        >
          <li
            class="z-menu-sub--title menu-item-title"
            :style="{ paddingLeft: item.tier * 10 + 20 + 'px' }"
            :class="{ 'is-open': subMenuShow }"
            @click="showSubMenu"
          >
            <span>
              <z-icon
                class="menu-item-title--icon"
                :name="item[menuKey.iconKey]"
              />
              {{ item[menuKey.labelKey] }} </span
            ><z-icon
              class="sub-menu--icon"
              name="icon-xialajiantouxiao"
              size="12"
            ></z-icon>
          </li>

          <zMenuVItem
            v-show="subMenuShow"
            :items="item[menuKey.childrenKey]"
            :menuKey="menuKey"
            :collapse="collapse"
            class="sub-menu-item"
            @updateActive="updateActive"
            :active="active"
          ></zMenuVItem>
        </div>
      </template>
    </div>
  </ul>
</template>

<script lang="ts">
export default {
  name: "zMenuVItem",
};
</script>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import { useRouter } from "vue-router";
import zMenuVItem from "./menuVItem.vue";
import { menuDto, menuKeyDto } from "./types/menu";

const subMenuShow = ref(false);

const props = defineProps({
  items: {
    type: Array as () => Array<menuDto>,
  },

  collapse: {
    type: Boolean,
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

const emit = defineEmits(["updateActive"]);

const router = useRouter();
const toRouter = (item) => {
  //   props.active = item[props.menuKey.activeKey];
  emit("updateActive", item[props.menuKey.activeKey]);
  item[props.menuKey.pathKey] && router.push(item[props.menuKey.pathKey]);
};

const showSubMenu = () => {
  if (!props.collapse) subMenuShow.value = !subMenuShow.value;
};
const mouseEnter = (e) => {
  if (props.collapse) subMenuShow.value = true;
};
const mouseLeave = (e) => {
  if (props.collapse) subMenuShow.value = false;
};

const updateActive = (val) => {
  console.log(val, props.active);
  emit("updateActive", val);
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  li {
    height: 56px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: rgba($color: $primary, $alpha: 0.2);
      color: $primary;
    }
  }
}
.z-menu-sub {
  display: flex;
  flex-direction: column;
  // transition: width height 0.4s linear;
  .z-menu-sub--title {
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    line-height: 56px;
    align-items: center;
  }
  .sub-menu-item {
  }
}
.menu-item-title {
  padding: 0 20px;
  span {
    display: flex;
    align-items: center;
    .menu-item-title--icon {
      font-size: 1.2rem;
      margin-right: 5px;
    }
  }
  .sub-menu--icon {
    transition: all 0.2s linear;
  }
}

.sub-menu--vertical-box {
  // transition: width height 0.4s linear;
  z-index: 999;
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
</style>
