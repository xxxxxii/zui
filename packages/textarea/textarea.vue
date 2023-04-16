<template>
  <div :class="zClass">
    <textarea
      :rows="rows"
      :value="modelValue"
      @input="input"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @focus="focus"
      @blur="blur"
    >
    </textarea>
    <div v-if="showWordCount" class="value-length-inline">
      <label>{{ wordCount }}{{ maxlength ? "/" : "" }}{{ maxlength }} </label>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "zTextarea",
};
</script>
<script setup lang="ts">
import { computed } from "vue";

const wordCount = computed(() => {
  return props.modelValue.length;
});

const emit = defineEmits(["update:modelValue", "focus", "blur"]);
const props = defineProps({
  modelValue: <any>{
    type: [String, Number],
    required: true, // 设置必传
  },
  rows: {
    type: Number,
    default: 2,
  },
  placeholder: {
    type: String,
    default: "Please Input",
  },
  showWordCount: {
    type: Boolean,
    default: false,
  },
  width: String,
  disabled: Boolean,
  readonly: Boolean,
  maxlength: Number,
});

const zClass = computed(() => {
  return {
    "z-textarea": true,
    "z-textarea-disabled": props.disabled,
    "z-textarea-word-count": props.showWordCount,
    "z-textarea-word-width": props.width,
  };
});

const input = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLTextAreaElement).value);
};

const focus = (e: Event) => {
  emit("focus", e);
};
const blur = (e: Event) => {
  emit("blur", e);
};
</script>

<style scoped lang="scss">
.z-textarea {
  display: inline-block;
  width: 100%;
  height: auto;
  overflow: hidden;
  textarea {
    outline: none;
    width: 100%;
    max-width: 100%;
    border-radius: 4px;
    padding: 5px;
    color: $color;
    font-size: 14px;
    font-family: auto;
    box-sizing: border-box;
    &:focus {
      border: 1px solid $primary;
    }
  }
  .value-length-inline {
    line-height: 20px;
    width: auto;
    display: inline-block;
    vertical-align: baseline;
    position: relative;
    box-sizing: border-box;
    font-size: 12px;
    color: $second-color;
    box-sizing: border-box;
    label {
      position: absolute;
      bottom: 0;
      right: 0;
      right: 10px;
    }
  }
}
.z-textarea-disabled {
  textarea {
    cursor: no-drop;
  }
}
.z-textarea-word-count {
  textarea {
    // padding-bottom: 0px;
  }
}
.z-textarea-word-width {
  textarea {
    width: v-bind(width);
  }
}
</style>
