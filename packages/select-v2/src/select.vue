<template>
  <!-- @mouseenter="hover = true" @mouseleave="hover = false" -->
  <div :class="Class">
    <z-popover
      placement="bottom"
      trigger="click"
      :visible="showDown"
      selfSet
      @hover="popoverHover"
      @clickTarget="popoverClick"
      :width="width"
    >
      <span class="z-select__wrapper">
        <div class="z-select__wrapper__content">
          <div
            v-if="tag && multiple && tagList.length > 0"
            class="z-select__wrapper__tags"
          >
            <z-tag
              style="margin: 1px"
              v-for="(item, index) in tagList"
              :key="item?.vallue || index"
              closeable
              :size="size"
              @close="tagClose(item, index)"
              >{{ item.label }}</z-tag
            >
          </div>

          <input
            v-else
            type="text"
            :value="selectValue"
            :placeholder="placeholder"
            readonly
            @blur="blur"
          />
        </div>

        <span class="z-select__wrapper__icon">
          <z-icon
            name="icon-xialajiantouxiao"
            class="z-select__wrapper__icon__inner"
          />
        </span>
      </span>

      <template #content>
        <z-select-dropdown class="z-select__dropdown">
          <slot />
        </z-select-dropdown>
      </template>
    </z-popover>
  </div>
</template>

<script lang="ts">
export default {
  name: "z-select",
};
</script>

<script setup lang="ts">
import { computed, ref, inject } from "vue";
import zSelectDropdown from "./select-dropdown.vue";
import { selectContextKey, selectProps } from "./select";
import { provide } from "vue";
import { watch } from "vue";
import { toRefs } from "vue";
import { onMounted } from "vue";
import { formItemContextKey } from "../../form/src/form-item";
import { useCompGlobal } from "../../utils/compGlobal";
const { compSize, compTYpe } = useCompGlobal();

const formItemContext = inject(formItemContextKey, null);

const props = defineProps(selectProps);
const emit = defineEmits(["update:modelValue"]);

// 显示下拉
const showDown = ref(false);
// 显示hover
const hover = ref(false);
// 显示focus
const fcous = ref(false);

const Class = computed(() => {
  return [
    "z-select",
    hover.value && !fcous.value ? "is-hover" : "",
    fcous.value ? `is-fcous--${compTYpe.value(props)}` : "",
    showDown.value ? "icon-rotate" : "",
    props.multiple ? "z-select-multiple" : "",
    `z-select--${compSize.value(props)}`,
  ];
});

const popoverHover = (val) => {
  hover.value = val;
};

// 控制下拉逻辑
const popoverClick = ({ el, target }) => {
  const dropDownDom = el?.querySelector(".z-select__dropdown");

  if (
    (dropDownDom === target || dropDownDom === target.parentNode) &&
    props.multiple
  ) {
    showDown.value = true;
    return;
  }
  if (el.contains(target)) {
    formItemContext?.validate("change").catch(() => {});
    if (
      target.classList.contains("z-tag__wrapper__close") ||
      target.parentNode.parentNode.classList.contains("z-tag__wrapper__close")
    ) {
      showDown.value = false;
    } else {
      // if (!props.seach)
      fcous.value = true;
      showDown.value = !showDown.value;
    }
    // fcous.value = true;
    // showDown.value = !showDown.value;
  } else {
    if (dropDownDom === target || dropDownDom === target.parentNode) {
      showDown.value = true;
      return;
    }
    fcous.value = false;
    showDown.value = false;
  }
};

const blur = (e) => {};

const optionList: Array<object> = [];
onMounted(() => {
  if (Array.isArray(props?.modelValue)) {
    let initData = [];
    (props.modelValue as Array<string | number>).map((item) => {
      console.log(item, optionList.length);
      let currentItem = optionList.filter((OItem: any) => {
        console.log(OItem);
        return OItem.value === item;
      });
      tagList.value.push(...currentItem);
      initData.push(...currentItem);
    });

    selectValue.value = initData
      .map((item) => {
        console.log(item);
        return item.label;
      })
      .join(",");
    console.log(selectValue.value);
  } else {
    let initData = [];
    initData = optionList.filter((OItem: any) => {
      console.log(OItem);
      return OItem.value === props.modelValue;
    });
    selectValue.value = initData
      .map((item) => {
        console.log(item);
        return item.label;
      })
      .join(",");
    console.log(selectValue.value);
  }
  console.log(selectValue.value);
});

const selectValue = ref(null);
// const placeholder = ref(null);
const tagList = ref([]);

const tagClose = (item, index) => {
  tagList.value.splice(index, 1);
  let list = tagList.value.map((item) => {
    return item.value;
  });
  emit("update:modelValue", Array.from(new Set(list)));
};
const changeOption = ({ value, label }, tag = false) => {
  // 单选模式
  if (!props.multiple) {
    emit("update:modelValue", value);
  } else {
    let index = (context.value.modelValue as Array<string | number>).indexOf(
      value
    );
    if (index === -1 && !tag) {
      tagList.value.push({ value, label });
    }
    if (index != -1 && !tag) {
      tagList.value.splice(index, 1);
    }
    let list = tagList.value.map((item) => {
      return item.value;
    });
    emit("update:modelValue", Array.from(new Set(list)));
  }
};

const collectData = (item) => {
  optionList.push(item);
};
const context = ref({
  ...toRefs(props),
  changeOption,
  collectData,
});
watch(
  () => props.modelValue,
  (newVal) => {
    console.log(formItemContext);
    formItemContext?.validate("change").catch(() => {});

    if (!props.multiple) {
      let currentOption = optionList.filter((item: any) => {
        return item.value === newVal;
      });
      selectValue.value = currentOption
        .map((item: any) => {
          return item.label;
        })
        .join(",");
    } else {
      let tagLists = [];
      let initData = [];
      (newVal as Array<string | number>).map((item) => {
        console.log(item, optionList.length);
        let currentItem = optionList.filter((OItem: any) => {
          console.log(OItem);
          return OItem.value === item;
        });
        tagLists.push(...currentItem);
        initData.push(...currentItem);
      });
      console.log(tagLists);
      tagList.value = tagLists;
      selectValue.value = initData
        .map((item) => {
          console.log(item);
          return item.label;
        })
        .join(",");
    }
  }
);
//
provide(selectContextKey, context.value);
</script>

<style lang="scss" scoped>
.z-select {
  width: v-bind(width);
}
input {
  outline: none;
  border: none;
}
.is-hover {
  .z-select__wrapper {
    border: 1px solid #787878;
  }
}

.icon-rotate {
  .z-select__wrapper {
    &__icon__inner {
      transition: transform 0.3s;
      transform: rotate(-180deg) !important;
    }
  }
}

html.dark {
  .z-select {
    input {
      background: $dark-bg;
      color: $dark-color;
    }
    &__dropdown {
      background: $comp-dark-bg;
      box-shadow: $border-dark-shadow;
    }
  }
}
</style>
