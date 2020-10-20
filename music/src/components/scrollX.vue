<template>
  <div ref="wrapper">
    <div ref="wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  methods: {
    verScroll() {
      let width =
        (this.$refs.wrap.childNodes[0].children.length - 1) * 121 + 100; // 动态计算出滚动区域的大小
      this.$refs.wrap.style.width = width + "px"; // 修改滚动区域的宽度
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0,
            // click: true,
            // tap:"set_cart,changeMastDisplay",
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical",
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        let timer = setTimeout(() => {
          if (timer) {
            clearTimeout(timer);
            this.verScroll();
          }
        }, 0);
      });
    }, 100);
  },
};
</script>