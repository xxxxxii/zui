

import type { ExtractPropTypes, InjectionKey, PropType } from "vue"


export const menuItemProps = {
    label: {
        type: [Number, String] as PropType<string | number>,
    },
    icon: {
        type: String,
    },
    path: {
        type: [Number, String] as PropType<string | number>,
    }

} as const


export type MenuItemProps = Partial<ExtractPropTypes<typeof menuItemProps>>


export interface MenuItemContext extends MenuItemProps {
    // collectField: (field: FormItemContext) => void
}

export const menuItemContextKey: InjectionKey<MenuItemContext> = Symbol()
