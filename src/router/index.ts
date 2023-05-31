/*
 * @Author: xxxxxii 1973329248@qq.com
 * @Date: 2023-02-27 03:31:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 11:28:56
 * @FilePath: \z-ui\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-02-26 19:18:54
 * @LastEditors: xxxxxii 1973329248@qq.com
 * @LastEditTime: 2023-02-28 21:06:14
 * @FilePath: \vue3-music\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { App } from "vue";
import { Router, createRouter, createWebHashHistory } from "vue-router";
import { guard } from "./permission";

// 2. 定义一些路由：每个路由都需要映射到一个组件。
export const routesList = [
  {
    path: "/",
    name: "index",
    component: () => import("@/pages/index/index.vue"),
    redirect: "updateLog",
  },
  {
    path: "/updateLog",
    name: "UpdateLog",
    component: () => import("../../README.md"),
  },
  {
    path: "/comp",
    name: "comp",
    // 路由懒加载
    component: () => import("../layout/home.vue"),
    redirect: "button",
    children: [
      {
        // button
        path: "/button",
        name: "button",
        meta: {
          title: "button",
          group: "通用组件",
        },
        component: () => import("@/pages/button/doc/index.md"),
      },
      {
        // container
        path: "/container",
        name: "container",
        meta: {
          title: "container",
          group: "通用组件",
        },
        component: () => import("@/pages/container/doc/index.md"),
      },
      {
        // layout
        path: "/layout",
        name: "layout",
        meta: {
          title: "layout",
          group: "通用组件",
        },
        component: () => import("@/pages/layout/doc/index.md"),
      },
      {
        // skeleton
        path: "/skeleton",
        name: "skeleton",
        meta: {
          title: "skeleton",
          group: "指令",
        },
        component: () => import("@/pages/skeleton/doc/index.md"),
      },
      {
        // input
        path: "/input",
        name: "input",
        meta: {
          title: "input",
          group: "输入组件",
        },
        component: () => import("@/pages/input/doc/index.md"),
      },
      {
        // textarea
        path: "/textarea",
        name: "textarea",
        meta: {
          title: "textarea",
          group: "输入组件",
        },
        component: () => import("@/pages/textarea/doc/index.md"),
      },
      {
        // icon
        path: "/icon",
        name: "icon",
        meta: {
          title: "icon",
          group: "通用组件",
        },
        component: () => import("@/pages/icon/doc/index.md"),
      },
      {
        // message
        path: "/message",
        name: "message",
        meta: {
          title: "message",
          group: "通用组件",
        },
        component: () => import("@/pages/message/doc/index.md"),
      },
      {
        // upload
        path: "/upload",
        name: "upload",
        meta: {
          title: "upload",
          group: "输入组件",
        },
        component: () => import("@/pages/upload/doc/index.md"),
      },
      {
        // loading
        path: "/loading",
        name: "loading",
        meta: {
          title: "loading",
          group: "通用组件",
        },
        component: () => import("@/pages/loading/doc/index.md"),
      },
      {
        // menu
        path: "/menu",
        name: "menu",
        meta: {
          title: "menu",
          group: "通用组件",
        },
        component: () => import("@/pages/menu/doc/index.md"),
      },
      {
        // menu v2
        path: "/menuV2",
        name: "menuV2",
        meta: {
          title: "menuV2",
          group: "通用组件",
        },
        component: () => import("@/pages/menu v2/doc/index.md"),
      },
      {
        // progress
        path: "/progress",
        name: "progress",
        meta: {
          title: "progress",
          group: "通用组件",
        },
        component: () => import("@/pages/progress/doc/index.md"),
      },
      {
        // switch
        path: "/switch",
        name: "switch",
        meta: {
          title: "switch",
          group: "通用组件",
        },
        component: () => import("@/pages/switch/doc/index.md"),
      },
      {
        // tag
        path: "/tag",
        name: "tag",
        meta: {
          title: "tag",
          group: "通用组件",
        },
        component: () => import("@/pages/tag/doc/index.md"),
      },
      {
        // popover
        path: "/popover",
        name: "popover",
        meta: {
          title: "popover",
          group: "通用组件",
        },
        component: () => import("@/pages/popover/doc/index.md"),
      },
      // {
      //   // select
      //   path: "/select",
      //   name: "select",
      //   component: () => import("@/pages/select/doc/index.md"),
      // },
      {
        // selectV2
        path: "/select",
        name: "select",
        meta: {
          title: "select",
          group: "输入组件",
        },
        component: () => import("@/pages/selectV2/doc/index.md"),
      },
      {
        // radio
        path: "/radio",
        name: "radio",
        meta: {
          title: "radio",
          group: "输入组件",
        },
        component: () => import("@/pages/radio/doc/index.md"),
      },

      {
        // checkbox
        path: "/checkbox",
        name: "checkbox",
        meta: {
          title: "checkbox",
          group: "输入组件",
        },
        component: () => import("@/pages/checkbox/doc/index.md"),
      },
      {
        // form
        path: "/form",
        name: "form",
        meta: {
          title: "form",
          group: "输入组件",
        },
        component: () => import("@/pages/form/doc/index.md"),
      },
      {
        // dialog
        path: "/dialog",
        name: "dialog",
        meta: {
          title: "dialog",
          group: "通用组件",
        },
        component: () => import("@/pages/dialog/doc/index.md"),
      },
      {
        // drawer
        path: "/drawer",
        name: "drawer",
        meta: {
          title: "drawer",
          group: "通用组件",
        },
        component: () => import("@/pages/drawer/doc/index.md"),
      },
      {
        // drag
        path: "/drag",
        name: "drag",
        meta: {
          title: "drag",
          group: "指令",
        },
        component: () => import("@/pages/drag/doc/index.md"),
      },
      {
        // text
        path: "/text",
        name: "text",
        meta: {
          title: "text",
          group: "通用组件",
        },
        component: () => import("@/pages/text/doc/index.md"),
      },
      {
        // colorPicker
        path: "/colorPicker",
        name: "colorPicker",
        meta: {
          title: "colorPicker",
          group: "通用组件",
        },
        component: () => import("@/pages/colorPicker/doc/index.md"),
      },
      {
        // datePicker
        path: "/datePicker",
        name: "datePicker",
        meta: {
          title: "datePicker",
          group: "通用组件",
        },
        component: () => import("@/pages/datePicker/doc/index.md"),
      },
    ],
  },
];

// 3. 创建路由实例并传递 `routes` 配置。
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes: routesList as [], // `routes: routes` 的缩写
  scrollBehavior: (to, from, savedPosition) => {
    return { left: 0, top: 0 };
  },
});
export function setupRouter(app: App) {
  app.use(router);
  guard(router);
}

export default router;
