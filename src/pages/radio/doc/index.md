# Radio 组件

<script setup>
  import demo from "./demo.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="radio" vueFName="demo" />

## radioGroup Api

| 属性     | 说明     | 参数                   |
| :------- | :------- | :--------------------- |
| v-model  | 选中的值 | string:number: 默认：- |
| disabled | 禁用状态 | boolean: 默认：false   |

## radio Api

组件以设置 attrs,可自行设置属性
| 属性 | 说明 | 参数 |
| :------- | :---------------------- | :------------------- |
| disabled | 禁用状态 | boolean: 默认：false |
| label | 显示的内容 | string:number: 默认：- |
| value | 绑定在 input 上的 value | string:number: 默认：- |

## radio slot

组件以设置 attrs,可自行设置属性
| 属性 | 说明 | 参数 |
| :------- | :---------------------- | :------------------- |
| default | 默认插槽，设置了 label 属性便失去效果 | - |
