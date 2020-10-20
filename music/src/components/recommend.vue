<template>
  <div class="wrap">
    <mHeader></mHeader>
    <classify></classify>
    <sliderY class="recommend" :data="images">
      <div>
        <div class="recommend-content">
          <div class="slider-wrapper">
            <slider>
              <div v-for="(item,index ) in images" v-bind:key="index">
                <a>
                  <img v-bind:src="item.imgSrc" alt />
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">
              <span class="iconfont icon-guanfang"></span>官方歌单
            </h1>
            <div class="more">
              更多
              <span class="iconfont">&#xe601;</span>
            </div>
            <div class="coursel">
              <slider-x>
                <ul>
                  <li
                    v-for="item in disclist1"
                    class="disclist"
                    :key="item.id"
                    @click="selectDesc(item.id)"
                  >
                    <img :src="item.cover" alt />
                    <span class="play">
                      <i class="iconfont icon-bofang"></i>
                      {{item.cnt|manage}}
                    </span>
                    <p>{{item.title}}</p>
                  </li>
                </ul>
              </slider-x>
            </div>
          </div>
          <div class="recommend-list">
            <h1 class="list-title list-title2">
              <span class="iconfont icon-daren"></span>达人歌单
            </h1>
            <div class="more">
              更多
              <span class="iconfont">&#xe601;</span>
            </div>
            <div class="coursel coursel2">
              <slideTwo>
                <ul>
                  <li
                    v-for="item in disclist2"
                    class="disclist"
                    :key="item.id"
                    @click="selectDesc(item.id)"
                  >
                    <img :src="item.cover" alt />
                    <span class="play">
                      <i class="iconfont icon-bofang"></i>
                      {{item.cnt|manage}}
                    </span>
                    <p>{{item.title}}</p>
                  </li>
                </ul>
              </slideTwo>
            </div>
          </div>
          <div class="footer">
            <div class="container">
              <img src="../common/images/pic.jpg" alt />
            </div>
            <div class="copyright">
              <span class="iconfont icon-icon111"></span>
              vue优化 :
              <a
                href="https://zh.nuxtjs.org/guide/"
              >https://zh.nuxtjs.org/guide/</a>
              <hr />
              <p>
                该网页仅供参考学习，不作商用
                <span>@copyright 练习自用</span>
              </p>
            </div>
          </div>
          <div class="load" v-show="!disclist2.length&&!disclist1.length">
            <loading></loading>
          </div>
          <div class="loading" v-show="!disclist2.length&&!disclist1.length">
            <loading></loading>
          </div>
        </div>
      </div>
    </sliderY>
  </div>
</template>
<script>
import mHeader from "./m-header.vue";
import axios from "axios";
import slider from "./slider";
import sliderX from "./scrollX";
import sliderY from "./scrollY";
import slideTwo from "./slidetwo";
import loading from "./loading";
import classify from "./classify.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  filters: {
    manage(val) {
      return parseFloat(val / 10000).toFixed(1) + "万";
    },
  },
  data() {
    return {
      images: [
        {
          imgSrc: require("../common/images/1.jpg"),
        },
        {
          imgSrc: require("../common/images/2.jpg"),
        },
        {
          imgSrc: require("../common/images/3.jpg"),
        },
        {
          imgSrc: require("../common/images/4.jpg"),
        },
      ],
      disclist1: [],
      disclist2: [],
    };
  },
  computed: {
    ...mapGetters(["desc"]),
  },
  methods: {
    ...mapMutations({
      setDesc: "SET_DISC",
    }),
    selectDesc(val) {
      // console.log(this.desc);
      this.setDesc(val);
      this.$router.push({
        name: "descDetail",
        params: {
          id: this.desc,
        },
      });
    }
  },
  components: {
    mHeader,
    slider,
    sliderX,
    sliderY,
    slideTwo,
    loading,
    classify,
  },
  beforeCreate() {
    //测试是否请求多次
    axios.get("http://127.0.0.1:9527/api/getRecommendData").then((res, rej) => {
      // console.log(res);
      res.data.forEach((item) => {
        item.classifyList.forEach((disc) => {
          disc.classify = item.classify;
          if (disc.classify == "官方歌单") {
            this.disclist1.push(disc);
          } else {
            this.disclist2.push(disc);
          }
        });
      });
    });
  },
};
</script>
<style lang="stylus" scoped>
.recommend {
  position: fixed;
  height 656px
  width: 100%;
  top: 80px;
  bottom: 0;
  z-index: -10;
  max-width: 414px;
  background-color: rgb(245, 245, 245);

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      padding-left: 24px;
      padding-right: 24px;
      position: relative;
      overflow: hidden;
      padding-bottom: 16px;
      background-color: rgb(245, 245, 245);

      .coursel {
        padding-right: 24px;
        overflow: hidden;

        ul {
          display: flex;
          width: 600px;

          .disclist {
            position: relative;
            overflow: hidden;
            margin-right: 28px;
            width: 100px;

            p {
              margin-top: 5px;
              font-size: 12px;
            }

            .play {
              .iconfont {
                font-size: 0.75rem;
                margin-right: 2px;
              }
              position: absolute;
              display: inline-block;
              background-color: rgba(0, 0, 0, 0.5);
              color: #fff;
              font-size: 12px;
              padding-left: 10px;
              padding-right: 10px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
              left: 1px;
              bottom: 21px;
              z-index: 10;
            }
            img {
              width: 100px;
              height: 100px;
              vertical-align: bottom;
              border-radius: 5px;
            }
          }
        }
      }

      .list-title {
        height: 65px;
        line-height: 65px;
        font-size: 16px;
        color: #000;
        font-family: '宋';

        .iconfont {
          color: #a29c9c;
          font-size: 20px;
          margin-right: 2px;
        }
      }

      .more {
        position: absolute;
        right: 24px;
        top: 25px;
        font-size: 14px;
        color: #a29c9c;
        font-weight: normal;
        font-family: '微软雅黑';

        .iconfont {
          margin-left: 5px;
        }
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: 16px;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: #000;
          }
        }
      }
    }

    .coursel2 {
      ul {
        width: 820px !important;
      }

      img {
        width: 100%;
      }

      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .footer {
      padding-top: 30px;
      padding-bottom: 20px;
      background-color: rgb(245, 245, 245);

      .container {
        height: 100px;
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;

        img {
          display: block;
          object-fit: cover;
          width: 100%;
        }
      }

      .copyright {
        font-size: 0.75rem;
        color: #7a7a7e;
        text-align: center;

        a {
          color: #7a7a7e;
        }

        .iconfont {
          display: inline-block;
          text-align: center;
          margin-top: 20px;
          margin-left: 20px;
          margin-right: 10px;
          font-size: 24px;
          color: #6d6c84;
        }

        p {
          font-size: 0.75rem;
          color: #7a7a7e;
          text-align: center;

          span {
            margin-left: 30px;
          }
        }
      }
    }

    .load {
      position: absolute;
      width: 100%;
      top: 49%;
      transform: translateY(-50%);
    }

    .loading {
      position: absolute;
      width: 100%;
      top: 36%;
      transform: translateY(-50%);
    }
  }
}
</style>