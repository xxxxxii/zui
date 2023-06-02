import zInfiniteScroll from "./src/infinite-scroll.jsx";
import zInfiniteScrollItem from "./src/infinite-scroll-item.vue";

import type { App } from "vue";

zInfiniteScroll.install = (app: App) => {
  app.component(zInfiniteScroll.name, zInfiniteScroll);
};

zInfiniteScrollItem.install = (app: App) => {
  app.component(zInfiniteScrollItem.name, zInfiniteScrollItem);
};

export { zInfiniteScrollItem, zInfiniteScroll };
