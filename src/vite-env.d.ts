/*
 * @Author: xxxxxii 1973329248@qq.com
 * @Date: 2023-02-28 02:26:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 10:44:11
 * @FilePath: \z-ui\src\vite-env.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/// <reference types="vite/client" />
declare module "*vue" {
  import { ComponentOptions } from "vue";
  const ComponentOptions: ComponentOptions;
  export default ComponentOptions;
}
declare module "*.ts";
declare module "*.tsx";
declare module "*.md";
