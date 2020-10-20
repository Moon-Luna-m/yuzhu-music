<template>
  <div class="wrapper" ref="wrapper">
    <div class="wrap" ref="wrap">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    data: { type: Array, default: null },
  },
  mounted() {
    setTimeout(() => {
      //隔一段时间启动渲染
      this._initScroll();
    }, 100);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        //没有值直接return
        return;
      }

      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        scrollX: false,
        probeType: 3,
        // click:true
      });
    },
    refresh() {
      //重新计算高度
      if (this.scroll != undefined) {
        this.scroll && this.scroll.refresh();
      }
    },
  },

  watch: {
    //监听数据变化
    data() {
      // console.log(this.$refs.wrapper.clientHeight);
      //数据变化之后，重新设置scroll高度，延迟设置
      setTimeout(() => {
        if (this.scroll != undefined) {
          this.scroll.refresh();
        }
        // console.log(this.scroll);
      }, 20);
    },
  },
};
</script>
<style lang="stylus" scoped>
.wrapper {
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 1;
  top: 40px;
  height: 696px;
}
</style>