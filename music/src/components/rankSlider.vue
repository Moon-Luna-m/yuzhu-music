<template>
  <div class="container" ref="wrapper">
    <div class="content" ref="wrap">
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
      this._initScroll();
    }, 100);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
     
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        scrollX: false,
        probeType: 3,
      });
    },
    refresh() {
      //重新计算高度
      this.scroll && this.scroll.refresh();
    },
  },

  watch: {
    //监听数据变化
    data() {
      setTimeout(() => {
        if (this.scroll!=undefined) {
          this.scroll.refresh();
        }
      }, 20);
    },
  },
};
</script>
<style lang="stylus" scoped>
.container {
  position: absolute;
  overflow: hidden;
  z-index: 100;
  top 80px
  height 655px
}
</style>