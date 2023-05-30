/*
 * @Description:
 * @version:
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 09:43:11
 */
import zText from "./src/text.tsx";
import type { App } from "vue";

zText.install = (app: App) => {
  app.component(zText.name, zText);
};

export default zText;
