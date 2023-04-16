import zAside from "./aside.vue";

import { App } from "vue";

zAside.install = (app: App) => {
    app.component(zAside.name, zAside);
};

export default zAside;