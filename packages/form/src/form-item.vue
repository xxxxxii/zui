<template>
  <div class="z-form-item">
    {{ formContext.formRest }}
    <label for="" :style="{ width: labelWidth }">
      <z-icon
        v-show="itemIcon"
        :class="validateStateIcon"
        name="icon-warning"
      />
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div class="z-form-item__content">
      <slot />
      <div v-show="showError" class="z-form-item__content__error">
        {{ validateState }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "z-form-item",
};
</script>

<script setup lang="ts">
import { ref, computed, provide, inject, nextTick } from "vue";
import {
  FormItemValidateState,
  formItemProps,
  formItemContextKey,
  FormItemContext,
  Arrayable,
  FormItemRule,
} from "./form-item";
import { FormContext, formContextKey } from "./form";
import AsyncValdaitor from "async-validator";
import { onMounted } from "vue";
import { deepClone } from "../../utils";
import { watch } from "vue";

const props = defineProps(formItemProps);

const validateState = ref<FormItemValidateState>("");
let isResettingField = false;

// form 上下文
const formContext: FormContext = inject(formContextKey, null);
if (formContextKey) {
}

const validateStateIcon = computed(() => {
  return [
    validateState.value != "" ? "z-form-item--error" : "z-form-item--success",
  ];
});

const itemIcon = computed(() => {
  // (showError && validateState) ||
  if (!formContext) {
    return false;
  } else {
    return formContext.labelIcon && validateState.value !== "";
    // return showError && validateState;
  }
  //   return showError && validateState;
});

const labelWidth = computed(() => {
  return formContext ? formContext?.labelWidth : "120px";
});

// 是否显示错误信息
const showError = computed(() => {
  if (formContext) {
    return formContext?.showMessage && props.showMessage;
  } else {
    return props.showMessage;
  }
});

const converArr = (rules: Arrayable<FormItemRule> | undefined) => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : [];
};

// 合并传入的ruler和form 上级传入的rules  数组，对象，不传 整合为数组,
const _rules = computed(() => {
  const itemRules: FormItemRule[] = converArr(props.rules);

  const formRules = formContext?.rules;
  // 设置了规则并且 指定了验证字段才去验证
  if (formRules && props.prop) {
    // 取到form 定义的对应item 的验证规则
    const _temp = formRules[props.prop];
    console.log(_temp);
    if (_temp) {
      itemRules.push(...converArr(_temp));
    }
  }
  return itemRules;
});

const getRuleFitered = (trigger: string) => {
  let rules = _rules.value;
  return rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    } else {
      return rule.trigger === trigger;
    }
  });
};

const validateSuccess = () => {
  validateState.value = "";
};

const validateError = (err) => {
  //   console.log(err);
  const { errors } = err;
  validateState.value = errors ? errors[0].message : "";
};

const validate: FormItemContext["validate"] = async (trigger, callback?) => {
  if (isResettingField || !props.prop) {
    return false;
  }

  const rules = getRuleFitered(trigger);
  const modelName = props.prop;
  //   if (modelName) {
  // 校验器
  const validater = new AsyncValdaitor({
    [modelName]: rules,
  });

  const model = formContext?.model;
  console.log(rules, model[modelName]);
  return await validater
    .validate({
      [modelName]: model[modelName],
    })
    .then((res) => {
      console.log(res, "success");
      validateSuccess();
    })
    .catch((err) => {
      validateError(err);
      return Promise.reject(err);
    });

  //   }
};

const clearValidate = () => {
  validateState.value = "";
  isResettingField = false;
};

const resetField = async () => {
  isResettingField = true;

  console.log(formContext?.model[props.prop]);
  await nextTick();
  clearValidate();
  isResettingField = false;
};
let compInitData = ref();

const context = ref({
  ...props,
  compInitData,
  validate,
  clearValidate,
  resetField,
});

provide(formItemContextKey, context.value);
onMounted(() => {
  formContext?.collectField(context.value);
  compInitData.value = deepClone(formContext?.model[props.prop]);
});

const marginValue = computed(() => {
  if (props.margin) {
    return props.margin;
  } else {
    return "0 0 24px 0";
  }
});
</script>

<style lang="scss" scoped>
.z-form-item {
  width: 100%;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  margin: v-bind(marginValue);

  &--error {
    color: $danger;
    animation: buzz-out 0.5s both;
  }
  label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    flex: 0 0 auto;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  &__content {
    width: 100%;
    // height: 100%;
    position: relative;
    display: flex;
    align-items: center;

    &__error {
      position: absolute;
      left: 0;
      top: 100%;
      font-size: 12px;
      color: $danger;
    }
  }
}
@-webkit-keyframes buzz-out {
  0%,
  100%,
  20%,
  50%,
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: translate3d(0, 0, 0); /*设置只在Z轴上移动*/
  }

  40%,
  43% {
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
    transform: translate3d(0, -5px, 0);
  }
  70% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -2px, 0);
  }
  90% {
    transform: translate3d(0, -1px, 0);
  }
}
@-moz-keyframes buzz-out {
  0%,
  100%,
  20%,
  50%,
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: translate3d(0, 0, 0); /*设置只在Z轴上移动*/
  }

  40%,
  43% {
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
    transform: translate3d(0, -5px, 0);
  }
  70% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -2px, 0);
  }
  90% {
    transform: translate3d(0, -1px, 0);
  }
}
@keyframes errorIconAni {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
