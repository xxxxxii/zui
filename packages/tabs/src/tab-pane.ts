/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-08 16:52:38
 */
import type { ExtractPropTypes, InjectionKey, PropType } from "vue";

export const tabPaneProps = {
  table: {
    type: String,
  },
  name: {
    type: String,
  },
} as const;

export type TabPaneProps = Partial<ExtractPropTypes<typeof tabPaneProps>>;

export interface TabPaneContext extends TabPaneProps {}

export const TabPaneContextKey: InjectionKey<TabPaneContext> = Symbol();
