import zRow from "./row.vue";

import { App } from "vue";

zRow.install = (app: App) => {
    app.component(zRow.name, zRow);
};

export default zRow;