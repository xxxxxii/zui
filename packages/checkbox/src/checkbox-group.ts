import { ExtractPropTypes, InjectionKey } from "vue"

export const checkboxGroupProps = {
    modelValue: Array<string | number>,
    disabled: Boolean,
    mode: {
        type: String,
        default: 'horizontal'
    }
} as const


export type CheckboxGroupProps = Partial<ExtractPropTypes<typeof checkboxGroupProps>>

export interface CheckboxGroupContext extends CheckboxGroupProps {
    collectField: (field: Object) => void
}

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol()