# Layout 组件

<script setup>
  import layout from "./layout.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<layout />
<pre-view compName="layout" vueFName="layout" />

## Row Api

| 属性 | 说明              | 参数            |
| :--- | :---------------- | :-------------- |
| spac | row 内部 col 间距 | number: 默认：0 |

## Col Api

| 属性    | 说明                                          | 参数                   |
| :------ | :-------------------------------------------- | :--------------------- |
| col     | row 24 列，col，设置占用多少列                | number: 默认：24       |
| padding | Header padding                                | string: 默认："0 20px" |
| offset  | col 偏移与 col 一致，可设置断点               | number                 |
| xs      | <768px 与 col 一致，设置在该断点下占用的栅格  | number                 |
| sm      | ≥768px 与 col 一致，设置在该断点下占用的栅格  | number                 |
| md      | ≥992px 与 col 一致，设置在该断点下占用的栅格  | number                 |
| lg      | ≥1200px 与 col 一致，设置在该断点下占用的栅格 | number                 |
| lg      | ≥1920px 与 col 一致，设置在该断点下占用的栅格 | number                 |
