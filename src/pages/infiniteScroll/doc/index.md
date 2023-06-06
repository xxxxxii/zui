# InfiniteScroll 组件

<script setup>
  import demo from "./demo.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="infiniteScroll" vueFName="demo" />

| 属性名    | 说明                                                         | 参数                                                                                     |
| :-------- | :----------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| listData  | 数据源 [{template:虚拟 dom,使用 h 函数生成，定义渲染的模版}] | array ,template 为必须                                                                   |
| num       | 与渲染的条数                                                 | number , 请保证预渲染 dom 的高度相加 >= 外层 z-infinite-scroll 的高度，否则无法正常使用  |
| doneText  | 数据加载完毕后 的文字提示                                    | string ,-                                                                                |
| threshold | IntersectionObserver 函数的触发参数（0-1）                   | number ,详情参考 ·https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver· |
