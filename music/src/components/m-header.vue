<template>
  <div>
    <div class="header">
      <div class="title" @click="backHome">
        <span class="iconfont icon-yuzhu"></span>
        <div class="name">玉竹mi</div>
      </div>
      <div class="search">
        <span class="iconfont icon-sousuo" @click="search"></span>
        <span class="iconfont icon-gengduo"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      isShow: "SET_SHOW",
      setModelIndex: "SET_MODELINDEX",
      setStatusIndex: "SET_STATUSINDEX",
    }),
    search() {
      this.$router.push("/search");
    },
    backHome() {
      this.isShow(true),
      this.setModelIndex(0)
      this.setStatusIndex(1)
      this.$router.push("/recommend");
    },
  },
};
</script>
<style lang="stylus" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 40px;
  background-color: #000;
  padding: 0 10px;

  .title {
    display: flex;
    color: #fff;
    font-size: 28px !important;
  }

  .iconfont {
    font-size: 28px;
    line-height: 40px;
  }

  .icon-sousuo {
    margin-right: 25px;
  }

  .name {
    font-family: 'YUZHU';
  }

  .search {
    color: #fff;
  }
}
</style>