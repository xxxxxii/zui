import zProgress from "./progress.vue";

import { App } from "vue";

zProgress.install = (app: App) => {
    app.component(zProgress.name, zProgress);
};

export default zProgress;
