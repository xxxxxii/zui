<template>
  <div>
    <h2>插槽</h2>
    <z-button type="primary" @click="showDialog = true"> show dialog </z-button>
    <z-dialog title="this Title" v-model="showDialog" :mask="false">
      <template #header>
        <h2>我是title</h2>
        <z-button @click="showDialog = false">close</z-button>
      </template>
      <div>this is dialog content</div>

      <template #footer>
        <div style="display: flex; justify-content: end">
          <z-button
            @click="showDialog = false"
            type="primary"
            size="xs"
            style="margin-right: 10px"
            >确定</z-button
          >
          <z-button @click="showDialog = false" size="xs" type="danger"
            >取消</z-button
          >
        </div>
      </template>
    </z-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { drag } from "../../../../packages";

const showDialog = ref(false);
</script>
