import zSelect from "./select.vue";

import { App } from "vue";

zSelect.install = (app: App) => {
    app.component(zSelect.name, zSelect);
};



export default zSelect;