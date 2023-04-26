# Form 组件

<script setup>
  import demo from "./demo.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="form" vueFName="demo" />

## 本组件 内置使用 `async-validator` 作为验证器，验证规则请参考 `async-validator`，与 element 保持一致

## formItem Api

| 属性        | 说明                      | 参数                        |
| :---------- | :------------------------ | :-------------------------- |
| label       | item 显示的 label         | string: 默认：-             |
| rules       | item 的校验规则           | array . object: 默认：[]    |
| prop        | item 需要验证的 key       | string: 默认：-             |
| margin      | item 的 margin css 值     | string: 默认： '0 0 16px 0' |
| showMessage | item 是否显示验证提示文字 | boolean: 默认： true        |

## form Event

| 属性   | 说明                   | 参数           |
| :----- | :--------------------- | :------------- |
| update | 绑定值变化时触发的事件 | （list）=>void |

## checkbox Api

组件以设置 attrs,可自行设置属性
| 属性 | 说明 | 参数 |
| :------- | :---------------------- | :------------------- |
| model | 表单绑定的数据源 | boolean: 默认：false |
| labelWidth | 表单中 label 的 width | string: 默认：'120px' |
| labelIcon | 是否显示 表单 label 前面的验证状态图标 | boolean: 默认：true |
| rules | 表单整体验证规则 | string:number: 默认：- |
| showMessage | 显示验证文本提示 | boolean: 默认：true |

## form formItem slot

组件以设置 attrs,可自行设置属性
| 属性 | 说明 | 参数 |
| :------- | :---------------------- | :------------------- |
| default | 默认插槽 | - |
