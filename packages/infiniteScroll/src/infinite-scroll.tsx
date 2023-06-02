import {
  defineComponent,
  ref,
  reactive,
  render,
  h,
  VNode,
  markRaw,
  toRefs,
  shallowRef,
} from "vue";
import { inject, computed, onMounted, useSlots } from "vue";
import { uuidv4 } from "../../utils";
import zInfiniteItem from "./infinite-scroll-item.vue";
import "./infinite.scss";

export default defineComponent({
  name: "z-infinite-scroll",
  inheritAttrs: false,

  components: {
    zInfiniteItem,
  },

  setup(props, { slots }) {
    const tagId = "z-infinite-scroll-end-tag-" + uuidv4();

    const allData = slots.default()[0].children;

    const listData: any = ref(shallowRef(allData.slice().splice(0, 10)));
    //  ref(
    //   markRaw((allData as Array<any>).slice().splice(0, 5))
    // );
    // listData.value.push(...(allData as Array<any>).slice().splice(5, 20));
    console.log(listData);
    // 设置观察器
    const observer = new IntersectionObserver(
      (entry) => {
        // 是出现在视口
        if (entry[0].isIntersecting) {
          console.log(listData.value);
          console.log("enter");

          listData.value.push(shallowRef(allData.slice().splice(10, 20)));
        } else {
        }
      },
      {
        threshold: 0.1,
      }
    );

    onMounted(() => {
      let itemDom = document.querySelector("#" + tagId);
      observer.observe(itemDom);
    });

    return () => (
      <div class="z-infinite-scroll">
        {listData.value.map((item) => {
          return h(item);
        })}

        <z-infinite-scroll-item>
          <z-icon id={tagId} name="icon-Loading" class="loading-more"></z-icon>
        </z-infinite-scroll-item>
      </div>
    );
  },
});
