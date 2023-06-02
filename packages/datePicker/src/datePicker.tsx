/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-02 10:47:41
 */
import { defineComponent, computed, ref, Transition } from "vue";
import zCalendar from "./calendar.jsx";
import "./datePicker.scss";
import { pub } from "./utils";
import { useCompGlobal } from "../../utils/compGlobal";

const { dataFormat } = pub();
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
    activeType: {
      type: String,
    },
  },
  emits: ["update:modelValue", "change"],

  setup(props, { slots, attrs, emit }) {
    const { compSize, type } = useCompGlobal();
    // 显示下拉
    const showDown = ref(false);
    // 显示hover
    const hover = ref(false);
    // 显示focus
    const fcous = ref(false);

    // 自定义判断传入的字段
    const compTYpe = computed(() => (props, compInitType = "primary") => {
      return props.activeType ? props.activeType : type ? type : compInitType;
    });
    const Class = computed(() => {
      return [
        "z-select",
        hover.value && !fcous.value ? "is-hover" : "",
        fcous.value ? `is-fcous--${compTYpe.value(props)}` : "",
        showDown.value ? "icon-rotate" : "",
        `z-select--${compSize.value(props)}`,
      ];
    });

    const popoverHover = (val) => {
      hover.value = val;
    };

    // 控制点击是否显示

    const popoverClick = ({ el, target }) => {
      if (el.contains(target)) {
        // 判断是否点击的确认按钮
        let isExis =
          target.className.indexOf("z-calendar-confirm") != -1 ||
          target.parentNode.className.indexOf("z-calendar-confirm") != -1 ||
          target.parentNode.parentNode.className.indexOf(
            "z-calendar-confirm"
          ) != -1;
        if (isExis) {
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

    // 格式化input value
    const formatData = computed(() => {
      return dayjs(props.modelValue).format(
        dataFormat.value(props, "valueFormat")
      );
    });
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
              <div class="">
                <zCalendar
                  type={props.type}
                  format={props.format}
                  value-format={props.valueFormat}
                  v-model={props.modelValue}
                  onChange={confirm}
                />
              </div>
            ),
          }}
        >
          <span class="z-select__wrapper">
            <div class="z-select__wrapper__content">
              <input
                type="text"
                value={
                  props.type === "dates"
                    ? formatData.value
                    : props.type === "year"
                    ? props.modelValue
                    : props.type === "month"
                    ? formatData.value
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
