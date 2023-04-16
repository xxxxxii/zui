import zSwitch from "./switch.vue"


import type { App } from "vue";

zSwitch.install = (app: App) => {
    app.component(zSwitch.name, zSwitch);
};

export default zSwitch;