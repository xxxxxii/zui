import { Directive, watchPostEffect, h, render, Fragment, shallowReactive, normalizeStyle, normalizeClass, mergeProps as _mergeProps, reactive, camelize } from "vue"

import resizeobserver from "../../packages/utils/resizeobserver"
import { stringifyStyle } from "@vue/shared"

import { CSSProperties, DirectiveBinding, StyleValue, VNode, WatchStopHandle } from "vue"


export const
    name = 'z-skeleton',
    preCls = `${name}`,
    itemPreCls = `${preCls}-item`,
    itemRefPrecls = `${itemPreCls}-ref`

export const patchClass = (el: HTMLElement, clazz, oldClazz) => {
    clazz = clazz.split(' '), oldClazz = oldClazz.split(' ')
    const delCls = oldClazz.filter(e => !clazz.includes(e)), addCls = clazz
    delCls.forEach(e => e && el.classList.remove(e))
    addCls.forEach(e => e && el.classList.add(e))
}

export const getLoading = (binding: Props['binding']) => typeof binding.value === 'object' ? binding.value.loading : binding.value

export const getAnimated = (binding: Props['binding']): boolean => binding.modifiers.animated

export const getClass = (binding: Props['binding']) => {
    const loading = getLoading(binding)
    if (!loading) return ''
    const animated = getAnimated(binding)
    // @ts-ignore
    return normalizeClass([preCls, { [`is-animated`]: animated }, binding.value.loadingClass])
}

export const allClass = (binding: Props['binding']) => {
    // @ts-ignore
    return normalizeClass([preCls, `is-animated`, binding.value.loadingClass])
}

export const fliterClass = (cls: string) => {
    return cls.split(' ').filter(cls => cls.includes(preCls)).join(' ')
}

export function mergeProps(vnode: VNode, binding: Props['binding']) {
    if (getLoading(binding)) {
        if (vnode.props) {
            const props = _mergeProps(vnode.props, {
                class: getClass(binding),
            })
            props.class = [...new Set((props.class as String).split(' '))].join(' ')
            Object.assign(vnode.props, props)
        } else {
            const clazz = normalizeClass([vnode.el.className, getClass(binding)])
            vnode.el.className = clazz
        }
    }
}

export type BaseValue = {
    class?: any,
    style?: StyleValue
}

export type BaseDirectiveBinding = DirectiveBinding<BaseValue>

type BaseProps = {
    el: HTMLElement
    binding: BaseDirectiveBinding
}

export type Props = {
    fragment: HTMLElement
    targets?: ItemProps[],
    vnode: VNode<any, any>
    unwatch?: WatchStopHandle
} & BaseProps & {
    binding: DirectiveBinding<boolean | {
        loading: boolean
        loadingClass?: any
        loadingStyle?: StyleValue
    }>
}

export type ItemProps = {
    state: { style?: CSSProperties }
    resizeCb?: () => void
} & BaseProps

const setup = (el: Props['el'], binding: Props['binding'], vnode: Props['vnode']) => {
    const props: Props = shallowReactive({
        el,
        binding,
        fragment: el.appendChild(document.createElement('div')),
        targets: shallowReactive([]),
        vnode,
    })

    el = null
    binding = null
    vnode = null

    const unwatch1 = watchPostEffect(() => {
        const { el, binding, vnode } = props
        if (getLoading(binding)) {
            patchClass(el, getClass(binding), allClass(binding))
            // @ts-ignore
            el.style.cssText = stringifyStyle(normalizeStyle([el.style.cssText, binding.value.loadingStyle]))
        } else {
            el.classList.remove(...allClass(binding).split(' '))
            el.style.cssText = stringifyStyle(vnode.props?.style)
        }
    })

    const unwatch2 = watchPostEffect(() => {
        const { binding, fragment } = props
        const targets = props.targets, loading = getLoading(binding)
        // loading 状态才使用 resizeobserver
        if (loading) resizeobserver.observer(props.el)
        else resizeobserver.unobserve(props.el)

        if (loading) {
            targets.forEach(e => e.el.classList.add(itemRefPrecls))
        } else {
            targets.forEach(e => e.el.classList.remove(itemRefPrecls))
        }

        // 渲染 skeleton-item
        if (loading) {
            const items = targets.map(e => h('div', {
                class: [props.binding.value.class, e.binding.value?.class, itemPreCls],
                style: [props.binding.value.style, e.binding.value?.style, e.state.style],
            }))
            // const container = h('div', { class: 'z-skeleton-container' }, items)
            // render(container, fragment)
            render(h(Fragment, { class: 'z-skeleton-container' }, items), fragment)
        } else {
            render(null, fragment)
        }
    })

    props.unwatch = () => {
        unwatch1()
        unwatch2()
    }

    return props
}

// —————————————————————————————— 华丽的分割线 ————————————————————————


export const skeletonList: Props[] = []

const Skeleton: Directive = {
    created(el, binding, vnode) {
        skeletonList.push(setup(el, binding, vnode))
    },
    beforeMount(el, binding, vnode) {
        const props = skeletonList.find(e => e.el === el)
        props.binding = binding
        props.vnode = vnode
    },
    beforeUpdate(el, binding, vnode) {
        const props = skeletonList.find(e => e.el === el)
        props.vnode = vnode
        props.binding = binding
    },
    beforeUnmount(el) {
        const i = skeletonList.findIndex(e => e.el === el)
        if (i < 0) return
        const props = skeletonList.splice(i, 1)[0]
        props.unwatch()
        props.fragment.parentNode.removeChild(props.fragment)
        resizeobserver.dispose(el)
    }
}


const createItem = (props: Props, el: ItemProps['el'], binding: ItemProps['binding']) => {
    el.classList.add(`${itemPreCls}-ref`)

    const { el: parentEl } = props

    const child: ItemProps = {
        el,
        binding,
        state: reactive({}),
        resizeCb: () => {
            const parentRect = parentEl.getBoundingClientRect(), parentStyle = getComputedStyle(parentEl)
            const style = getComputedStyle(el), rect = el.getBoundingClientRect()
            const _style: CSSProperties = { position: 'absolute' };
            // 对其位置
            ['top', 'left'].forEach(e => {
                const borderWidth = parseInt(parentStyle[camelize(`border-${e}-width`)])
                _style[e] = Math.abs(rect[e] - parentRect[e]) - borderWidth + 'px'
            });
            ['width', 'height'].forEach(e => _style[e] = Math.ceil(rect[e]) + 'px')
            _style.borderRadius = style.borderRadius
            _style.zIndex = +style.zIndex + 1
            child.state.style = _style
        }
    }

    child.resizeCb()

    resizeobserver.observer(parentEl, child.resizeCb)

    return child
}

const SkeletonItem: Directive = {
    mounted(el, binding) {
        // @ts-ignore
        const props: Props = skeletonList.findLast(e => e.el.contains(el))
        if (!props) return
        const child = createItem(props, el, binding)
        props.targets.push(child)
    },
    beforeUnmount(el) {
        // @ts-ignore
        const props: Props = skeletonList.findLast(e => e.el.contains(el))
        if (!props) return
        const i = props.targets.findIndex(e => e.el === el)
        if (i < 0) return
        const child = props.targets[i]
        props.targets.splice(i, 1)
        resizeobserver.dispose(props.el, child.resizeCb)
    }
}


export { Skeleton, SkeletonItem }