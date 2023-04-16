<template>
  <div class="z-switch">
    <div :class="Class" class="z-switch-container">
      <input
        class="z-switch-checkbox"
        :checked="modelValue"
        :id="dateStr"
        hidden
        type="checkbox"
        @change="zSwitchChange"
      />
      <label
        class="z-switch-label"
        :class="`z-switch-${props.type}`"
        :for="dateStr"
      >
        <div class="z-switch-inner">
          <div class="z-switch-innerText" v-if="showText">
            <div class="z-switch-innerText_box">
              <div class="z-switch-innerTextBox-true"></div>
            </div>
            <div class="z-switch-innerText_box">
              <div class="z-switch-innerTextBox-false"></div>
            </div>
            <!-- {{ text }} -->
            <!-- <z-icon name="icon-pro-success"></z-icon> -->
          </div>
        </div>
        <span class="z-switch-action" :class="`z-switch-action-${size}`"></span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "zSwitch",
};
</script>

<script setup lang="ts">
import { uuidv4 } from "../utils/uuid";
import { computed, createVNode, ref, h, render, nextTick, watch } from "vue";
import zIcon from "../icon";

const dateStr = ref("z-switch" + "-" + uuidv4());
//  new Date().valueOf();
const props: any = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  modelValue: {
    type: [Boolean],
    default: false,
  },
  showText: {
    type: Boolean,
    default: false,
  },
  text: {
    type: [Object],
  },
  activeIcon: {
    type: String,
  },
  inActiveIcon: {
    type: String,
  },
});

// watch(
//   () => props.text,
//   (newVal, oldVal) => {
//     console.log(newVal);
//     const dom = document.querySelector(".z-switch-innerText");
//     const container = document.createElement("div");
//     render(null, container);
//     dom.append(container);
//     setIocn();
//   },
//   { deep: true }
// );

console.log(props.activeIcon, props.inActiveIcon);
if (props.activeIcon) {
  setIocn(".z-switch-innerTextBox-false", props.activeIcon);
}
if (props.inActiveIcon) {
  setIocn(".z-switch-innerTextBox-true", props.inActiveIcon);
}
function setIocn(domBox, iconName) {
  nextTick(() => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    const dom = document.querySelector(domBox);

    const vm = h(zIcon, {
      name: iconName,
      color: "red",
      styles: {
        margin: "0 5px 0 5px",
      },
    });
    console.log(props.text.name);
    render(vm, container);
    dom.append(container);
  });
}

// if (props.showText && props.text?.type === "icon") {
//   setIocn();
// }

const emit = defineEmits(["update:modelValue", "change"]);
// `z-switch-${props.type}`

const Class = computed(() => {
  return [`z-switch-${props.size}`];
});

const zSwitchChange = (e) => {
  emit("update:modelValue", e.target.checked);
  emit("change", e.target.checked);
  console.log(e.target.checked);
};
</script>

<style scoped lang="scss">
.z-switch {
  display: inline-block;
  height: fit-content;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  background-color: #e4e4e4;
  border-radius: 20px;

  &-checkbox {
    display: none;
  }
  .z-switch-container {
    position: relative;

    .z-switch-action-md {
      width: 16px;
      height: 16px;
    }
    .z-switch-action-lg {
      width: 20px;
      height: 20px;
    }
    .z-switch-action-xs {
      width: 12px;
      height: 12px;
    }
  }
  &-lg {
    width: 50px;
    height: 24px;
    border-radius: 12px;
    .z-switch-label {
      .z-switch-inner {
        .z-switch-innerText {
          //   width: calc(100% - 24px);
        }
      }
    }
  }
  &-md {
    width: 40px;
    height: 20px;
    border-radius: 10px;
    .z-switch-label {
      .z-switch-inner {
        .z-switch-innerText {
          //   width: calc(100% - 20px);
        }
      }
    }
  }
  &-xs {
    width: 30px;
    height: 16px;
    border-radius: 8px;
    .z-switch-label {
      .z-switch-inner {
        .z-switch-innerText {
          //   width: calc(100% - 14px);
        }
      }
    }
  }

  &-label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    outline: none;
    border: none;
    border-radius: 20px;
    overflow: hidden;
    // margin: 2px;
    display: inline-flex;
    transition: left right 1s ease-in-out;
    cursor: pointer;
    .z-switch-inner {
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: 20px;
      justify-content: space-between;

      .z-switch-innerText {
        flex: 1;
        width: 0;
        // padding-left: 4;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        justify-content: flex-end;
        margin: 0 2px;
      }
    }
  }
  .z-switch-action {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 1px;
    transform: translate(0, -50%);

    //   border: 2px solid #999999;
    border-radius: 50%;
    background: #ffffff;
  }
}

.z-switch-checkbox:checked + {
  .z-switch-primary {
    background-color: $primary;
  }
  .z-switch-success {
    background-color: $success;
  }
  .z-switch-info {
    background-color: $info;
  }
  .z-switch-danger {
    background-color: $danger;
  }
  .z-switch-warning {
    background-color: $warning;
  }
}

.z-switch-checkbox:checked + .z-switch-label .z-switch-innerText {
  justify-content: flex-start;
}
.z-switch-checkbox:checked + .z-switch-label .z-switch-action {
  right: 1px;
  left: auto;
  transition: all 0.3s ease-in-out;
}

.z-switch-checkbox:checked
  + .z-switch-label
  .z-switch-innerText
  .z-switch-innerTextBox-false {
  display: none;
}
.z-switch-checkbox:checked
  + .z-switch-label
  .z-switch-innerText
  .z-switch-innerTextBox-true {
  display: block;
}
.z-switch-innerText_box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
