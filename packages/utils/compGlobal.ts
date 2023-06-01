import { GlobalConfigContextKey } from "../globalConfig/src/globalConfig";
import { inject, computed } from "vue";

export function useCompGlobal() {
  const gContent = inject(GlobalConfigContextKey, null);

  const { size, type } = gContent?.config;

  const compSize = computed(() => (props, compInitSize = "md") => {
    return props.size ? props.size : size ? size : compInitSize;
  });
  const compTYpe = computed(() => (props, compInitType = "primary") => {
    return props.type ? props.type : type ? type : compInitType;
  });

  return {
    gContent,
    compSize,
    compTYpe,
  };
}
