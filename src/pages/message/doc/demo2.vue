<template>
  <div>
    <h2>vue2 全局挂载 使用方式</h2>
    <z-button @click="showMessage('success')">error</z-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props) {
    return {};
  },
  methods: {
    showMessage(type) {
      this.$message({
        type: type,
        message: "error message",
        duration: 2000,
        onClose: () => {
          console.log("消息提示关闭");
        },
      });
      //   ZMessage();
    },
  },
});
</script>
