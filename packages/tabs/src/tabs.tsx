/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-15 18:09:55
 */
import {
  defineComponent,
  provide,
  ref,
  watch,
  h,
  nextTick,
  onMounted,
  computed,
} from "vue";
import { TabsContextKey, tabsProps } from "./tabs";
import { uuidv4 } from "../../utils";
import "../../../src/assets/style/tabs.scss";

import { useCompGlobal } from "../../utils/compGlobal";

export default defineComponent({
  name: "z-tabs",
  emits: ["update:modelValue", "change"],
  props: tabsProps,

  setup(props, { slots, emit }) {
    const { compSize, compType } = useCompGlobal();
    const childList: any = ref([]);
    const compId = uuidv4();
    const childName = ref(compId + "_" + "0");
    let curretnIndex = ref(0);
    let btnWidth = ref(null);
    const selectTab = ref(props.modelValue);

    // 初始化组件
    onMounted(async () => {
      await nextTick();
      await initComp(props.modelValue, props.tabPosition);
    });

    // 组件class
    const Class = computed(() => {
      return [
        "z-tabs",
        `z-tabs--${compSize.value(props)}`,
        `z-tabs--${compType.value(props)}`,
        `z-tabs--${props.tabPosition}`,
        `z-tabs--${props.showType}`,
      ];
    });

    const initComp = async (selectTab, pos) => {
      let index = childList.value.findIndex((item) => item.name === selectTab);

      let dom = document.getElementById(
        compId + childList.value[index]?.name
      )?.parentNode;
      if (!dom) return;

      // 获取全部兄弟节点
      let allChild = dom.parentNode.children;

      if (pos === "top" || pos === "bottom") {
        btnWidth.value = (dom as HTMLElement).offsetWidth + "px";
        console.log(btnWidth.value);
        // 计算动画条的左边距离
        let w = 0;
        for (let i = 0; i < index; i++) {
          w += (allChild[i] as HTMLElement).offsetWidth;
        }
        translateX.value = w + "px";
      } else {
        btnWidth.value = (dom as HTMLElement).offsetHeight + "px";
        // 计算动画条的左边距离
        let w = 0;
        for (let i = 0; i < index; i++) {
          w += (allChild[i] as HTMLElement).offsetHeight;
        }
        translateX.value = w + "px";
      }
    };

    const btnW = () => {
      nextTick(() => {
        let index = childList.value.findIndex(
          (item) => item.name === selectTab.value
        );
        let dom = document.getElementById(
          compId + childList.value[index]?.name
        )?.parentNode;
        if (!dom) return;
        if (props.tabPosition === "top" || props.tabPosition === "bottom") {
          return (dom as HTMLElement).offsetWidth + "px";
        } else {
          return (dom as HTMLElement).offsetHeight + "px";
        }
      });
    };

    // 收集子组件
    const collectChild = (item: any) => {
      childList.value.push({
        label: item.lable,
        defSlot: item.$slots?.label,
        name: item?.name || item.lable,
      });

      console.log(childList.value);
    };

    const updateChildName = () => {
      let childNameSlist = childName.value.split("_");
      console.log(childNameSlist, "updateChildName");
      childName.value =
        childNameSlist[0].toString() + "_" + (parseInt(childNameSlist[1]) + 1);
    };

    watch(
      () => [props.modelValue, props.tabPosition],
      async (newVal) => {
        selectTab.value = newVal[0];
        console.log("props.tabPosition", newVal[1]);
        initComp(selectTab.value, newVal[1]);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const content = ref({
      ...props,
      selectTab,
      collectChild,
      updateChildName,
    });
    const isChecked = computed(() => (item) => {
      return selectTab.value === item;
    });

    const tabBarStyle = computed(() => {
      return {
        // props.tabPosition === 'top' || props.tabPosition === 'bottom'? :
        width:
          props.tabPosition === "top" || props.tabPosition === "bottom"
            ? btnWidth.value
            : "",
        height:
          props.tabPosition === "left" || props.tabPosition === "right"
            ? btnWidth.value
            : "",
        transform:
          props.tabPosition === "top" || props.tabPosition === "bottom"
            ? `translateX(${translateX.value})`
            : `translateY(${translateX.value})`,
      };
    });
    // 按钮底部的bar x 方向距离
    const translateX = ref(null);
    const tabClick = async (e, tabName, index) => {
      console.log(e.target.parentNode.offsetWidth);

      // 获取全部兄弟节点
      let allChild = e.target.parentNode.parentNode.children;

      if (props.tabPosition === "top" || props.tabPosition === "bottom") {
        // 获取点击元素的宽度
        btnWidth.value = e.target.parentNode.offsetWidth + "px";
        console.log(btnWidth.value);
        // e.target.parentNode.offsetWidth + "px";
        // 计算动画条的左边距离
        let w = 0;
        for (let i = 0; i < index; i++) {
          console.log(allChild[i]);
          allChild[i].offsetWidth;
          w += allChild[i].offsetWidth;
        }
        translateX.value = w + "px";
      } else {
        // 获取点击元素的宽度
        btnWidth.value = e.target.parentNode.offsetHeight + "px";
        // 计算动画条的左边距离
        let w = 0;
        for (let i = 0; i < index; i++) {
          console.log(allChild[i]);
          allChild[i].offsetHeight;
          w += allChild[i].offsetHeight;
        }
        translateX.value = w + "px";
      }
      // 记录当前tab 的index
      curretnIndex.value = index;
      emit("update:modelValue", tabName);
      emit("change", tabName);
    };
    provide(TabsContextKey, content.value);
    return () => (
      <div class={Class.value}>
        <div class="z-tabs__header">
          <div class="z-tabs__btns">
            {childList.value.map((item, index) => {
              return (
                <label>
                  <input
                    type="radio"
                    id={compId + item.name}
                    name={compId + item.name}
                    value={item.name}
                    checked={isChecked.value(item.name)}
                    onChange={() => tabClick(event, item.name, index)}
                  />
                  {item.defSlot ? (
                    h(item.defSlot)
                  ) : (
                    <div class="z-tabs__btn">{item.label}</div>
                  )}
                </label>
              );
            })}

            {props.showType === "bar" ? (
              <span class="selection" style={tabBarStyle.value}>
                <div class="z-tabs_bar-wrapper">
                  <div class="z-tabs_btns-bar"></div>
                </div>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div class="z-tabs__body">{slots.default()}</div>
      </div>
    );
  },
});
