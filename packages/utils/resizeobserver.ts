type ResizeHandler = (entry: ResizeObserverEntry, observer: ResizeObserver) => void

const map = new WeakMap<Element, Set<ResizeHandler>>()

let _observer: ResizeObserver
const observer = () => (
    _observer ||= new ResizeObserver((entries, ob) => {
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i], handlers = map.get(entry.target)
            console.log(handlers, ob)
            handlers?.forEach(e => e(entry, ob))
        }
    })
)

export default {
    observer(el: Element, handler?: ResizeHandler) {
        if (handler) {
            const handlers = map.get(el)
            if (handlers)
                handlers.add(handler)
            else
                map.set(el, new Set([handler]))
        }
        observer().observe(el)
    },
    dispose(el: Element, handler?: ResizeHandler) {
        if (handler) {
            map.get(el)?.delete(handler)
        } else {
            map.delete(el)
            observer().unobserve(el)
        }
    },
    unobserve(el: Element) {
        observer().unobserve(el)
    }
}