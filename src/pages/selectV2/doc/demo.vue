<template>
  <div>
    <h2>Select V2 size</h2>
    <z-select-v2 v-model="selectValue" size="lg" placeholder="请选择">
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
    <z-select-v2 v-model="selectValue" size="md" placeholder="请选择">
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
    <z-select-v2 v-model="selectValue" size="xs" placeholder="请选择">
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
  </div>

  <div>
    <h2>Select V2 width</h2>
    <z-select-v2 v-model="selectValue" width="100%" placeholder="请选择">
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
    <z-select-v2
      v-model="selectMultipleValue"
      width="100%"
      multiple
      placeholder="请选择"
    >
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
  </div>

  <div>
    <h2>Select V2 自定义 slot 内容</h2>
    <z-select-v2 v-model="selectValue" width="100%" placeholder="请选择">
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      >
        <span>城市: {{ item.label }}</span>
      </z-option-v2>
    </z-select-v2>
  </div>

  <div>
    <h2>Select V2 多选multiple</h2>
    <z-select-v2 v-model="selectMultipleValue" placeholder="请选择" multiple>
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
  </div>

  <div>
    <h2>Select V2 多选multiple tag模式</h2>
    <z-select-v2
      v-model="selectMultipleValue"
      placeholder="请选择"
      size="lg"
      multiple
      selfSet
      tag
    >
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
    <z-select-v2
      v-model="selectMultipleValue"
      placeholder="请选择"
      multiple
      selfSet
      tag
    >
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
    <z-select-v2
      v-model="selectMultipleValue"
      placeholder="请选择"
      size="xs"
      multiple
      selfSet
      tag
    >
      <z-option-v2
        v-for="item in options"
        :label="item.label"
        :value="item.value"
        :key="item.value"
      ></z-option-v2>
    </z-select-v2>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectValue = ref("");
const selectMultipleValue = ref(["1"]);
const options = ref([
  {
    label: "重庆",
    icon: "icon-tingche1",
    value: "1",
  },
  {
    label: "上海",
    icon: "icon-tingche1",
    value: "2",
  },
  {
    label: "成都",
    icon: "icon-tingche1",
    value: "3",
  },
  {
    label: "广州",
    icon: "icon-tingche1",
    value: "4",
  },
]);
</script>
