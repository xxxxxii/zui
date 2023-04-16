<template>
  <div class="container">
    <h2>type: success, primary, info, warning, danger</h2>
    <div class="main-box">
      <z-button>default</z-button>
      <z-button type="success">success</z-button>
      <z-button type="primary">primary</z-button>
      <z-button type="info">info</z-button>
      <z-button type="warning">warning</z-button>
      <z-button type="danger">danger</z-button>
    </div>

    <h2>size:xs,default, md, lg</h2>
    <div class="main-box">
      <z-button type="danger" size="xs">size</z-button>
      <z-button type="danger">size</z-button>
      <z-button type="danger" size="md">size</z-button>
      <z-button type="danger" size="lg">size</z-button>
    </div>

    <h2>disabled</h2>
    <div class="main-box">
      <z-button type="primary" disabled @click="disabledClick"
        >disabled</z-button
      >
    </div>

    <h2>plain</h2>
    <div class="main-box">
      <z-button plain>plain</z-button>
      <z-button type="primary" plain>plain</z-button>
      <z-button type="success" plain>plain</z-button>
      <z-button type="info" plain>plain</z-button>
      <z-button type="warning" plain>plain</z-button>
      <z-button type="danger" plain>plain</z-button>
    </div>

    <h2>round</h2>
    <div class="main-box">
      <z-button round>round</z-button>
      <z-button type="primary" size="lg" round plain>round</z-button>
      <z-button type="success" size="md" round>round</z-button>
      <z-button type="info" size="xs" round>round</z-button>
      <z-button type="warning" round>round</z-button>
      <z-button type="danger" round>round</z-button>
    </div>

    <h2>插槽:icon</h2>
    <div class="main-box">
      <z-button type="info" size="xs">xs</z-button>
    </div>

    <h2>图标:icon</h2>
    <div class="main-box">
      <z-button type="info" size="xs" icon="icon-pdf" :loading="false">
        Icon</z-button
      >
    </div>

    <h2>loading:loading</h2>
    <div class="main-box">
      <z-button type="info" icon="icon-pdf" :loading="loading"> Icon</z-button>

      <z-button type="info" size="xs" @click="loading = true">
        loading</z-button
      >

      <z-button type="info" size="xs" @click="loading = false">
        loading stop</z-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { zButton } from "v3-zy-ui";

const loading = ref(false);

function disabledClick(e) {
  alert(e);
}
</script>

<style scoped lang="scss">
.container {
  .main-box {
    display: flex;
    width: 100%;
    align-items: end;
  }
  .z-button {
    margin-right: 5px;
  }
}
</style>
