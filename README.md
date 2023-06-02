<!--
 * @Description:
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-02 15:23:40
-->

# Vue 3 UI

vue3 ui library

## 文档地址

[blogyl.xyz/zui](https://github.com/xxxxxii/zui)

## 项目地址

https://github.com/xxxxxii/zui

## 本人联系方式

QQ 1504335501
欢迎各位朋友共同维护

# use

```ts
// 安装
npm i v3-zy-ui


// 使用
import ZUI form "v3-zy-ui"
// 引入组件样式文件
import "../node_modules/v3-yl-ui/dist/style.css";
app.use(ZUI)
or
import {zButton} form "v3-zy-ui"
```

# 更新日志

## v0.0.4 2023-4-20

1. form 表单组件 发布
2. 多选组件 checkbox 发布

## v0.0.5 2023-4-21

1. form 表单组件 restForm 功能新增
2. radio 单选组件 发布

## v0.0.6 2023-4-26

1. Select V2 版本发布，下版本 v1 将被 废弃
2. popover 提示组件 发布

## v0.0.7 2023-4-27

1. menu v2 基础架构搭建 发布，采用 slot 方式开发更加灵活

## v0.0.8 2023-4-30

1. menu v2 功能完善，收缩 bug 修复
2. 移除 Select V1

### 2023-5-7

1. 添加骨架屏指令 skeleton,skeleton-item

## v0.0.9 2023-5-10

1. dialog 组件发布
2. drawer 组件发布
3. drag 拖拽指令开发

## v0.0.11 2023-6-1

1. text 组件发布
2. date 日期选择组件发布
3. 添加 switch 动画
4. 优化 popover 组件显示动画失效问题（包括基于此组件开发的其他组件）
5. 添加全局组件配置 globaConfig

## v0.0.11 2023-6-1

1. fix datePicker 选择 date 点击 ok 不关闭 bug
2. 添加 globalConfig 控制 datePicker 主题色
3. 组件库添加 基础 font-family:

```css
font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
  "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
  sans-serif;
```

## v0.0.11 2023-6-2

1. fix navMenu 侧边模式下 hover 触发状态下点击还能控制的 bug,active 变化时为更新 bug
2. fix dialog 可见时 页面还能滚动
3. 更新datePicker组件跟随 全局控制
4. input，select 样式调整 
