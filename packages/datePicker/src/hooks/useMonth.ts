/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-01 17:16:58
 */
import { ref, reactive } from "vue";
export function useMonth() {
  let months = ref([]);
  // 设置月份数组
  const setMonths = (year) => {
    months.value = [];
    for (let i = 1; i <= 12; i++) {
      months.value.push({
        label: `${i}月`,
        value: i,
        ym: year + "-" + i,
      });
    }
  };
  return {
    months,
    setMonths,
  };
}
