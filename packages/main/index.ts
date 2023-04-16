import zMain from "./main.vue";

import { App } from "vue";

zMain.install = (app: App) => {
    app.component(zMain.name, zMain);
};

export default zMain;