import zSkeleton from './src/skeleton.vue'
import type { App } from "vue";

zSkeleton.install = (app: App) => {
    app.component(zSkeleton.name, zSkeleton);
};



export default zSkeleton
