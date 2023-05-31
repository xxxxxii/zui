<!--
 * @Description: 
 * @version: 
 * @Author: yulinZ
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 18:11:58
-->
<template>
  <div>
    <h2>基础使用</h2>
    <z-date-picker
      width="150px"
      v-model="dateVal"
      @change="getDate"
    ></z-date-picker>
    {{ dateVal }}
  </div>

  <div>
    <h2>不同大小:默认md</h2>
    <z-date-picker
      width="150px"
      v-model="dateVal"
      @change="getDate"
      size="lg"
    ></z-date-picker>
    <z-date-picker
      width="150px"
      v-model="dateVal"
      @change="getDate"
      size="md"
    ></z-date-picker>
    <z-date-picker
      width="150px"
      v-model="dateVal"
      @change="getDate"
      size="xs"
    ></z-date-picker>
  </div>

  <div>
    <h2>格式化数据和显示</h2>
    <ins
      >格式化使用dayjs,具体可参考<z-text
        type="a"
        href="https://dayjs.fenxianglu.cn/"
        >dayjs</z-text
      ></ins
    >
    <br />
    <z-date-picker
      v-model="dateVal"
      @change="getDate"
      format="MM-DD-YYYY"
      value-format="YYYY/MM/DD"
    ></z-date-picker>
  </div>

  <div>
    <h2>选择年份</h2>
    <z-date-picker
      width="150px"
      v-model="yearVal"
      @change="getDate"
      type="year"
    ></z-date-picker>
  </div>
  <div>
    <h2>选择月份</h2>
    <z-date-picker
      width="150px"
      v-model="yearMonthVal"
      @change="getDate"
      type="month"
    ></z-date-picker>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dateVal = ref("2023-10-20");
const yearVal = ref("");
const yearMonthVal = ref("");

const getDate = (val) => {
  console.log(val);
};
</script>

<style scoped lang="scss"></style>
