
import zOptions from "../options/options.vue"
import type { App } from "vue";

zOptions.install = (app: App) => {
    app.component(zOptions.name, zOptions);
};


export default zOptions;