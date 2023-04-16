/*
 * @Author: xxxxxii 1973329248@qq.com
 * @Date: 2023-02-27 23:13:44
 * @LastEditors: xxxxxii 1973329248@qq.com
 * @LastEditTime: 2023-02-27 23:14:35
 * @FilePath: \vue3-vite-base-template\src\components\message\loading\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//      引入创建虚拟节点和渲染方法
import { createVNode, render } from "vue";
import loading from "./loading.vue";

//      定义一个div容器
const div = document.createElement("div");
//      将定义的容器添加到dom上
document.body.appendChild(div);

//      定义定时器：一定时间后清除
let timer: any = null;

export default (options: any) => {
  //      调用创建虚拟节点方法
  //      第一个参数为要创建的虚拟节点即编写好的vue组件
  //      第二个参数为props的参数
  const vnode = createVNode(loading);
  //      调用渲染方法：将虚拟节点渲染到dom中
  render(vnode, div);
  //      开启定时器，若原先存在则先进行清除
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 2000);
};
