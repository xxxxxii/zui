<template>
  <div>
    <h2>vue3 组合式api使用方式</h2>
    <z-button
      v-for="item in successArr"
      :type="item === 'error' ? 'danger' : item"
      @click="showMessage(item)"
      >{{ item }}</z-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ZMessage } from "../../../../packages";
// import { ZMessage } from "v3-zy-ui";

const successArr = ref(["warning", "info", "success", "error"]);
const showMessage = (type) => {
  ZMessage({
    type: type,
    message: "error message",
    duration: 2000,
    topOffset: 10,
    center: true,
    onClose: () => {
      console.log("消息提示关闭");
    },
  });
};
</script>
