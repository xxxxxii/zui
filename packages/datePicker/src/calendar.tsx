/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-01 09:35:19
 */
import { defineComponent, computed, ref, reactive } from "vue";
import { calendarProps } from "./calendar";
import "./calendar.scss";
import { pub } from "./utils";
const { dataFormat } = pub();
import dayjs from "dayjs";

import { useDates } from "./hooks/useDates";
import { useYear } from "./hooks/useYear";
import { useMonth } from "./hooks/useMonth";
const { year, selectYear, yearList, updateYearData } = useYear();
const { day, days, week, actives } = useDates();
const { months, setMonths } = useMonth();

export default defineComponent({
  name: "z-calendar",
  emits: ["update:modelValue", "change"],
  props: calendarProps,

  setup(props, { slots, attrs, emit }) {
    const date = new Date(); // 时间
    const month = ref(0); // 月

    // 上一年
    const prevYear = () => {
      if (props.type === "dates") {
        date.setFullYear(date.getFullYear() - 1);
        updateTime();
      }
      if (props.type === "year") {
        updateYearData();
      }
      if (props.type === "month") {
        year.value--;
      }
    };
    // 下一年
    const nextYear = () => {
      if (props.type === "dates") {
        date.setFullYear(date.getFullYear() + 1);
        updateTime();
      }
      if (props.type === "year") {
        updateYearData("next");
      }
      if (props.type === "month") {
        year.value++;
      }
    };
    // 上一月
    const prevMonth = () => {
      date.setMonth(date.getMonth() - 1);
      updateTime();
    };
    // 下一月
    const nextMonth = () => {
      date.setMonth(date.getMonth() + 1);
      updateTime();
    };

    // 选择日期
    const selectDate = (item) => {
      let [sYear, sMonth, sDay] = item.time.split("-");
      year.value = sYear;
      month.value = sMonth;
      day.value = item.day;
      actives.one = item.time;
      updateTime(sYear, sMonth, sDay);
    };

    // select month
    const selectMonth = (monthObj) => {
      const [y, _] = monthObj.ym.split("-");
      year.value = y;
      month.value = monthObj.value;
    };

    // 获取当前日期 -- 重置选择到现在的时间
    const getNowDate = () => {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      updateTime(year, month, day);
    };

    const confirm = () => {
      let transfer = null;
      if (props.type === "dates") {
        transfer = dayjs(actives.one).format(
          dataFormat.value(props, "valueFormat")
        );
      }
      if (props.type === "year") {
        transfer = year.value;
      }

      if (props.type === "month") {
        transfer = dayjs(year.value + "-" + month.value).format(
          dataFormat.value(props, "valueFormat")
        );
      }

      emit("change", transfer + "");
    };

    // 格式化数据显示
    const showDateFormt = computed(() => {
      if (props.type === "dates") {
        return dayjs(year.value + "-" + month.value + "-" + day.value).format(
          dataFormat.value(props)
        );
      }
      if (props.type === "year") {
        return year.value;
      }
      if (props.type === "month") {
        return dayjs(year.value + "-" + month.value).format(
          dataFormat.value(props)
        );
      }
    });

    const updateTime = (cyear = null, cmonth = null, cday = null) => {
      days.value = [];
      year.value = parseInt(cyear) || date.getFullYear(); // 获取当前年
      month.value = parseInt(cmonth) || date.getMonth() + 1; // 获取当前月份
      day.value = parseInt(cday) || date.getDate();

      // 初始化 选中的日期
      actives.one = `${year.value}-${month.value}-${day.value}`;
      const curDays = new Date(year.value, month.value, 0).getDate(); // 当前月的天数
      let curWeek = new Date(year.value, month.value - 1, 1).getDay(); // 这个月第一天星期几
      curWeek <= 0 ? (curWeek = 7) : curWeek; // 如果值是0的话，那么本月第一天是周日
      const preDays = new Date(year.value, month.value - 1, 0).getDate(); // 上个月的天数
      const preLastDay = curWeek - 1; // 获取上一个月有多少天
      // 插入上一个月的日期
      for (let i = 0; i < preLastDay; i++) {
        days.value.unshift({
          day: preDays - i,
          color: "note",
          time: `${year.value}-${month.value - 1}-${preDays - i}`,
        });
      }
      // 插入本月的日期
      for (let i = 1; i <= curDays; i++) {
        days.value.push({
          day: i,
          color: "#191919",
          time: `${year.value}-${month.value}-${i}`,
        });
      }
      const lastPreDays = 42 - curDays - preLastDay;
      // 插入下个月的日期
      for (let i = 1; i <= lastPreDays; i++) {
        days.value.push({
          day: i,
          color: "note",
          time: `${year.value}-${month.value + 1}-${i}`,
        });
      }
    };
    const getYMD = computed(() => {
      const [y, m, d] = props.modelValue.split("-");
      return [y, m, d];
    });

    // 初始化year数据
    const initYearData = () => {
      year.value = parseInt(props.modelValue) || date.getFullYear();
      for (let i = 0; i < 12; i++) {
        yearList.value.push(date.getFullYear() + (i - 3));
      }
    };

    const initMonthData = () => {
      if (props.modelValue != "") {
        const [y, m] = props.modelValue.split("-");
        month.value = parseInt(m);
        setMonths(y);
        console.log("22222", months.value);
      } else {
        setMonths(date.getFullYear());
        console.log("dddd", months.value);
        month.value = date.getMonth() + 1;
      }
    };

    //  初始化日期
    const init = () => {
      props.type === "dates" &&
        updateTime(getYMD.value[0], getYMD.value[1], getYMD.value[2]);
      props.type === "year" && initYearData();

      props.type === "month" && initMonthData();
    };

    init();

    return () => (
      <div class="z-calendar">
        <div class="z-calendar-header">
          <div class="z-calendar-ctr-btn year-ctr" onClick={prevYear}>
            &#10094;&#10094;
          </div>
          {props.type === "dates" ? (
            <div class="z-calendar-ctr-btn month-ctr" onClick={prevMonth}>
              &#10094;
            </div>
          ) : (
            ""
          )}

          <div class="z-calendar-current-date">{showDateFormt.value}</div>
          {props.type === "dates" ? (
            <div class="z-calendar-ctr-btn month-ctr" onClick={nextMonth}>
              &#10095;
            </div>
          ) : (
            ""
          )}

          <div class="z-calendar-ctr-btn year-ctr" onClick={nextYear}>
            &#10095;&#10095;
          </div>
        </div>
        <div class="z-calendar-body">
          <div class="z-calendar-body__week">
            {props.type === "dates"
              ? week.map((w, i) => {
                  return (
                    <span class="z-calendar-week" key={i}>
                      {w}
                    </span>
                  );
                })
              : ""}
          </div>
          <div
            class={{
              "z-calendar-body__dates": props.type === "dates",
              "z-calendar-body__year":
                props.type === "year" || props.type === "month",
            }}
          >
            {props.type === "dates"
              ? days.value.map((v, i) => {
                  return (
                    <span
                      onClick={() => selectDate(v)}
                      class={{
                        "z-calendar--note": v.color === "note",
                        "z-calendar-day-dot": true,
                        "z-calendar-day-dot--active": actives.one === v.time,
                      }}
                      key={i}
                    >
                      {v.day}
                    </span>
                  );
                })
              : props.type === "year"
              ? yearList.value.map((y) => {
                  return (
                    <span
                      onClick={() => selectYear(y)}
                      class={{
                        "z-calendar-year-dot": true,
                        "z-calendar-year-dot--active": year.value === y,
                      }}
                    >
                      {y}
                    </span>
                  );
                })
              : props.type === "month"
              ? months.value.map((m) => {
                  return (
                    <span
                      onClick={() => selectMonth(m)}
                      class={{
                        "z-calendar-year-dot": true,
                        "z-calendar-year-dot--active":
                          year.value + "-" + month.value === m?.ym,
                      }}
                    >
                      {m?.label}
                    </span>
                  );
                })
              : ""}
          </div>
        </div>
        <div class="z-calendar-footer">
          <div class="z-calendar-footer-current-date" onClick={getNowDate}>
            now
          </div>
          <z-button
            class="z-calendar-confirm"
            type="primary"
            size="xs"
            onClick={confirm}
          >
            ok
          </z-button>
        </div>
      </div>
    );
  },
});
