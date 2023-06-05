import {
  inject,
  computed,
  onMounted,
  useSlots,
  defineComponent,
  ref,
  onBeforeUnmount,
  nextTick,
  onUnmounted,
} from "vue";
import { uuidv4 } from "../../utils";
import zInfiniteItem from "./infinite-scroll-item.vue";
import "./infinite.scss";

export default defineComponent({
  name: "z-infinite-scroll",
  props: ["listData", "num"],
  components: {
    zInfiniteItem,
  },

  setup(props, { slots }) {
    const tagId = "z-infinite-scroll-end-tag-" + uuidv4();

    const data = props.listData;
    const step = ref(props.num);
    const listData = ref(data.slice(0, props.num));
    // 设置观察器
    const observer = new IntersectionObserver(
      (entry) => {
        // 是出现在视口
        if (entry[0].isIntersecting) {
          console.log("enter");
          let start = step.value;
          step.value += props.num;
          listData.value.push(...data.slice(start, step.value));
        } else {
          console.log("leave");
        }
      },
      {
        threshold: 0.1,
      }
    );
    let itemDom = null;

    onMounted(() => {
      nextTick(() => {
        itemDom = document.querySelector("#" + tagId);
        itemDom && observer.observe(itemDom);
      });
    });
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
            <z-icon
              id={tagId}
              name="icon-Loading"
              class="loading-more"
            ></z-icon>
          </z-infinite-scroll-item>
        </div>
      </z-scrollbar>
    );
  },
});
