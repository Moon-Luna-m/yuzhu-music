<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  //以下都是一些基本的组件配置信息
  props: {
    probeType: { type: Number, default: 2 },
    click: { type: Boolean, default: true },
    listenScroll: { type: Boolean, default: false },
    data: { type: Array, default: null },
    pullup: { type: Boolean, default: false },
    beforeScroll: { type: Boolean, default: false },
    refreshDelay: { type: Number, default: 20 },
  },
  mounted() {
    setTimeout(() => {
      //隔一段时间启动渲染
      this._initScroll();
    }, 100);
  },
  methods: {
    _initScroll() {
      //初始化
      if (!this.$refs.wrapper) {
        //没有值直接return
        return;
      }
      //注意插槽slot里的高度一定要大于wrapper的高度
      //console.log(this.$refs.wrapper.childNodes[0].clientHeight,this.$refs.wrapper.clientHeight);
      this.scroll = new BScroll(this.$refs.wrapper, {
        //创建一个实例
        probeType: this.probeType,
        click: this.click,
        scrollX: true,
      });
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", (pos) => {
          me.$emit("scroll", pos);
        });
      }
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      //重新计算高度
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
  },
  watch: {
    //监听数据变化
    data() {
      //数据变化之后，重新设置scroll高度，延迟设置
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    },
  },
};
</script>
<style lang="stylus" scoped>
</style>