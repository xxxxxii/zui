import zCol from "./col.vue";

import { App } from "vue";

zCol.install = (app: App) => {
    app.component(zCol.name, zCol);
};

export default zCol;