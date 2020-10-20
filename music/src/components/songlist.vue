<template>
  <div>
    <mHeader></mHeader>
    <classify></classify>
    <div class="discList">
      <discSlider :data="disclist">
        <ul class="clearfixed">
          <li v-for="item in disclist" @click="discDetail(item.dissid)" :key="item.dissid">
            <div class="detail">
              <div class="imgbox">
                <img :src="item.cover" alt />
                <div class="playNum">
                  <span class="iconfont icon-bofang">播放量：</span>
                  {{item.listennum|playNum}}
                </div>
              </div>
              <div class="info">
                <div class="title">{{item.dissname}}</div>
              </div>
            </div>
          </li>
        </ul>
      </discSlider>
    </div>
  </div>
</template>
<script>
import mHeader from "./m-header.vue";
import classify from "./classify.vue";
import axios from "axios";
import discSlider from "./discSlider";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      disclist: [],
    };
  },
  filters: {
    playNum(val) {
      return parseInt(val / 10000) + "万";
    },
  },
  components: {
    mHeader,
    classify,
    discSlider,
  },
  methods: {
      ...mapMutations({
          setDesc: "SET_DISC",
      }),
      discDetail(id){
          this.setDesc(id);
          this.$router.push({
              name:'descDetail',
              params:{
                  id:id
              }
          })
      }
  },
  created() {
    axios({
      method: "Get",
      url: "http://127.0.0.1:9527/api/getDiscData",
    }).then((data) => {
      //   console.log(data);
      this.disclist = data.data[0].disclist;
    });
  },
};
</script>
<style lang="stylus" scoped>
.clearfixed {
  display: block;
  content: '';
  clear: both;
}

.discList {
  background-color: rgb(245, 245, 245);
  height 656px

  ul {
    overflow: hidden;
    justify-content: space-between;
    padding-top 30px
    li {
      width: 47%;
      float: left;
      margin-bottom: 20px;

      &:nth-child(2n) {
        margin-left: 23px;
      }

      height: 238px;
      padding: 5px 0;

      .detail {
        .imgbox {
          position: relative;

          img {
            width: 100%;
            height 186.78px
            vertical-align: bottom;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }

          .playNum {
            position: absolute;
            bottom: 0;
            color: #fff;
            width: 80%;
            background-color: rgba(0, 0, 0, 0.5);
            font-size: 16px;
            padding-left: 10px;
            padding-right: 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }

        .info {
          font-family: '宋';
          margin-top: 5px;
          line-height: 20px;
        }
      }
    }
  }

  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
}
</style>
