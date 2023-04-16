import zMenu from "./menu.vue"


import type { App } from "vue";

zMenu.install = (app: App) => {
    app.component(zMenu.name, zMenu);
};

export default zMenu;