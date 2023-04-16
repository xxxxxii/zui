# 文本域 Textarea

<script setup>
    import demo from "./demo.vue"
    import demoWidth from "./demo-width.vue"
    import demoShowWordCount from "./demo-showWordCount.vue"
    import demoRows from "./demo-rows.vue"
    import demoReadonly from "./demo-readonly.vue"
    import demoPlaceholder from "./demo-placeholder.vue"
    import demoDisabled from "./demo-disabled.vue"
    import preView from "@/components/preview/preview.vue"
</script>

<demo />
<pre-view compName="textarea" vueFName="demo" />

<demoWidth/>
<pre-view compName="textarea" vueFName="demo-width" />

<demoShowWordCount/>
<pre-view compName="textarea" vueFName="demo-showWordCount" />

<demoRows/>
<pre-view compName="textarea" vueFName="demo-rows" />

<demoReadonly/>
<pre-view compName="textarea" vueFName="demo-readonly" />

<demoPlaceholder/>
<pre-view compName="textarea" vueFName="demo-placeholder" />

<demoDisabled/>
<pre-view compName="textarea" vueFName="demo-disabled" />

## 属性

| 属性名        | 说明           | 参数                 |
| :------------ | :------------- | :------------------- |
| rows          | 同原生属性     | number               |
| placeholder   | 同原生属性     | string               |
| disabled      | 同原生属性     | boolean              |
| maxlength     | 同原生属性     | number               |
| readonly      | 同原生属性     | boolean              |
| showWordCount | 显示字数统计   | boolean              |
| width         | textarea width | string:可以 px,rem,% |

## 事件

| 事件名 | 说明       | 参数  |
| :----- | :--------- | :---- |
| focus  | 同原生事件 | event |
| blur   | 同原生事件 | event |
