/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-02-26 19:13:28
 * @LastEditors: xxxxxii 1973329248@qq.com
 * @LastEditTime: 2023-02-28 20:45:34
 * @FilePath: \vue3-music\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";
import ZUI from "../packages/index";
import router, { setupRouter } from "./router";

// import ZUI from "v3-yl-ui";
// import "../node_modules/v3-yl-ui/dist/style.css";

async function bootstrap() {
  const app = createApp(App);

  setupRouter(app);
  await router.isReady;
  app.use(ZUI);
  app.mount("#app");
}

void bootstrap();
