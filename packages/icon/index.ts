import zIcon from "./icon.vue";
import { App } from "vue";

zIcon.install = (app: App) => {
  app.component(zIcon.name, zIcon);
};

export default zIcon;
