import zTag from "./tag.vue";

import { App } from "vue";

zTag.install = (app: App) => {
    app.component(zTag.name, zTag);
};

export default zTag;