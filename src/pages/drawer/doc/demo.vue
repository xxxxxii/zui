<template>
  <div>
    <h2>drawer 基础使用</h2>
    <z-button type="primary" @click="showDialogLeft = true">
      show drawer left
    </z-button>
    <z-button type="primary" @click="showDialogRight = true">
      show drawer right
    </z-button>
    <z-button type="primary" @click="showDialogTop = true">
      show drawer top
    </z-button>
    <z-button type="primary" @click="showDialogBottom = true">
      show drawer bottom
    </z-button>
    <z-drawer v-model="showDialogLeft" title="this is title" direction="left">
      left
    </z-drawer>
    <z-drawer v-model="showDialogRight" title="this is title">
      right

      <div>
        <ul>
          <li v-for="item in 1000">li {{ item }}</li>
        </ul>
      </div>
    </z-drawer>
    <z-drawer
      v-model="showDialogBottom"
      title="this is title"
      direction="bottom"
    >
      bottom
    </z-drawer>
    <z-drawer v-model="showDialogTop" title="this is title" direction="top">
      top
    </z-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showDialogLeft = ref(false);
const showDialogRight = ref(false);
const showDialogBottom = ref(false);
const showDialogTop = ref(false);
</script>

<style scoped>
.z-button {
  margin-right: 10px;
}
</style>
