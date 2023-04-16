import zContainer from "./container.vue";

import { App } from "vue";

zContainer.install = (app: App) => {
    app.component(zContainer.name, zContainer);
};

export default zContainer;