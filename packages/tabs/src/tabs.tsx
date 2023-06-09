/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-09 09:46:20
 */
import { VNode, defineComponent, provide, ref, computed, h, watch } from "vue";
import { TabsContextKey, tabsProps } from "./tabs";

export default defineComponent({
  name: "z-tabs",
  emits: ["update:modelValue"],
  props: tabsProps,

  setup(props, { slots, emit }) {
    const childList: any = ref([]);

    const childName = ref(0);
    const collectChild = (item: any) => {
      childList.value.push(item);
      console.log(item, childList.value);
    };
    const updateChildName = () => {
      childName.value++;
    };
    const selectTab = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newVal) => {
        selectTab.value = newVal;
      }
    );

    const content = ref({
      ...props,
      selectTab,
      collectChild,
      updateChildName,
      childList,
      childName,
    });
    const curretnIndex = ref(0);

    const tabClick = (tabName, index) => {
      console.log(tabName, index);
      curretnIndex.value = index;
      emit("update:modelValue", tabName);
    };
    console.log(TabsContextKey);
    provide(TabsContextKey, content.value);
    return () => (
      <div class="z-tabs">
        {childList.value.length}
        <div class="z-tabs__header">
          <div
            class="z-tabs__btns"
            style={{ width: childList.value.length * 100 + "px" }}
          >
            {childList.value.map((item, index) => {
              return (
                <label>
                  <input
                    type="radio"
                    id={item.tabName}
                    name="value-radio"
                    value={item.tabName}
                    checked={props.modelValue === item.tabName}
                    onChange={() => tabClick(item.tabName, index)}
                  />
                  <span>
                    {item.table}
                    {item.tabName}
                  </span>
                </label>
              );
            })}
            <span
              class="selection"
              style={{
                width: "100px",
                transform: `translateX(calc(${
                  (childList.value.length * 100 * curretnIndex.value) /
                    childList.value.length +
                  "px"
                }))`,
              }}
            ></span>
          </div>
        </div>
        <div class="z-tabs__body">{slots.default()}</div>
      </div>
    );
  },
});
