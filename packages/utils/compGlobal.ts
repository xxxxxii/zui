/*
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-06 17:58:42
 */
import { GlobalConfigContextKey } from "../globalConfig/src/globalConfig";
import { inject, computed } from "vue";

export function useCompGlobal() {
  const gContent = inject(GlobalConfigContextKey, null);

  const { size, type } = gContent?.config;

  console.log({ size, type });
  const compSize = computed(() => (props, compInitSize = "md") => {
    return props?.size ? props?.size : size ? size : compInitSize;
  });
  const compType = computed(() => (props, compInitType = "primary") => {
    return props?.type ? props?.type : type ? type : compInitType;
  });

  return {
    gContent,
    compSize,
    compType,
    size,
    type,
  };
}
