import zCheckbox from './src/checkbox.vue'
import zCheckboxGroup from './src/checkbox-group.vue';
import type { App } from "vue";

zCheckbox.install = (app: App) => {
    app.component(zCheckbox.name, zCheckbox);
};

zCheckboxGroup.install = (app: App) => {
    app.component(zCheckboxGroup.name, zCheckboxGroup);
};

export { zCheckbox, zCheckboxGroup } 
