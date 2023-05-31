import { reactive, ref } from "vue";

// 本组件唯一定义的类型
interface DaysType {
  day: number;
  color: string;
  time: string;
}
export function useDates() {
  // 选中某天的数据，可以选中两天
  const actives = reactive({
    one: "",
    two: "",
  });
  const day = ref(0);
  const days = ref<DaysType[]>([]); // 需要循环渲染的日历主体数据
  const week = ["一", "二", "三", "四", "五", "六", "日"];

  return {
    day,
    days,
    week,
    actives,
  };
}
