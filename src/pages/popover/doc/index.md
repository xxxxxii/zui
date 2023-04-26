# Popover 组件

<script setup>
  import demo from "./demo.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="popover" vueFName="demo" />

## api

| 属性名    | 说明                                                     | 参数                       |
| :-------- | :------------------------------------------------------- | :------------------------- |
| label     | 提示框的 title                                           | string , number            |
| content   | 主要内容                                                 | string , number            |
| placement | 默认弹出方向 'top','bottom'                              | string                     |
| visible   | 控制 提示框 的显示                                       | boolean，默认 false        |
| trigger   | 触发事件 'hover','click'                                 | string ，默认'hover'       |
| width     | 弹出框的宽度                                             | string，默认 'fit-content' |
| selfSet   | 是否自己设置弹出框的控制逻辑，搭配 @clickTarget 事件使用 | boolean，默认 false        |

## Event

| 事件名      | 说明                   | 参数                                                              |
| :---------- | :--------------------- | :---------------------------------------------------------------- |
| clickTarget | 组件点击事件回调       | ({el:组件组最外层 dom ,target:点击的元素}) =>void                 |
| hover       | 组件 hover 事件回调    | (isHover:boolean) =>void ,isHover 是否 hover 状态                 |
| fileDel     | 文件列表中删除时的回调 | {item:删除的文件对象 ,index:删除的文件对象在 fileList 中的 index} |
