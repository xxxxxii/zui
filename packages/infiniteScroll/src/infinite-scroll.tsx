import {
  onMounted,
  defineComponent,
  ref,
  nextTick,
  onUnmounted,
  PropType,
  VNode,
} from "vue";
import { uuidv4 } from "../../utils";
import zInfiniteItem from "./infinite-scroll-item.vue";
import "./infinite.scss";

interface listDataObjDto {
  template: VNode;
}

export default defineComponent({
  name: "z-infinite-scroll",
  props: {
    listData: {
      type: Array as PropType<Array<listDataObjDto>>,
    },
    num: {
      type: Number,
    },
    doneText: {
      type: String,
      default: "已全部加载完...",
    },
    threshold: {
      type: Number,
      default: 0.1,
    },
  },
  components: {
    zInfiniteItem,
  },

  setup(props, { slots }) {
    const tagId = "z-infinite-scroll-end-tag-" + uuidv4();

    const status = ref("loading");
    const data = props.listData;
    const step = ref(props.num);
    const listData = ref(data.slice(0, props.num));
    // 设置观察器
    const observer = new IntersectionObserver(
      (entry) => {
        // 是否出现在视口
        if (entry[0].isIntersecting) {
          console.log("enter");
          let start = step.value;
          step.value += props.num;
          let addList = data.slice(start, step.value);
          if (addList.length === 0) {
            status.value = "done";
          }
          listData.value.push(...addList);
        } else {
          console.log("leave");
        }
      },
      {
        threshold: props.threshold,
      }
    );
    let itemDom = null;

    onMounted(() => {
      nextTick(() => {
        itemDom = document.querySelector("#" + tagId);
        itemDom && observer.observe(itemDom);
      });
    });
    // 组件卸载时 取消observer 监听
    onUnmounted(() => {
      observer.unobserve(itemDom);
    });

    return () => (
      <z-scrollbar>
        <div class="z-infinite-scroll ">
          {listData.value.map((item) => {
            return item.template;
          })}
          <z-infinite-scroll-item>
            {status.value === "loading" ? (
              <z-icon
                id={tagId}
                name="icon-Loading"
                class="loading-more"
              ></z-icon>
            ) : (
              <div>{props.doneText} </div>
            )}
          </z-infinite-scroll-item>
        </div>
      </z-scrollbar>
    );
  },
});
