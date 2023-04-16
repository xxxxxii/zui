<template>
  <div :id="compUuid" :class="Class" v-click>
    <div class="z-select__wrapper" v-if="!multiple">
      <!-- <z-input
        readonly
        :placeholder="placeholder"
        v-model="Select"
        :size="size"
        right-icon="icon-xialajiantouxiao"
      /> -->
      <div class="z-select__wrapper__multiple__input">
        <input
          type="text"
          :value="Select"
          :placeholder="placeholder"
          :readonly="!seach"
        />
      </div>
      <span class="z-select__wrapper__icon">
        <z-icon name="icon-xialajiantouxiao" />
      </span>
    </div>
    <div v-else class="z-select__wrapper">
      <div class="z-select__wrapper__left">
        <div
          class="z-select__wrapper__multiple__input"
          v-show="!SelectArr || SelectArr?.length === 0"
        >
          <input type="text" :placeholder="placeholder" :readonly="seach" />
        </div>
        <div class="z-select__wrapper__multiple">
          <z-tag
            style="margin: 1px 2px"
            v-for="(item, index) in SelectArr"
            :label="item"
            :key="index"
            plain
            @close="() => tagClose(item, index)"
            >{{ item.label }}</z-tag
          >
        </div>
      </div>
      <div class="z-select__wrapper__right">
        <span class="z-select__wrapper__icon">
          <z-icon name="icon-xialajiantouxiao" />
        </span>
      </div>
    </div>
    <transition name="fade" v-show="showOptions">
      <!-- <ul class="z-select-dropdown">
        <z-options
          v-for="(item, index) in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :active="(modelValue as any).includes(item.value)"
          @selected="optionChange"
          @cancel="optionCancel"
          :multiple="multiple"
        />
      </ul> -->
      <list
        :options="options"
        :multiple="multiple"
        :modelValue="modelValue"
        @singeItem="singeItem"
        @multipleItem="multipleItem"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import setLabel from "./setLabel";
export default {
  name: "zSelect",
  directives: {
    setLabel,
  },
};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch, getCurrentInstance } from "vue";
import { uuidv4 } from "../utils/uuid";
import list from "./list.vue";

const compUuid = ref("z-select-" + uuidv4());

const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  options: {
    type: Array as () => Array<{ value: string; label: string }>,
    default: [
      {
        id: 1,
        label: "选项一",
        value: "1",
      },
      {
        id: 2,
        label: "选项二",
        value: "2",
      },
      {
        id: 3,
        label: "选项三",
        value: "3",
      },
    ],
  },
  modelValue: {
    type: [Number, String, Array],
    required: true,
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  size: {
    type: String,
    default: "md",
  },
  width: {
    type: String,
    default: "200px",
  },
  multiple: {
    type: Boolean,
  },
  seach: Boolean,
});
const showOptions = ref(false);

const Class = computed(() => {
  return [
    "z-select",
    showOptions.value ? "z-select-is-fcous" : "",
    props.multiple ? "z-select-multiple" : "",
    `z-select--${props.size}`,
  ];
});

if (
  typeof props.modelValue === "number" ||
  (typeof props.modelValue === "string" && props.modelValue != "")
) {
  emit("update:modelValue", [props.modelValue]);
}

const tagClose = (item, index) => {
  console.log(labelArr.value);
  labelArr.value.splice(index, 1);
  console.log(labelArr.value);
  labelArr.value = labelArr.value.map((item) => {
    return item.value;
  });
  emit("update:modelValue", Array.from(new Set(labelArr.value)));
  emit("change", Array.from(new Set(labelArr.value)));
};

const labelArr = ref([]);

const singeItem = (val) => {
  emit("update:modelValue", Array.from(new Set(val.value)));
};

const arr = ref([]);
const multipleItem = (val) => {
  arr.value = [...(props.modelValue as Array<string | number>)];
  arr.value.push(val.value);
  emit("update:modelValue", Array.from(new Set(arr.value)));
};
const SelectArr = computed(() => {
  if (!props.modelValue) {
    return null;
  }
  if (Array.isArray(props.modelValue)) {
    console.log(props.modelValue);
    let Currentitem = [];
    props.modelValue.forEach((valueItem) => {
      console.log(valueItem);
      let option = props.options.filter((item) => {
        return item.value === valueItem;
      });
      console.log(option);
      Currentitem.push(option[0]);
    });
    labelArr.value = Currentitem.map((item) => {
      return item;
    });
    return labelArr.value;
  }
});

const Select: any = computed(() => {
  if (!props.modelValue) {
    return null;
  }
  if (Array.isArray(props.modelValue)) {
    console.log(props.modelValue);
    let Currentitem = [];
    props.modelValue.forEach((valueItem) => {
      console.log(valueItem);
      let option = props.options.filter((item) => {
        return item.value === valueItem;
      });
      console.log(option);
      Currentitem.push(option[0]);
    });
    labelArr.value = Currentitem.map((item) => {
      console.log(item);
      return item.label;
    });
    if (props.multiple) {
      return "";
    } else {
      return labelArr.value.join(",");
    }

    // return props.modelValue;
  }
});

const selectArr = ref([]);
const optionChange = (val) => {
  selectArr.value = [...(props.modelValue as Array<string | number>)];

  console.log(val, props.modelValue, selectArr.value);
  // 多选
  if (props.multiple) {
    selectArr.value.push(val.value);
    emit("update:modelValue", Array.from(new Set(selectArr.value)));
    emit("change", Array.from(new Set(selectArr.value)));
  } else {
    emit("update:modelValue", [val.value]);
    emit("change", val.value);
  }
};

const optionCancel = (val) => {
  console.log(labelArr.value);

  const index = Array.from(
    new Set(
      ...labelArr.value.map((item) => {
        return item.value;
      })
    )
  ).indexOf(val.value);
  labelArr.value.splice(index, 1);
  console.log(labelArr.value);
  labelArr.value = labelArr.value.map((item) => {
    return item.value;
  });
  emit("update:modelValue", Array.from(new Set(labelArr.value)));
  emit("change", Array.from(new Set(labelArr.value)));
};

// function isParent(obj, parentObj) {
//   while (
//     obj != undefined &&
//     obj != null &&
//     obj.tagName.toUpperCase() != "BODY"
//   ) {
//     if (obj == parentObj) {
//       return true;
//     }
//     obj = obj.parentNode;
//   }
//   return false;
// }

// 控制下拉显示指令
const vClick = {
  beforeMount(el) {
    const handler = (e) => {
      console.log(e.target.classList);
      console.log();
      let dropdownDom = el?.querySelector(".z-select-dropdown");
      if (el.contains(e.target)) {
        if (
          e.target.classList.contains("z-tag__wrapper__close") ||
          e.target.classList.contains("icon")
        ) {
          showOptions.value = false;
        } else {
          showOptions.value = !showOptions.value;
        }
      } else {
        if (
          !(
            (e.target as HTMLElement).parentNode === dropdownDom ||
            e.target === dropdownDom
          )
        ) {
          showOptions.value = false;
        }
      }
    };
    document.addEventListener("click", handler);
  },
};
</script>

<style lang="scss" scoped>
.z-select {
  width: v-bind(width);
  display: inline-block;
  position: relative;
  top: 0;
  align-items: center;
  &--lg {
    .z-select__wrapper {
      padding: 10px 8px;
    }
  }
  &--md {
    .z-select__wrapper {
      padding: 8px 6px;
    }
  }
  &--xs {
    .z-select__wrapper {
      padding: 6px 4px;
    }
  }
}
html.dark {
  .z-select {
    color: $dark-color;
    .z-select-dropdown {
      background: $comp-dark-bg;
      box-shadow: $border-dark-shadow;
    }
  }
}

.z-select .z-select-dropdown {
  // display: none;
  opacity: 1;
  list-style: none;
  margin: 0;
  position: absolute;
  z-index: 2064;
  padding: 5px 0;
  left: 0;
  right: 0;
  top: calc(100% + 10px);
  box-shadow: $border-light-shadow;
  background: $comp-light-bg;
}
.z-select-multiple,
.z-select {
  border: 1px solid $light-border;
  cursor: pointer;
  border-radius: 4px;
}
.z-select-is-fcous {
  border: 1px solid $primary;
}
.z-select__wrapper {
  padding: 8px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .z-select__wrapper__right,
  .z-select__wrapper__left {
    display: flex;
    align-items: center;
  }
  .z-select__wrapper__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
  .z-select__wrapper__icon {
    font-size: 14px;
    display: flex;
    align-items: center;
  }
}
.z-select__wrapper__multiple {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  color: $color;
  // width: 100%;
  // min-height: 16px;
}
.z-select__wrapper__multiple__input {
  min-height: 16px;
  display: flex;
  align-items: center;
  input {
    outline: none;
    border: none;
    height: 100%;
    width: 100%;
    padding: 0;
    cursor: pointer;
    background: none;
    color: $light-color;
  }
}

.z-select-is-fcous .z-select__wrapper__icon {
  transition: transform 0.3s;
  transform: rotate(-180deg) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translate(0, -10px) !important;
  opacity: 0;
}
</style>
