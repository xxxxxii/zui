

import type { ExtractPropTypes, InjectionKey, PropType } from "vue"


export const selectProps = {
    modelValue: {
        type: [Number, String, Array] as PropType<string | number | Array<string | number>>,
        required: true,
    },
    placeholder: {
        type: String,
        default: "Please select",
    },
    size: {
        type: String,
    },
    width: {
        type: String,
        default: "200px",
    },
    multiple: {
        type: Boolean,
    },
    filter: Boolean,
    tag: Boolean,
} as const


export type SelectProps = Partial<ExtractPropTypes<typeof selectProps>>


export interface SelectContext extends SelectProps {
    changeOption: (item: any, initTag?: boolean) => void
    collectData: (item: object) => void
}

export const selectContextKey: InjectionKey<SelectContext> = Symbol()
