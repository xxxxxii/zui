

import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import type { RuleItem } from 'async-validator'

export type Arrayable<T> = T | T[]


export interface FormItemRule extends RuleItem {
    trigger?: Arrayable<string>
}


export const formItemValidateState = ['success', 'error', '']

export type FormItemValidateState = typeof formItemValidateState[number]

export const formItemProps = {
    prop: String,
    label: String,
    margin: {
        type: String,
        default: '0 0 16px 0'
    },
    rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
    showMessage: {
        type: Boolean,
        default: true
    }
} as const

export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>

export interface FormItemContext extends FormItemProps {
    validate: (trigger: string, callback?: (isValid: boolean) => void) => Promise<void>
}

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol()
