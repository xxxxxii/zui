/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-01 10:07:35
 */
import zGlobalConfig from "./src/globalConfig.jsx";
import type { App } from "vue";

zGlobalConfig.install = (app: App) => {
  app.component(zGlobalConfig.name, zGlobalConfig);
};

export default zGlobalConfig;
