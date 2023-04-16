import { createVNode, render } from "vue";
import type { App } from "vue";
import MessageBox from "./message.vue";

let seed = 0;
const instance = [];
const ZMessage = (options) => {
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }

  let topOffset = options.topOffset || 20;
  const container = document.createElement("div");

  // 计算当前元素距离顶部的偏移量
  instance.forEach((vm) => {
    topOffset += vm.el.offsetHeight + 10;
  });

  // 保存 id；这行代码是必要的，因为当关闭定时器触发的时候，seed 的值为最后一次增加的值，不保存直接用 seed 会出错
  options.id = "message-" + seed;

  let useClose = options.onClose;
  const vm = createVNode(MessageBox, {
    ...options,
    topOffset,
    // 组件销毁时触发的回调

    // 组件关闭时触发的回调
    // 这个回调用于显示组件的移出动画，和 onDestroy 不冲突
    onClose() {
      close(options.id, topOffset);
      useClose?.();
    },
  });

  vm.props.onDestroy = () => {
    console.log("onDestroy");
    render(null, container);
    container.remove();
  };
  // 渲染组件到 container 上
  render(vm, container);
  // 添加 container 到 body
  document.body.appendChild(container);
  // 保存组件实例，销毁时会用到
  instance.push(vm);

  seed++;
};

const close = (id, topOffset) => {
  const idx = instance.findIndex((vm) => vm.props.id === id);

  if (idx === -1) {
    return;
  }

  const vm = instance[idx];
  const removedHeight = vm.el.offsetHeight;
  console.log(removedHeight);
  instance.splice(idx, 1);

  for (let i = idx; i < instance.length; i++) {
    // 直接赋值组件的 top 为减去移除组件后的高度
    const pos = parseInt(instance[i].el.style["top"]) - removedHeight - 10;
    // topOffset = topOffset - removedHeight - 16 同理
    instance[i].component.props.topOffset = pos;
  }
};

(ZMessage as any).install = (app: App) => {
  app.config.globalProperties.$message = ZMessage;
};

export default ZMessage;
