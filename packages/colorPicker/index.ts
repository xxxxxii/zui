/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 13:46:34
 */
import zColorPicker from "./src/colorPicker.jsx";
import type { App } from "vue";

zColorPicker.install = (app: App) => {
  app.component(zColorPicker.name, zColorPicker);
};

export default zColorPicker;
