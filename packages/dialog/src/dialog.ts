

import { ExtractPropTypes, InjectionKey, PropType } from 'vue'


export const diglogProps = {
    width: {
        type: String,
        default: '30%'
    },
    top: {
        type: String,
        default: '15vh'
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

export type DialogProps = Partial<ExtractPropTypes<typeof diglogProps>>

export interface DialogContext extends DialogProps {

}

export const formItemContextKey: InjectionKey<DialogContext> = Symbol()
