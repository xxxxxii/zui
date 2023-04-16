# Upload 组件

<script setup>
  import demo from "./demo.vue"
  import demoDrop from "./demoDrop.vue"
  import demoLimit from "./demoLimit.vue"
  import demoMultiple from "./demoMultiple.vue"
  import demoSelfUpload from "./demoSelfUpload.vue"
  import demoSuccess from "./demoSuccess.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="upload" vueFName="demo" />

<demoDrop />
<pre-view compName="upload" vueFName="demoDrop" />

<demoLimit />
<pre-view compName="upload" vueFName="demoLimit" />

<demoMultiple />
<pre-view compName="upload" vueFName="demoMultiple" />

<demoSelfUpload />
<pre-view compName="upload" vueFName="demoSelfUpload" />

<demoSuccess />
<pre-view compName="upload" vueFName="demoSuccess" />

## 属性

| 属性名     | 说明                | 参数                                     |
| :--------- | :------------------ | :--------------------------------------- |
| multiple   | 同原生属性,是否多选 | boolean                                  |
| fileList   | 默认的文件列表      | array                                    |
| drop       | 拖拽上传            | boolean                                  |
| uploadUrl  | 上传的 api          | string                                   |
| limit      | 文件限制            | object:{size:文件大小,maxFiles:文件数量} |
| autoUpload | 是否自动上传        | boolean，默认 true                       |

## 事件

| 事件名     | 说明                   | 参数                                                              |
| :--------- | :--------------------- | :---------------------------------------------------------------- |
| onSuccess  | 上传成功 回调          | {fileList:文件列表 ,files:当前上传的文件,resData:成功服务器返回}  |
| fileChange | 文件改变时的回调       | {fileList:文件列表 ,files:当前上传的文件}                         |
| fileDel    | 文件列表中删除时的回调 | {item:删除的文件对象 ,index:删除的文件对象在 fileList 中的 index} |
