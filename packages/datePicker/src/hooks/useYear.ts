/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 16:05:33
 */
import { ref } from "vue";
export function useYear() {
  const year = ref(0); // 年

  const yearList = ref([]);
  // 选择年份
  const selectYear = (item) => {
    year.value = item;
  };
  // 更新year数据
  const updateYearData = (tag = "pre") => {
    let baseYear: number;
    if (tag === "pre") {
      baseYear = yearList.value[0];
      yearList.value = [];
      for (let i = 0; i < 12; i++) {
        yearList.value.push(baseYear - 12 + i);
      }
    } else {
      baseYear = yearList.value[11];
      yearList.value = [];
      for (let i = 0; i < 12; i++) {
        yearList.value.push(baseYear + i + 1);
      }
    }
  };

  return {
    year,
    yearList,
    selectYear,
    updateYearData
  };
}
