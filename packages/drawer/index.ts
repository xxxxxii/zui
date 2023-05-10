import zDrawer from "./src/drawer.vue";

import type { App } from "vue";

zDrawer.install = (app: App) => {
    app.component(zDrawer.name, zDrawer);
};

export default zDrawer;
