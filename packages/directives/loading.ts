import { createApp, Directive } from 'vue';

import Loading from '../loading/loading.vue';

export default {
    install(app: any) {
        defaneDirective(app);
    },
};

const defaneDirective = (app: {
    directive: (
        arg0: string,
        arg1: { mounted(el: any, binding: any): void }
    ) => void;
}) => {
    app.directive("loading", {
        mounted(el, binding) {
            console.log(el.offsetHeight)
            const app = createApp(Loading, {
                elH: el.offsetHeight
            });
            const instance = app.mount(document.createElement('div'));
            el.instance = instance;

            // console.log()

            if (binding.value) {
                appendEl(el);
            }
        },

        updated(el, binding) {
            if (binding.value !== binding.oldValue) {
                binding.value ? appendEl(el) : removeEl(el);
            }
        },
    })
}


// 插入元素
const appendEl = (el) => {
    // 给父元素加个定位，让loading元素定位
    el.style.position = 'relative';
    el.style.pointerEvents = "none"
    el?.appendChild(el.instance.$el);
};
// 移除元素
const removeEl = (el) => {
    el.style.position = '';
    el.style.pointerEvents = "auto"
    // 踩坑：el?.removeChild(el.instance.$el)->直接这样写会报错：Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.（要删除的节点不是此节点的子节点）
    // 解决：判断一下是否为此节点的子元素再移除（参考：https://www.freesion.com/article/2620879355/）
    let $el = el.instance.$el;

    if (el?.contains($el)) {
        el?.removeChild($el);
    }
};