<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-01 11:40:35
-->
<template>
  <div>
    <h2>type</h2>
    <z-tag>default</z-tag>
    <z-tag type="success">success</z-tag>
    <z-tag type="info">info</z-tag>
    <z-tag type="danger">danger</z-tag>
    <z-tag type="warning">warning</z-tag>
  </div>
  <div>
    <h2>size</h2>
    <z-tag size="xs">default</z-tag>
    <z-tag type="info" size="md">info</z-tag>
    <z-tag type="danger" size="lg">danger</z-tag>
    <z-tag type="warning">warning</z-tag>
  </div>
  <div>
    <h2>closeable</h2>
    <z-tag icon="icon-pro-success" closeable>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="success" closeable>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="info" closeable>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="danger" closeable>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="warning" closeable>Tag</z-tag>
  </div>
  <div>
    <h2>icon</h2>
    <z-tag icon="icon-pro-success">Tag</z-tag>
    <z-tag icon="icon-pro-success" type="success">Tag</z-tag>
    <z-tag icon="icon-pro-success" type="info">Tag</z-tag>
    <z-tag icon="icon-pro-success" type="danger">Tag</z-tag>
    <z-tag icon="icon-pro-success" type="warning">Tag</z-tag>
  </div>
  <div>
    <h2>plain</h2>
    <z-tag icon="icon-pro-success" plain>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="success" plain>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="info" plain>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="danger" plain>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="warning" plain>Tag</z-tag>
  </div>

  <div>
    <h2>border</h2>
    <z-tag icon="icon-pro-success" plain bor>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="success" plain bor>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="info" plain bor>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="danger" plain bor>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="warning" plain bor>Tag</z-tag>
  </div>
  <div>
    <h2>round</h2>
    <z-tag icon="icon-pro-success" round>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="success" round>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="info" round>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="danger" round>Tag</z-tag>
    <z-tag icon="icon-pro-success" type="warning" round>Tag</z-tag>
  </div>

  <div>
    <h2>关闭事件</h2>
    <z-tag icon="icon-pro-success" closeable round @close="close">Tag</z-tag>
  </div>
</template>

<script setup lang="ts">
import { ZMessage } from "../../../../packages";

const close = (val) => {
  ZMessage({
    type: "success",
    message: "tag" + "关闭事件",
    duration: 2000,
    topOffset: 10,
    center: true,
    onClose: () => {
      console.log("消息提示关闭");
    },
  });
};
</script>

<style scoped lang="scss">
.z-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
