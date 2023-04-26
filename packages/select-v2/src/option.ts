

import type { ExtractPropTypes, InjectionKey, PropType } from "vue"


export const optionProps = {
    label: {
        type: [Number, String] as PropType<string | number>,
        required: true,
    },
    value: {
        type: [Number, String] as PropType<string | number>,
        required: true,
    },

} as const


export type OptionProps = Partial<ExtractPropTypes<typeof optionProps>>


export interface OptionContext extends OptionProps {
    // collectField: (field: FormItemContext) => void
}

export const optionContextKey: InjectionKey<OptionContext> = Symbol()
