import { defineComponent, computed, Prop, ref, reactive } from "vue";
import { colorPickerProps } from "./datePicker";
import "./datePicker.scss";

export default defineComponent({
  name: "z-date-picker",
  emits: ["update:modelValue"],
  props: colorPickerProps,

  setup(props, { slots, attrs, emit }) {
    // 控制显示的变量
    const isShow = ref(false);
    // 点击按钮的时候显示
    const openTimeSelect = () => {
      isShow.value = true;
    };
    // 点击确定，或者点击日历主体外的任何窗体的时候关闭，关闭的时候清空选中
    const closeTimeSelect = () => {
      isShow.value = false;
      actives.one = "";
      actives.two = "";
    };
    // 本组件唯一定义的类型
    interface DaysType {
      day: number;
      color: string;
      time: string;
    }
    const date = new Date(); // 时间
    const year = ref(0); // 年
    const month = ref(0); // 月
    const day = ref(0);
    const days = ref<DaysType[]>([]); // 需要循环渲染的日历主体数据
    // 选中某天的数据，可以选中两天
    const actives = reactive({
      one: "",
      two: "",
    });
    // 计算属性，把当前点击选中的日期转换成时间戳
    const oneTimeNum = computed(() => new Date(actives.one).getTime());
    const twoTimeNum = computed(() => new Date(actives.two).getTime());

    const updateTime = (cyear = null, cmonth = null, cday = null) => {
      days.value = [];
      year.value = parseInt(cyear) || date.getFullYear(); // 获取当前年
      month.value = parseInt(cmonth) || date.getMonth() + 1; // 获取当前月份
      day.value = parseInt(cday) || date.getDate();

      console.log(year.value, month.value, day.value);

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
    // 上一年
    const prevYear = () => {
      date.setFullYear(date.getFullYear() - 1);
      updateTime();
    };
    // 下一年
    const nextYear = () => {
      date.setFullYear(date.getFullYear() + 1);
      updateTime();
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
    updateTime(2023, 5, 29);

    const week = ["一", "二", "三", "四", "五", "六", "日"];

    const selectDate = (item) => {
      let [sYear, sMonth, sDay] = item.time.split("-");
      year.value = sYear;
      month.value = sMonth;
      day.value = item.day;
      actives.one = item.time;

      console.log(item.time);
      console.log(sYear, sMonth, sDay);
      console.log(year.value, month.value, day.value);
      updateTime(sYear, sMonth, sDay);
    };

    // 获取当前日期
    const getNowDate = () => {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      updateTime(year, month, day);
    };

    return () => (
      <div class="z-calendar">
        <div class="z-calendar-header">
          <div class="z-calendar-ctr-btn year-ctr" onClick={prevYear}>
            &#10094;&#10094;
          </div>
          <div class="z-calendar-ctr-btn month-ctr" onClick={prevMonth}>
            &#10094;
          </div>
          <div class="z-calendar-current-date">
            {year.value + "-" + month.value + "-" + day.value}
          </div>
          <div class="z-calendar-ctr-btn month-ctr" onClick={nextMonth}>
            &#10095;
          </div>
          <div class="z-calendar-ctr-btn year-ctr" onClick={nextYear}>
            &#10095;&#10095;
          </div>
        </div>
        <div class="z-calendar-body">
          {week.map((w, i) => {
            return <span key={i}>{w}</span>;
          })}
          {days.value.map((v, i) => {
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
          })}
        </div>
        <div class="z-calendar-footer">
          <div class="z-calendar-footer-current-date" onClick={getNowDate}>
            {" "}
            now{" "}
          </div>
          <z-button type="primary" size="xs">
            ok
          </z-button>
        </div>
      </div>
    );
  },
});
