import zTabs from "./src/tabs.jsx";
import zTabPane from "./src/tab-pane.vue";
import type { App } from "vue";

zTabs.install = (app: App) => {
  app.component(zTabs.name, zTabs);
};

zTabPane.install = (app: App) => {
  app.component(zTabPane.name, zTabPane);
};

export { zTabs, zTabPane };
