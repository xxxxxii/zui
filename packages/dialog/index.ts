import zDlalog from "./src/dialog.vue";

import type { App } from "vue";

zDlalog.install = (app: App) => {
    app.component(zDlalog.name, zDlalog);
};

export default zDlalog;
