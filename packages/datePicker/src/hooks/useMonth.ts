/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 18:00:05
 */
import { ref } from "vue";
export function useMonth() {
  const months = ref([]);
  // 设置月份数组
  const setMonths = (year) => {
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
