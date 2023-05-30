/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 14:07:05
 */
import zText from "./src/text.jsx";
import type { App } from "vue";

zText.install = (app: App) => {
  app.component(zText.name, zText);
};

export default zText;
