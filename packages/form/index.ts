
import { formProps, FormContext } from "./src/form";
import zFormItem from "./src/form-item.vue";
import zForm from './src/form.vue'

import { App } from "vue";

zFormItem.install = (app: App) => {
    app.component(zFormItem.name, zFormItem);
};


zForm.install = (app: App) => {
    app.component(zForm.name, zForm);
};
export {
    zFormItem, zForm
};


declare module 'vue' {
    export interface GlobalComponents {
        zFormItem: typeof zFormItem,
        zForm: typeof zForm
    }
}
