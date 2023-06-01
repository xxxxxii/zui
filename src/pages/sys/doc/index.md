<!--
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-01 15:25:18
-->

# Sys 全局组件配置

## 目的与实现方式

### 全局组件配置为了一个系统整体风格的统一性，也是为了方便管理。zui 使用了 vue 的 provide, inject 功能实现

## 配置方法

### 生效规则

#### globalConfig 改变的是组件的默认属性，组件为设置属性才可生效

#### 优先性：组件>globalConfig

### 在项目的根组件上，最外层可以包裹所有组件的外层

<script setup>
  import demo from "./demo.vue"
  import preView from "@/components/preview/preview.vue"
</script>
<demo />
<pre-view compName="sys" vueFName="demo" />

### 配置项

| 属性名 | 说明                                                             | 参数                  |
| :----- | :--------------------------------------------------------------- | :-------------------- |
| size   | 控制组件的 size ,可以改变具有 size 属性且未设置的组件的 size     | string ,默认 md       |
| type   | 控制组件的 主题样式 ,可以改变具有 type 属性且未设置的组件的 type | string , 默认 primary |
