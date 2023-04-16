import zFooter from "./footer.vue";

import { App } from "vue";

zFooter.install = (app: App) => {
    app.component(zFooter.name, zFooter);
};

export default zFooter;