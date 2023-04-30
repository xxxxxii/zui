import type { ExtractPropTypes, InjectionKey, PropType } from "vue"


export const subMenuProps = {
    title: {
        type: [Number, String] as PropType<string | number>,
    },
    icon: {
        type: String,
    },
    path: {
        type: [Number, String] as PropType<string | number>,
    },

} as const


export type subMenuProps = Partial<ExtractPropTypes<typeof subMenuProps>>


export interface SubMenuContext extends subMenuProps {
    tier: number,
    itemPadding: string,
    collectMneu: (item) => void
}

export const subMenuContextKey: InjectionKey<SubMenuContext> = Symbol()
