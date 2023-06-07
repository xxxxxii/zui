import zSlider from "./src/slider.vue";
import type { App } from "vue";

zSlider.install = (app: App) => {
  app.component(zSlider.name, zSlider);
};

export default zSlider;
