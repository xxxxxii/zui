import zNavMenu from './src/menu.vue'
import zSubMenu from './src/sub-menu.vue';
import zMenuItem from './src/menu-item.vue'
import zMenuItemGroup from './src/menu-item-group.vue'
import type { App } from "vue";

zNavMenu.install = (app: App) => {
    app.component(zNavMenu.name, zNavMenu);
};

zSubMenu.install = (app: App) => {
    app.component(zSubMenu.name, zSubMenu);
};

zMenuItem.install = (app: App) => {
    app.component(zMenuItem.name, zMenuItem);
};

zMenuItemGroup.install = (app: App) => {
    app.component(zMenuItemGroup.name, zMenuItemGroup);
};

export { zNavMenu, zSubMenu, zMenuItem, zMenuItemGroup } 
