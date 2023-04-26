import zSelectV2 from './src/select.vue'
import zOptionV2 from './src/option.vue';
import type { App } from "vue";

zSelectV2.install = (app: App) => {
    app.component(zSelectV2.name, zSelectV2);
};

zOptionV2.install = (app: App) => {
    app.component(zOptionV2.name, zOptionV2);
};

export { zSelectV2, zOptionV2 } 
