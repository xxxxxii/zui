

import { ExtractPropTypes, InjectionKey, PropType } from 'vue'


export const drawerProps = {
    width: {
        type: String,
        default: '30%'
    },
    direction: {
        type: String,
        default: 'right'
    },
    title: String,
    showClose: {
        type: Boolean,
        default: true
    },
    mask: {
        type: Boolean,
        default: true
    },
    maskClick: Boolean,
    modelValue: {
        type: Boolean,
        default: false
    },
    draggable: Boolean

} as const

export type DrawerProps = Partial<ExtractPropTypes<typeof drawerProps>>

export interface DrawerContext extends DrawerProps {

}

export const drawerContextKey: InjectionKey<DrawerContext> = Symbol()
