<template>
  <div class="z-progress-main">
    <div class="z-progress-box" v-if="!round">
      <div
        class="z-progress"
        :style="{
          borderRadius: brdRs + 'px',
          height: height + 'px',
        }"
      >
        <div
          class="z-progress-bar"
          :class="barClass"
          :style="{
            width: dept + '%',
            color: textColor,
          }"
        >
          <div
            class="z-progress-bar_inner"
            v-if="textInside"
            :class="{ 'hidden-txt': !showTxt }"
          >
            <div class="z-progress-bar_innerText">
              <span> {{ text }}</span>
            </div>
          </div>
        </div>
      </div>
      <span
        v-if="!textInside"
        class="bar-text"
        :class="{ 'hidden-txt': !showTxt }"
        >{{ text }}</span
      >
    </div>
    <div v-else class="z-progress-round">
      <svg
        :width="radius * 2 + 10 + 'px'"
        :height="radius * 2 + 10 + 'px'"
        class="z-progress-circle"
      >
        <circle
          class="z-progress-circle--bg"
          :r="radius"
          :cy="radius + 5"
          :cx="radius + 5"
          stroke-width="8"
          stroke-linejoin="round"
          stroke-linecap="round"
          fill="none"
        />
        <circle
          class="progress"
          :class="roundBg"
          :r="radius"
          :cy="radius + 5"
          :cx="radius + 5"
          stroke-width="8"
          stroke-linejoin="round"
          stroke-linecap="round"
          fill="none"
          :stroke-dashoffset="roundDept"
          :stroke-dasharray="progressNoun"
        />
      </svg>
      <span class="z-progress-round_inner" v-if="showTxt">
        <span class="z-progress-round_innerText">{{ text }}</span></span
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "zProgress",
};
function testColor(str) {
  console.log(str);
  const reg = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$");
  return reg.test(str);
}
</script>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  // 背景颜色
  bg: {
    type: String,
    // validator: (value) => {
    //   return testColor(value);
    // },
  },
  // 文本颜色
  textColor: {
    type: String,
    // validator: (value) => {
    //   return testColor(value);
    // },
    default: "#fff",
  },
  showTxt: Boolean, //是否展示文本
  textInside: Boolean, // 显示文本在进度条上
  stripe: Boolean, // 是否需要斑马纹
  dynamic: Boolean, // 是否运动
  // 圆角大小
  brdRs: {
    type: Number,
    validator: (value) => {
      return value >= 0 && value <= 20;
    },
    default: 4,
  },
  text: String, // 文本内容
  // 进度条的深度
  dept: {
    type: Number,
    validator: (value) => value >= 0 && value <= 100,
    default: 50,
  },
  // 进度条的高度
  height: {
    type: Number,
    default: 10,
  },
  radius: {
    type: Number,
    default: 50,
  },
  type: {
    type: String,
    default: "primary",
  },
  round: {
    type: Boolean,
  },
});

const barClass = computed(() => {
  return [
    props.stripe ? "z-progress-bar-striped" : "",
    props.dynamic ? "z-progress-bar-active" : "",
    `z-progress-bar--${props.type}`,
    props.bg ? "z-progress-bar-self--bg" : "",
  ];
});

const progressNoun: any = computed(() => {
  return 2 * Math.PI * props.radius;
});

const roundDept = computed(() => {
  return progressNoun.value - progressNoun.value * (props.dept / 100);
});

const roundBg = computed(() => {
  return [`z-progress-round-bar--${props.type}`];
});
</script>

<style lang="scss" scoped>
.z-progress-box {
  display: flex;
  font-size: 10px;
  align-items: center;
  .bar-text {
    width: 32px;
  }
}

html.dark {
  .z-progress {
    background-color: $comp-dark-bg;
  }
  .z-progress-circle {
    .z-progress-circle--bg {
      stroke: $comp-dark-bg;
    }
  }
}
.z-progress {
  width: 100%;
  height: 20px;
  //   margin-bottom: 20px;
  overflow: hidden;
  background-color: $comp-light-bg;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);

  .z-progress-bar--primary {
    background-color: $primary;
  }
  .z-progress-bar--success {
    background-color: $success;
  }
  .z-progress-bar--info {
    background-color: $info;
  }

  .z-progress-bar--danger {
    background-color: $danger;
  }
  .z-progress-bar--warning {
    background-color: $warning;
  }

  .z-progress-bar-self--bg {
    background-color: v-bind(bg);
  }
  &-bar {
    float: left;
    width: 0;
    height: 100%;
    font-size: 10px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
    // -webkit-transition: width 0.6s ease;
    // -o-transition: width 0.6s ease;
    // transition: width 0.6s linear;
    position: relative;

    &-striped {
      background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-image: -o-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      -webkit-background-size: 40px 40px;
      background-size: 40px 40px;
    }

    &-active {
      -webkit-animation: progress-bar-stripes 2s linear infinite;
      -o-animation: progress-bar-stripes 2s linear infinite;
      animation: progress-bar-stripes 2s linear infinite;
    }
    .z-progress-bar_inner {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      text-align: right;
      border-radius: 100px;
      line-height: 1;
      white-space: nowrap;
      transition: width 0.6s ease;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .z-progress-bar_innerText {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: 12px;
        margin: 0 5px;
      }
      span {
        height: fit-content;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 12px;
        margin: 0 5px;
      }
    }
  }
}
.hidden-txt {
  display: none;
}
// WebKit
@-webkit-keyframes progress-bar-stripes {
  from {
    background-position: -40px 0;
  }
  to {
    background-position: 0 0;
  }
}

@keyframes progress-bar-stripes {
  from {
    background-position: -40px 0;
  }
  to {
    background-position: 0 0;
  }
}

// circle
.z-progress-main {
  width: auto;
}
.z-progress-round {
  width: fit-content;
  box-sizing: border-box;
  position: relative;
  &_inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.z-progress-circle {
  transform: rotate(-90deg);
  .progress {
    stroke: $primary;
    transition: stroke-dashoffset 0.6s linear;
  }

  .z-progress-circle--bg {
    stroke: $comp-light-bg;
  }
  .z-progress-round-bar--primary {
    stroke: $primary;
  }
  .z-progress-round-bar--info {
    stroke: $info;
  }
  .z-progress-round-bar--success {
    stroke: $success;
  }
  .z-progress-round-bar--primary {
    stroke: $primary;
  }

  .z-progress-round-bar--danger {
    stroke: $danger;
  }
  .z-progress-round-bar--warning {
    stroke: $warning;
  }
}
</style>
