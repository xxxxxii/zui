# SelectV2 组件

<script setup>
  import demo from "./demo.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="selectV2" vueFName="demo" />

## select Api

| 属性名      | 说明                            | 参数                                     |
| :---------- | :------------------------------ | :--------------------------------------- |
| v-model     | select 绑定的值                 | string , number，array<string \| number> |
| placeholder | 未选择时提示信息                | string -                                 |
| size        | select size                     | string,默认'md'                          |
| multiple    | select 是否支持多选             | boolean，默认 false                      |
| filter      | 是否支持过滤选项                | boolean，默认 false                      |
| width       | select 的宽度                   | string，默认 '200px'                     |
| tag         | 多选模式下生效，多选为 tag 显示 | boolean，默认 false                      |

## option Api

| 属性名 | 说明                | 参数            |
| :----- | :------------------ | :-------------- |
| label  | option 需要显示的值 | string , number |
| value  | option 绑定的值     | string -        |

## Event

| 事件名      | 说明                   | 参数                                                              |
| :---------- | :--------------------- | :---------------------------------------------------------------- |
| clickTarget | 组件点击事件回调       | ({el:组件组最外层 dom ,target:点击的元素}) =>void                 |
| hover       | 组件 hover 事件回调    | (isHover:boolean) =>void ,isHover 是否 hover 状态                 |
| fileDel     | 文件列表中删除时的回调 | {item:删除的文件对象 ,index:删除的文件对象在 fileList 中的 index} |
