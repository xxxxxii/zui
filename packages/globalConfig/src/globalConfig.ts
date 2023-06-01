/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-01 10:29:27
 */
import type { ExtractPropTypes, InjectionKey, Prop, PropType } from "vue";

export const globalConfigProps = {
  config: {
    type: Object,
    default: {
      size: "md",
      type: "primary",
    },
  },
} as const;

export type GlobalConfigProps = Partial<
  ExtractPropTypes<typeof globalConfigProps>
>;

export interface GlobalConfigContext extends GlobalConfigProps {}

export const GlobalConfigContextKey: InjectionKey<GlobalConfigContext> =
  Symbol();
