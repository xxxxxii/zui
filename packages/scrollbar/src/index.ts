import zScrollbar from './scrollbar.vue'

import type { App } from "vue";

zScrollbar.install = (app: App) => {
    app.component(zScrollbar.name, zScrollbar);
};

export default zScrollbar