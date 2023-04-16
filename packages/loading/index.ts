import Loading from "./loading.vue"
import { createVNode, render } from "vue";
import { loadingObjOption } from "./types";



class ZLoading {
    container: HTMLElement;
    constructor() {
        this.container = null
    }
    server = (options: loadingObjOption | string = {}) => {

        if (typeof options === "string") {
            options = {
                el: options
            }
        }
        let mountDom = options.el ? options.el : 'body'

        this.container = document.querySelector(mountDom)
        this.container.style.position = "relative"
        this.container.style.overflow = 'hidden'
        const vm = createVNode(Loading, {
            ...options
        })

        render(vm, this.container)
    }
    stop = () => {
        this.container.style.overflow = 'auto'
        render(null, this.container);
    }
}
export default new ZLoading()