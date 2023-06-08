<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-08 18:05:34
-->
<template>
  <div>
    <h2>tabs</h2>
    {{ val }}
    <z-tabs v-model="val">
      <z-tab-pane table="tab1">
        <h2>this is tab1 title</h2>
        <div>this is tab1 content</div>
      </z-tab-pane>
      <z-tab-pane table="tab2"> <h2>this is tab2 title</h2> </z-tab-pane>
      <z-tab-pane table="tab3"> <h2>this is tab3 title</h2></z-tab-pane>
      <z-tab-pane table="tab4"> <h2>this is tab3 title</h2></z-tab-pane>
      <z-tab-pane table="tab5"> <h2>this is tab3 title</h2></z-tab-pane>
    </z-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const val = ref("0");
</script>

<style scoped lang="scss"></style>
