<template>
  <div id="app">
    <!--keepAlive 使得路由之间的跳转不会重复发送请求-->
    <keep-alive exclude="descDetail,singer,descPlay,rankSong,rank,singer">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import songPlay from "./components/descPlay";
export default {
  name: "App",
  components: {
    songPlay,
  }
};
</script>
<style lang="stylus">
#app {
  width: 414px;
  margin: 0 auto;

  .miniPlay {
    width 414px
    position: fixed;
    display: flex;
    bottom: 0;
    height: 50px;
    background: #000;
    z-index: 100;
    color: #fff;

    .pic {
      box-sizing: border-box;
      padding: 10px 18px;

      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }

    .songMsg {
      display: flex;
      overflow: hidden;

      .details {
        width: 140px;
        margin-left: 20px;
        overflow: hidden;

        .content {
          display: flex;
          text-align: center;
          max-width: 140px;
          overflow: hidden;
          font-size: 12px;
          line-height: 50px;
        }
      }

      .btnlist {
        display: flex;
        justify-content: space-between;
        margin-left: 30px;
        width: 100px;
        overflow: hidden;
        line-height: 50px;

        .iconfont {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
