import zHeader from "./header.vue";

import { App } from "vue";

zHeader.install = (app: App) => {
    app.component(zHeader.name, zHeader);
};

export default zHeader;