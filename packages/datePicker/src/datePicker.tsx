/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 18:15:03
 */
import { defineComponent, computed, ref, Transition } from "vue";
import zCalendar from "./calendar.jsx";
import "./datePicker.scss";
import dayjs from "dayjs";

export default defineComponent({
  name: "z-date-picker",
  components: {
    zCalendar,
  },
  props: {
    modelValue: {
      type: [String],
    },
    size: {
      type: String,
      default: "md",
    },
    width: {
      type: String,
      default: "200px",
    },
    placeholder: {
      type: String,
      default: "Please select the date",
    },
    format: {
      type: String,
    },
    valueFormat: {
      type: String,
    },
    type: {
      type: String,
      default: "dates",
    },
  },
  emits: ["update:modelValue", "change"],

  setup(props, { slots, attrs, emit }) {
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
        fcous.value ? "is-fcous" : "",
        showDown.value ? "icon-rotate" : "",
        `z-select--${props.size}`,
      ];
    });

    const popoverHover = (val) => {
      hover.value = val;
    };

    // 控制点击是否显示
    const popoverClick = ({ el, target }) => {
      if (el.contains(target)) {
        let isContain = document
          .querySelector(".z-calendar-confirm")
          .contains(target);
        if (isContain) {
          fcous.value = false;
          showDown.value = false;
          return;
        }
        fcous.value = true;
        showDown.value = true;

        // 点击位置不在 主元素内部
      } else {
        fcous.value = false;
        showDown.value = false;
      }
    };

    const blur = (e) => {};

    const confirm = (val) => {
      console.log(val);
      emit("update:modelValue", val);
    };
    return () => (
      <div class={Class.value} style={{ width: props.width }}>
        <z-popover
          placement="bottom"
          trigger="click"
          selfSet
          visible={showDown.value}
          onHover={popoverHover}
          onClickTarget={popoverClick}
          v-slots={{
            content: () => (
              <Transition name="fade">
                <div class="">
                  <zCalendar
                    type={props.type}
                    format={props.format}
                    value-format={props.valueFormat}
                    v-model={props.modelValue}
                    onChange={confirm}
                  />
                </div>
              </Transition>
            ),
          }}
        >
          <span class="z-select__wrapper">
            <div class="z-select__wrapper__content">
              <input
                type="text"
                value={
                  props.type === "dates"
                    ? dayjs(props.modelValue).format(props.valueFormat)
                    : props.type === "year"
                    ? props.modelValue
                    : props.type === "month"
                    ? props.modelValue
                    : ""
                }
                placeholder={props.placeholder}
                readonly
                onBlur={blur}
              />
            </div>
            <span class="z-select__wrapper__icon">
              <z-icon
                name="icon-kalendar"
                class="z-select__wrapper__icon__inner"
              />
            </span>
          </span>
        </z-popover>
      </div>
    );
  },
});
