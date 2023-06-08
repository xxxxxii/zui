/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-08 16:59:18
 */
import type { ExtractPropTypes, InjectionKey, PropType, VNode } from "vue";

export const tabsProps = {
  modelValue: {
    type: String,
    default: "0",
  },
} as const;

export type TabsProps = Partial<ExtractPropTypes<typeof tabsProps>>;

export interface TabsContext extends TabsProps {
  collectChild: (item: any) => void;
  updateChildName: () => void;
  childList: [];
  childName: Number;
  selectTab: String;
}

export const TabsContextKey: InjectionKey<TabsContext> = Symbol();
