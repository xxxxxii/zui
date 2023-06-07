import { Directive, ref } from "vue";

export default {
  install(app: any) {
    defaneDrag(app);
  },
};

function eventHandle(el, { parentPos, dragDom, isDrag }) {
  // 获取可移动元素的父节点
  let parentNode = el.parentNode;

  // 设置父节点定位
  parentNode.style.position = parentPos || "relative";
  el.style.position = "absolute";

  let dragArea = dragDom ? el.querySelector(dragDom) : el;

  if (!isDrag) {
    dragArea.onmouseover = null;
    dragArea.onmousedown = null;
    return;
  }

  // 设置鼠标hover效果:移动上前去显示可移动的提示效果，并且禁用页面可选择，离开恢复正常
  dragArea.onmouseover = () => {
    el.style.cursor = "move";
  };
  dragArea.onmouseout = () => {
    el.style.cursor = "default";
  };
  // 防止选中移动块上的文字等
  parentNode.onmouseover = () => {
    document.onselectstart = () => {
      return false;
    };
  };
  parentNode.onmouseout = () => {
    document.onselectstart = () => {
      return true;
    };
  };

  dragArea.onmousedown = (event: any) => {
    //event的兼容,同时得到clientX,的值
    var event = event || window.event;
    console.log(event.clientX, el.offsetLeft);
    let x = event.clientX - el.offsetLeft;
    let y = event.clientY - el.offsetTop; //得到小段的偏移
    // 将移动事件绑定到 document 上，防止拖动过快脱离开
    document.onmousemove = (event: any) => {
      let xx = event.clientX - x; //当移动的时候，用它的鼠标值减去偏移量
      let yy = event.clientY - y;
      if (xx <= 0) {
        //判定边界值 0，就在最边上了,
        xx = 0;
      }
      if (xx >= parentNode.offsetWidth - el.offsetWidth) {
        //大于整个盒子的宽度-小盒子的宽度
        xx = parentNode.offsetWidth - el.offsetWidth;
      }
      if (yy <= 0) {
        yy = 0;
      }
      if (yy >= parentNode.offsetHeight - el.offsetHeight) {
        yy = parentNode.offsetHeight - el.offsetHeight;
      }

      el.style.left = xx + "px";
      el.style.top = yy + "px";
    };
    dragArea.onmouseup = () => {
      // 取消事件
      document.onmousemove = null;
      el.onmouseup = null;
    };
  };
}

const _binding: any = ref({});

export const Drag = {
  mounted(el, binding) {
    _binding.value = binding.value;
    const { parentPos, dragDom, isDrag } = _binding.value
      ? _binding.value
      : { parentPos: "relative", dragDom: null, isDrag: true };

    eventHandle(el, { parentPos, dragDom, isDrag });
  },
  beforeUpdate(el, binding) {
    _binding.value = binding.value;

    const { parentPos, dragDom, isDrag } = _binding.value
      ? _binding.value
      : { parentPos: "relative", dragDom: null, isDrag: true };
    eventHandle(el, { parentPos, dragDom, isDrag });
  },
  beforeUnmount() {
    _binding.value = null;
  },
};

const defaneDrag = (app: {
  directive: (
    arg0: string,
    arg1: { mounted(el: any, binding: any): void }
  ) => void;
}) => {
  app.directive("drag", Drag);
};
