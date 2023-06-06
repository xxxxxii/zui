<!--
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-06 14:06:24
-->

# Checkbox 组件

<script setup>
  import demo from "./demo.vue"
  import demoGroup from "./demoGroup.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="checkbox" vueFName="demo" />

<demoGroup />
<pre-view compName="checkbox" vueFName="demoGroup" />

## checkboxGroup Api

| 属性     | 说明                            | 参数                              |
| :------- | :------------------------------ | :-------------------------------- |
| v-model  | 选中的值                        | []: 默认：-                       |
| disabled | 组的禁用状态                    | boolean: 默认：false              |
| mode     | 排列模式，vertical， horizontal | string: 默认：horizontal:横向排列 |

## checkboxGroup Event

| 属性   | 说明                   | 参数           |
| :----- | :--------------------- | :------------- |
| update | 绑定值变化时触发的事件 | （list）=>void |

## checkbox Api

组件以设置 attrs,可自行设置属性
| 属性 | 说明 | 参数 |
| :------- | :---------------------- | :------------------- |
| v-model | 选中的值 | boolean: 默认：false |
| disabled | 禁用状态 | boolean: 默认：false |
| label | 显示的内容 | string:number: 默认：- |
| value | 绑定在 input 上的 value | string:number: 默认：- |
| indeterminate | 不确定状态 | boolean: 默认：false |

## checkbox slot

组件以设置 attrs,可自行设置属性
| 属性 | 说明 | 参数 |
| :------- | :---------------------- | :------------------- |
| checkbox | 默认插槽，设置了 label 属性便失去效果 | - |
