import type { ExtractPropTypes, InjectionKey, PropType } from "vue"



export const radioGroupProps = {
    modelValue: {
        type: [String, Number] as PropType<string | number>,
    },
    disabled: {
        type: Boolean,
        default: false
    },

} as const


export type RadioGroupProps = Partial<ExtractPropTypes<typeof radioGroupProps>>


export interface RadioGroupContext extends RadioGroupProps {
    // collectField: (field: FormItemContext) => void
    update: (item: any) => void
}

export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol()