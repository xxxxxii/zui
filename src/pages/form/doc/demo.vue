<template>
  <!-- <div class="form">
    <z-form-item label="itemName" :rules="rules"> 
      <template #label> 用户名 </template>
      <z-input size="xs" />
    </z-form-item>
  </div> -->

  <div class="form">
    <z-form ref="formRef" :model="model" :rules="formRules" label-width="100px">
      <z-form-item label="username" :rules="rules" prop="username">
        <template #label> 用户名 </template>
        <z-input v-model="model.username" clearable />
      </z-form-item>

      <z-form-item label="password" :rules="passwordRules" prop="password">
        <template #label> 密码 </template>
        <z-input v-model="model.password" />
      </z-form-item>

      <z-form-item
        label="年龄"
        :rules="[
          {
            required: true,
            message: '请输入',
          },
        ]"
        prop="age"
      >
        <z-input v-model.number="model.age" type="number" />
      </z-form-item>

      <z-form-item
        label="兴趣"
        prop="interests"
        :rules="[
          {
            required: true,
            message: '请输入',
          },
        ]"
      >
        <z-checkbox-group v-model="model.interests">
          <z-checkbox value="1" label="篮球"></z-checkbox>
          <z-checkbox value="2" label="唱歌"></z-checkbox>
          <z-checkbox value="3" label="跳舞"></z-checkbox>
          <z-checkbox value="4" label="Rap"></z-checkbox>
        </z-checkbox-group>
      </z-form-item>

      <z-form-item label="">
        <z-button @click="submit" type="primary"> submit</z-button>
      </z-form-item>
    </z-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ZMessage } from "v3-yl-ui";
import { FormProps, FormRules } from "../../../../packages/form/src/form";

const formRef = ref(null);

const model = ref({
  username: "",
  password: "",
  age: "",
  interests: [],
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    callback();
  }
};

const formRules = ref({
  username: [{ required: true, message: "请输入", trigger: "blur" }],
  age: [
    // {
    //   type: "enum",
    //   enum: ["admin", "user", "guest"],
    // },
    {
      type: "number",
      min: 1,
      max: 150,
      message: "请输入正确的年龄1~150",
    },
  ],
  // password: [{ validator: validatePass, trigger: "blur" }],
});

const rules = ref([
  {
    max: 12,
    min: 4,
    message: "请输入4-10位",
    trigger: ["blur", "change"],
  },
]);

const passwordRules = ref([
  // { required: true, message: "age is required" },
  // { type: "number", message: "this type number" },
  {
    required: true,
    type: "string",
    max: 12,
    min: 4,
    message: "请输入4-12位",
    trigger: ["blur", "change"],
  },
]);

const submit = () => {
  let form = formRef.value;
  form.validate((valid, errors) => {
    if (valid) {
      console.log(model.value);
      ZMessage({
        type: "success",
        message: "validate success",
        duration: 2000,
        topOffset: 10,
        center: true,
        onClose: () => {
          console.log("消息提示关闭");
        },
      });
    }
    console.log(valid, errors);
  });
};
</script>
<style>
.form {
  width: 100%;
}
</style>
