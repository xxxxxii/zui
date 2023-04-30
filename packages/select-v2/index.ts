import zSelect from './src/select.vue'
import zOption from './src/option.vue';
import type { App } from "vue";

zSelect.install = (app: App) => {
    app.component(zSelect.name, zSelect);
};

zOption.install = (app: App) => {
    app.component(zOption.name, zOption);
};

export { zSelect, zOption } 
