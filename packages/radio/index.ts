import zRadio from './src/radio.vue'

import zRadioGroup from './src/radio-group.vue';
import type { App } from "vue";

zRadio.install = (app: App) => {
    app.component(zRadio.name, zRadio);
};

zRadioGroup.install = (app: App) => {
    app.component(zRadioGroup.name, zRadioGroup);
};

export { zRadioGroup, zRadio } 
