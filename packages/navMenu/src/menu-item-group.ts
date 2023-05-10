

import type { ExtractPropTypes, InjectionKey, PropType } from "vue"


export const menuItemGroupProps = {
    title: {
        type: [Number, String] as PropType<string | number>,
    },

} as const


export type MenuItemGroupProps = Partial<ExtractPropTypes<typeof menuItemGroupProps>>


export interface MenuItemGroupContext extends MenuItemGroupProps {
    // collectField: (field: FormItemContext) => void
}

export const menuItemGroupContextKey: InjectionKey<MenuItemGroupContext> = Symbol()
