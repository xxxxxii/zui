import zButton from "./button.vue";
import { App } from "vue";

zButton.install = (app: App) => {
  app.component(zButton.name, zButton);
};

export default zButton;
