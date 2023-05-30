/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-02-27 01:22:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 10:50:46
 * @FilePath: \vue3-music\env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// <reference types="vite/client" />
// vue3 报错提示 找不到模块“./XXX.vue”或其相应的类型声明
// 报错原因：typescript 只能理解 .ts 文件，无法理解 .vue文件
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}