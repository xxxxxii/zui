# Container 组件

<script setup>
  import demo from "./demo.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="container" vueFName="demo" />

## Container Api

| 属性      | 说明           | 参数                                              |
| :-------- | :------------- | :------------------------------------------------ |
| direction | 容器内排列方式 | string: "vertical", "horizontal" 默认：vertical， |

## Header Api

| 属性    | 说明           | 参数                   |
| :------ | :------------- | :--------------------- |
| height  | Header 高度    | string: 默认：70px     |
| padding | Header padding | string: 默认："0 20px" |

## Aside Api

| 属性  | 说明       | 参数                |
| :---- | :--------- | :------------------ |
| width | Aside 宽度 | string: 默认：200px |

## Footer Api

| 属性    | 说明           | 参数                   |
| :------ | :------------- | :--------------------- |
| padding | Header padding | string: 默认："0 20px" |

## Main Api

| 属性    | 说明           | 参数                 |
| :------ | :------------- | :------------------- |
| padding | Header padding | string: 默认："20px" |
