import zUpload from "./upload.vue"


import type { App } from "vue";

zUpload.install = (app: App) => {
    app.component(zUpload.name, zUpload);
};

export default zUpload;