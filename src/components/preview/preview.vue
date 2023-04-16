<template>
  <div>
    <transition name="fade">
      <div>
        <div v-if="showCode">
          <md-editor v-model="code" :previewOnly="true" :theme="theme" />
        </div>
        <p class="show-code">
          <span class="show-code-btn" @click="showCode = !showCode">{{
            showCode ? "收起" : "显示代码"
          }}</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: "preView",
};
</script>
<script setup lang="ts">
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  compName: {
    type: String,
  },
  vueFName: {
    type: String,
  },
});

const theme = computed(() => {
  const htmlDom: HTMLElement = document.querySelector("html");
  if (htmlDom.className.indexOf("dark") > -1) {
    return "dark";
  } else {
    return "light";
  }
});

const showCode = ref(false);
const code = ref("");
async function getCode() {
  code.value = (
    await import(`../../pages/${props.compName}/doc/${props.vueFName}.vue?raw`)
  ).default;

  code.value = "```vue3\n" + code.value + "\n```";
  // console.log(code.value);
}
onMounted(() => {
  getCode();
});
</script>
<style scoped lang="scss">
.show-code {
  text-align: center;
}
.show-code-btn {
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: $primary;
  }
}

:deep(.default-theme pre) {
  background: $light-bg;
}
pre {
  margin: 0;
}
</style>
