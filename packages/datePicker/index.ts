/*
 * @Description: 
 * @version: 
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 15:07:42
 */
/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 13:46:34
 */
import zDatePicker from "./src/datePicker.jsx";
import type { App } from "vue";

zDatePicker.install = (app: App) => {
  app.component(zDatePicker.name, zDatePicker);
};

export default zDatePicker;
