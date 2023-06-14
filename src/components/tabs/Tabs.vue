<template>
  <div class="gnip-tab">
    <div class="gnip-tab-nav">
      <div
        v-for="(item, index) in tabNavList"
        @click.stop="handleTabNavClick(item, index)"
        :class="['tab-nav-item', item.name == activeName ? 'active' : '']"
        ref="tabNavItemRefs"
        @drop="handleDrop(item, $event, index)"
        @dragstart="handelDragstart(item, $event, index)"
        @dragover="handleDragOver(item, $event)"
        draggable="true"
        :key="index"
      >
        <span v-if="item.text">{{ item.text }}</span>
        <render v-if="item.renderFun" :renderFn="item.renderFun"></render>
      </div>
    </div>
    <!-- 滚动滑块 -->
    <div
      class="tab-nav-track"
      :style="{
        background: showTrackBg ? '#e5e7eb' : '',
      }"
    >
      <span
        class="track-line"
        :style="{ width: trackLineWidht + 'px', left: left + 'px' }"
      ></span>
    </div>
    <div class="tab-content-wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
// render组件，label为render函数的时候进行渲染
import Render from "./render";
export default {
  props: {
    // v-model的那项
    value: {
      type: String,
    },
    // 是否显示滑块背景
    showTrackBg: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Render,
  },
  data() {
    return {
      // tab数组
      tabNavList: [],
      // 当前活跃项
      activeName: "",
      // 滑块的宽度
      trackLineWidht: 0,
      // 当前活跃索引
      currentIndex: 0,
      // 滑块偏移量
      left: 0,
      // 拖拽开始的哪项
      dragOriginItemIndex: null,
      // 拖拽活跃项的索引
      dragStartIndex: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      // 默认当前活跃项为外部v-model的值
      this.activeName = this.value;
      // 页面渲染任务之后计算滑块偏移量和宽度
      this.$nextTick(() => {
        this.currentIndex = this.$children.findIndex(
          (component) => component.name == this.value
        );
        this.computedTrackWidth();
      });
    },
    // 设置tab点击栏
    setTabBar(tabsPaneInstance) {
      console.log(tabsPaneInstance);
      // tab的描述信息可以是字符串也可以是render函数
      const label = tabsPaneInstance.label,
        type = typeof label;
      // 添加到数组项中，根据添加条件渲染
      this.tabNavList.push({
        text: type == "function" ? "" : label,
        renderFun: type == "function" ? label : "",
        name: tabsPaneInstance.name,
      });
    },
    handleTabNavClick(item, index) {
      if (item.name == this.activeName) return;
      // 更新当前活跃项
      this.activeName = item.name;
      // 活跃项的索引
      this.currentIndex = index;
      // 计算滑块的偏移量和宽度
      this.computedTrackWidth();
    },
    // 计算滑块的偏移量和宽度
    computedTrackWidth() {
      // 插槽子组件的索引集合
      const tabNavItemRefsList = this.$refs.tabNavItemRefs;
      // 导航tab项的宽度
      const scrollWidth = tabNavItemRefsList[this.currentIndex].scrollWidth;
      // 滑块的宽度为scrollWidth
      this.trackLineWidht = scrollWidth;
      // 定位的偏移量为offsetLeft
      this.left = tabNavItemRefsList[this.currentIndex].offsetLeft;
    },
    /* 
      关于拖拽请参考MDN文档： https://developer.mozilla.org/zh-CN/docs/Web/API/DragEvent，实现拖拽需要清楚关于拖拽相关的几个事件
      */
    // 开始拖拽
    handelDragstart(item, event, index) {
      // 说明是拖拽的当前活跃的哪一项，记录这一项的索引位置
      if (item.name == this.activeName) {
        this.dragStartIndex = index;
      }
      this.dragOriginItemIndex = index;
    },
    // 推拽进入目标区域
    handleDragOver(item, event) {
      // 阻止默认事件
      event.preventDefault();
    },
    //拖拽进入有效item
    handleDrop(item, event, index) {
      event.preventDefault();
      // 说明拖动的位置是变了的
      if (this.dragOriginItemIndex != index) {
        // 交换数据，重新渲染生成tab栏
        this.swap(this.dragOriginItemIndex, index);
        // 重新计算滑块的偏移量
        if (this.dragStartIndex !== null) {
          this.currentIndex = index;
          // 记住，数据更新为异步操作，因此我们这里需要用到nextTick，将计算任务放到渲染任务完成之后执行，避免计算不准确
          this.$nextTick(() => {
            this.computedTrackWidth();
            this.dragStartIndex = null;
          });
        } else {
          // 不是点击拖拽当前活跃项，也要重新计算滑块跨度和位置，因为每个tab项的宽度不一致，因此，每次拖拽都需要重新计算
          this.$nextTick(() => {
            this.computedTrackWidth();
          });
        }
        // 这里还可以根据需要，发布一个拖拽完成事件
      }
    },
    // 交换tab数据项
    swap(start, end) {
      let startItem = this.tabNavList[start];
      let endItem = this.tabNavList[end];
      // 由于直接通过索引修改数组，无法触发响应式，因此需要$set
      this.$set(this.tabNavList, start, endItem);
      this.$set(this.tabNavList, end, startItem);
    },
  },
};
</script>
<style lang="scss">
.gnip-tab {
  .gnip-tab-nav {
    display: flex;
    position: relative;
    .tab-nav-item {
      padding: 0 20px;
      cursor: pointer;
      line-height: 2;
    }
  }
  .tab-nav-item.active {
    color: #2d8cf0;
  }
  .tab-nav-track {
    width: 100%;
    position: relative;
    height: 2px;
    .track-line {
      height: 2px;
      background-color: #2d8cf0;
      position: absolute;
      transition: left 0.35s;
    }
  }
}
</style>
