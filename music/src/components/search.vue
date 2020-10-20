<template>
  <div class="header">
    <div class="search">
      <div class="searchbox">
        <input type="text" v-model="value" />
        <span class="iconfont icon-sousuo" @click="search"></span>
      </div>
      <div class="more">
        <span @click="link">取消</span>
        <span class="iconfont icon-gengduo"></span>
      </div>
    </div>
    <searchMsg v-show="show" :name="value"></searchMsg>
  </div>
</template>
<script>
import searchMsg from "./singer";
export default {
  data() {
    return {
      value: "",
      show: false,
    };
  },
  computed: {
    hide(){
      if (this.value == "") {
        return false
      }
    }
  },
  methods: {
    link() {
      this.$router.push("/recommend");
    },
    search() {
      if (this.value != "") {
        this.show = true;
        return;
      }
    },
  },
  components: {
    searchMsg,
  },
  watch: {
    value(){
      if (this.value == "") {
        this.show = false;
      }
    }
  },
};
</script>
<style scoped lang="stylus">
@import url('../common/fonts/demo.css');
@import url('../common/fonts/iconfont.css');

.header {
  .search {
    height: 40px;
    background-color: #000;
    padding: 5px 10px;
    display: flex;
    box-sizing: border-box;

    .searchbox {
      position: relative;
      width: 70%;
      height: 100%;

      input {
        width: 100%;
        line-height: 2;
        outline: none;
        border-radius: 1px;
        border: none;
        text-indent: 2em;
      }

      .iconfont {
        position: absolute;
        top: 3px;
        left: 4px;
        font-size: 18px;
        color: #ccc;
      }
    }

    .more {
      width: 30%;
      color: #fff;
      display: flex;
      box-sizing: border-box;
      padding-left: 25px;
      justify-content: space-between;

      span {
        // width 30px
        display: inline-block;
        line-height: 1.8;
      }

      .iconfont {
        // margin-left 35px
        font-size: 28px;
        line-height: 1.1;
      }
    }
  }
}
</style>