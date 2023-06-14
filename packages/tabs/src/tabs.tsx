/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-14 18:09:52
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
  emits: ["update:modelValue"],
  props: tabsProps,

  setup(props, { slots, emit }) {
    const { compSize, compType } = useCompGlobal();
    const childList: any = ref([]);
    const compId = uuidv4();
    const childName = ref(compId + "_" + "0");
    let curretnIndex = ref(0);
    let btnWidth = ref(null);

    // 初始化组件
    onMounted(async () => {
      await nextTick();
      initComp(props.modelValue);
    });

    // 组件class
    const Class = computed(() => {
      return [
        "z-tabs",
        `z-tabs--${compSize.value(props)}`,
        `z-tabs--${compType.value(props)}`,
      ];
    });

    const initComp = (selectTab) => {
      let index = childList.value.findIndex((item) => item.name === selectTab);
      let dom = document.getElementById(
        compId + childList.value[index].name
      ).parentNode;
      btnWidth.value = (dom as HTMLElement).offsetWidth + "px";
      // 获取全部兄弟节点
      let allChild = dom.parentNode.children;

      // 计算动画条的左边距离
      let w = 0;
      for (let i = 0; i < index; i++) {
        w += (allChild[i] as HTMLElement).offsetWidth;
      }
      translateX.value = w + "px";
    };

    const setIndex = computed(() => {
      let index = childList.value.findIndex(
        (item) => item.name === props.modelValue
      );
      console.log(index);
      return index;
    });

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
    const selectTab = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        selectTab.value = newVal;
        initComp(selectTab.value);
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

    // 按钮底部的bar x 方向距离
    const translateX = ref(null);
    const tabClick = (e, tabName, index) => {
      console.log(e.target.parentNode.offsetWidth);
      // 获取点击元素的宽度
      btnWidth.value = e.target.parentNode.offsetWidth + "px";
      // 获取全部兄弟节点
      let allChild = e.target.parentNode.parentNode.children;

      // 计算动画条的左边距离
      let w = 0;
      for (let i = 0; i < index; i++) {
        console.log(allChild[i]);
        allChild[i].offsetWidth;
        w += allChild[i].offsetWidth;
      }
      translateX.value = w + "px";
      // 记录当前tab 的index
      curretnIndex.value = index;
      emit("update:modelValue", tabName);
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

            <span
              class="selection"
              style={{
                width: btnWidth.value,
                transform: `translateX(${translateX.value})`,
              }}
            >
              <div class="z-tabs_bar-wrapper">
                <div class="z-tabs_btns-bar"></div>
              </div>
            </span>
          </div>
        </div>
        <div class="z-tabs__body">{slots.default()}</div>
      </div>
    );
  },
});
