/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-14 17:37:30
 */
import type { ExtractPropTypes, InjectionKey, PropType, VNode } from "vue";

export const tabsProps = {
  modelValue: {
    type: String,
    default: "0",
  },
  type:{
    type:String
  },
} as const;

export type TabsProps = Partial<ExtractPropTypes<typeof tabsProps>>;

export interface TabsContext extends TabsProps {
  collectChild: (item: any) => void;
  updateChildName: () => void;
  selectTab: String;
}

export const TabsContextKey: InjectionKey<TabsContext> = Symbol();
