import type { ExtractPropTypes, InjectionKey, PropType } from "vue"



export const radioProps = {
    label: {
        type: String
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    value: {
        type: [String, Number] as PropType<string | number>
    }
} as const


export type RadioProps = Partial<ExtractPropTypes<typeof radioProps>>


export interface RadioContext extends RadioProps {
    // collectField: (field: FormItemContext) => void
}

export const checkboxContextKey: InjectionKey<RadioContext> = Symbol()