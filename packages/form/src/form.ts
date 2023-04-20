import { ExtractPropTypes, InjectionKey, PropType } from "vue";
import { Arrayable, FormItemContext, FormItemRule } from "./form-item";



export const formProps = {
    model: Object,
    labelWidth: {
        type: String,
        default: '120px'
    },
    labelIcon: {
        type: Boolean,
        default: true
    },
    rules: {
        type: Object as PropType<FormItemRule>
    },
    showMessage: {
        type: Boolean,
        default: true
    }
} as const


export type FormProps = Partial<ExtractPropTypes<typeof formProps>>

export type FormRules = Partial<ExtractPropTypes<typeof formProps['rules']>>


export interface FormContext extends FormProps {
    collectField: (field: FormItemContext) => void
}

export const formContextKey: InjectionKey<FormContext> = Symbol()