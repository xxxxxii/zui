<!--
 * @Description: 
 * @version: 0.0.1
 * @Author: yulinZ
 * @LastEditTime: 2023-06-15 18:05:36
-->
<template>
  <div>
    <h2>tabs 基础使用</h2>
    <z-tabs v-model="val">
      <z-tab-pane lable="tab1">
        <h2>this is tab1 title</h2>
        <div>this is tab1 content</div>
      </z-tab-pane>
      <z-tab-pane lable="tab2">
        <h2>this is tab2 title</h2>
      </z-tab-pane>
      <z-tab-pane lable="tab3"> <h2>this is tab3 title</h2></z-tab-pane>
      <z-tab-pane lable="tab4"> <h2>this is tab4 title</h2></z-tab-pane>
      <z-tab-pane lable="tab5"> <h2>this is tab5 title</h2></z-tab-pane>
    </z-tabs>
  </div>
  <div>
    <h2>tab 位置 left,right,top,bottom</h2>
    <z-radio-group v-model="pos">
      <z-radio label="top" value="top"></z-radio>
      <z-radio label="left" value="left"></z-radio>
      <z-radio label="right" value="right"></z-radio>
      <z-radio label="bottom" value="bottom"></z-radio>
    </z-radio-group>
    <z-tabs v-model="val" :tabPosition="pos">
      <z-tab-pane lable="tab1">
        <h2>this is tab1 title</h2>
        <div>this is tab1 content</div>
      </z-tab-pane>
      <z-tab-pane lable="tab22">
        <h2>this is tab2 title</h2>
      </z-tab-pane>
      <z-tab-pane lable="tab333" name="tabTwo">
        <h2>this is tab3 title</h2></z-tab-pane
      >
      <z-tab-pane lable="tab4444"> <h2>this is tab4 title</h2></z-tab-pane>
      <z-tab-pane lable="tab55555"> <h2>this is tab5 title</h2></z-tab-pane>
    </z-tabs>
  </div>
  <div>
    <h2>tab显示样式 默认bar, 可选card</h2>
    <z-tabs v-model="val" show-type="card" tabPosition="right">
      <z-tab-pane lable="tab1">
        <h2>this is tab1 title</h2>
        <div>this is tab1 content</div>
      </z-tab-pane>
      <z-tab-pane lable="tab2">
        <h2>this is tab2 title</h2>
      </z-tab-pane>
      <z-tab-pane lable="tab3"> <h2>this is tab3 title</h2></z-tab-pane>
      <z-tab-pane lable="tab4"> <h2>this is tab4 title</h2></z-tab-pane>
      <z-tab-pane lable="tab5"> <h2>this is tab5 title</h2></z-tab-pane>
    </z-tabs>
  </div>
  <div>
    <h2>type:设置主题 ,自定义tab</h2>
    <z-tabs v-model="val" type="primary">
      <z-tab-pane lable="tab1">
        <h2>this is tab1 title</h2>
        <div>this is tab1 content</div>
      </z-tab-pane>
      <z-tab-pane lable="tab2">
        <template #label>
          <div
            style="
              line-height: 14px;
              white-space: nowrap;
              display: flex;
              align-items: center;
            "
          >
            <z-icon name="icon-Loading"></z-icon>
            tab2 defined
          </div>
        </template>
        <h2>this is tab2 title</h2>
      </z-tab-pane>
      <z-tab-pane lable="tab3"> <h2>this is tab3 title</h2></z-tab-pane>
      <z-tab-pane lable="tab4"> <h2>this is tab4 title</h2></z-tab-pane>
      <z-tab-pane lable="tab5"> <h2>this is tab5 title</h2></z-tab-pane>
    </z-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const val = ref("tab1");
const val1 = ref("tab2");
const pos = ref("top");
</script>

<style scoped lang="scss"></style>
