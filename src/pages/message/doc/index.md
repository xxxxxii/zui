# Message 组件

<script setup>
  import demo from "./demo.vue"
  import demo2 from "./demo2.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="message" vueFName="demo" />

<demo2 />
<pre-view compName="message" vueFName="demo2" />

## 属性

| 属性名    | 说明                                              | 参数                                          |
| :-------- | :------------------------------------------------ | :-------------------------------------------- |
| type      | 显示消息提示的类型                                | string: "warning", "info", "success", "error" |
| message   | 提示的文字                                        | string                                        |
| duration  | 消息关闭的时间                                    | number                                        |
| topOffset | 消息弹出距离顶部的距离                            | number                                        |
| center    | 消息是否居中，默认为 fasle,居中会提示框显示 300px | boolean                                       |

## 事件

| 事件名  | 说明             | 参数 |
| :------ | :--------------- | :--- |
| onClose | 消息框关闭的回调 |      |
