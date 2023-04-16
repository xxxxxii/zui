import zInput from "./input.vue";

import { App } from "vue";

zInput.install = (app: App) => {
  app.component(zInput.name, zInput);
};

export default zInput;
