# Dialog 组件

<script setup>
  import demo from "./demo.vue"
  import demoBase from "./demoBase.vue"
  import demoSlot from "./demoSlot.vue"
    import demoDrag from "./demoDrag.vue"
  import preView from "@/components/preview/preview.vue"
</script>

<demoBase />
<pre-view compName="dialog" vueFName="demoBase" />

<demo />
<pre-view compName="dialog" vueFName="demo" />

<demoSlot />
<pre-view compName="dialog" vueFName="demoSlot" />

<demoDrag />
<pre-view compName="dialog" vueFName="demoDrag" />

## 属性

| 属性名    | 说明                                                        | 参数                            |
| :-------- | :---------------------------------------------------------- | :------------------------------ |
| v-model   | 是否显示 dialog                                             | boolean 默认 false              |
| width     | dialog 的宽度                                               | string ，可任意设置             |
| title     | dialog 的 title                                             | string                          |
| showClose | 是否显示 header 上的关闭按钮，只在未使用 header slot 下生效 | boolean 默认 true               |
| top       | dialog 弹出距离顶部的距离                                   | string ，可任意设置 ，默认 15vh |
| mask      | dialog 弹出时是否需要 mask 遮罩层                           | boolean 默认 true               |
| maskClick | dialog 弹出时是否可以点击 mask 遮罩层关闭                   | boolean 默认 false              |
| draggable | dialog 弹出时是否可以拖动                                   | boolean 默认 false              |

## 插槽

| 事件名 | 说明                 | 参数 |
| :----- | :------------------- | :--- |
| header | dialog 头部          |      |
| slot   | dialog body,主体部分 |      |
| footer | dialog footer 部分   |      |

## 事件

| 事件名 | 说明              | 参数 |
| :----- | :---------------- | :--- |
| close  | dialog 关闭的回调 | ---  |
