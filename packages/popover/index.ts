import zPopover from './src/popover.vue'
import type { App } from "vue";

zPopover.install = (app: App) => {
    app.component(zPopover.name, zPopover);
};


export default zPopover
