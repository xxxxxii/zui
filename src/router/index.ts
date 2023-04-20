/*
 * @Author: xxxxxii 1973329248@qq.com
 * @Date: 2023-02-27 03:31:06
 * @LastEditors: xxxxxii 1973329248@qq.com
 * @LastEditTime: 2023-02-28 21:51:51
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
    name: 'index',
    component: () => import('@/pages/index/index.vue'),
    redirect: "updateLog",
  },
  {
    path: '/updateLog',
    name: 'UpdateLog',
    component: () => import('../../README.md'),
  },
  {
    path: "/comp",
    name: "comp",
    // 路由懒加载
    component: () => import("../layout/home.vue"),
    redirect: "button",
    children: [
      {// container
        path: "/container",
        name: "container",
        component: () => import("@/pages/container/doc/index.md"),
      },
      {// layout
        path: "/layout",
        name: "layout",
        component: () => import("@/pages/layout/doc/index.md"),
      },
      {
        // button
        path: "/button",
        name: "button",
        component: () => import("@/pages/button/doc/index.md"),
      },
      {
        // input
        path: "/input",
        name: "input",
        component: () => import("@/pages/input/doc/index.md"),
      },
      {
        // textarea
        path: "/textarea",
        name: "textarea",
        component: () => import("@/pages/textarea/doc/index.md"),
      },
      {
        // icon
        path: "/icon",
        name: "icon",
        component: () => import("@/pages/icon/doc/index.md"),
      },
      {
        // message
        path: "/message",
        name: "message",
        component: () => import("@/pages/message/doc/index.md"),
      },
      {
        // upload
        path: "/upload",
        name: "upload",
        component: () => import("@/pages/upload/doc/index.md"),
      },
      {
        // loading
        path: "/loading",
        name: "loading",
        component: () => import("@/pages/loading/doc/index.md"),
      },
      {
        // menu
        path: "/menu",
        name: "menu",
        component: () => import("@/pages/menu/doc/index.md"),
      },

      {
        // progress
        path: "/progress",
        name: "progress",
        component: () => import("@/pages/progress/doc/index.md"),
      },
      {
        // switch
        path: "/switch",
        name: "switch",
        component: () => import("@/pages/switch/doc/index.md"),
      },
      {
        // tag
        path: "/tag",
        name: "tag",
        component: () => import("@/pages/tag/doc/index.md"),
      },
      {
        // select
        path: "/select",
        name: "select",
        component: () => import("@/pages/select/doc/index.md"),
      },
      {
        // checkbox
        path: "/checkbox",
        name: "checkbox",
        component: () => import("@/pages/checkbox/doc/index.md"),
      },
      {
        // form
        path: "/form",
        name: "form",
        component: () => import("@/pages/form/doc/index.md"),
      },
      // {
      //   // test
      //   path: "/test",
      //   name: "test",
      //   component: () => import("@/pages/test/index.vue"),
      // },
      // {
      //   // test
      //   path: "/bf",
      //   name: "bf",
      //   component: () => import("@/pages/test/bf.vue"),
      // },
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
