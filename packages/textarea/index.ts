import zTextarea from "./textarea.vue";

import { App } from "vue";

zTextarea.install = (app: App) => {
  app.component(zTextarea.name, zTextarea);
};

export default zTextarea;
