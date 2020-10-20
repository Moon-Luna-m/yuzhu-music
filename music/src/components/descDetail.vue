<template>
  <div>
    <mHeader v-show="this.$store.state.show"></mHeader>
    <keep-alive exclude="descPlay">
      <router-view></router-view>
    </keep-alive>
    <sliderY :data="songlist" v-show="this.$store.state.show">
      <div id="wrap">
        <loading class="load" v-show="cover==''"></loading>
        <div class="img_b" v-show="cover!=''" v-if="coverImg">
          <div class="cover">
            <img :src="cover" alt />
          </div>
          <div class="title">
            <div class="icon">
              <span class="iconfont icon-yinle3"></span>
              <p>用心去感受音乐的律动,遇见美好</p>
            </div>
            <h5>{{title}}</h5>
          </div>
        </div>
        <div class="wrap2">
          <div class="img_s" v-show="cover!=''" v-if="coverImg2">
            <div class="cover2">
              <img :src="cover" alt />
            </div>
            <div class="title">
              <div class="icon">
                <span class="iconfont icon-yinle3"></span>
                <p>用心去感受音乐的律动,遇见美好</p>
              </div>
              <h5>{{title}}</h5>
            </div>
          </div>
        </div>
        <div class="songlist">
          <ul>
            <li
              v-for="(item, index) in songlist"
              :key="item.mid"
              @click="link(item.mid,item.singer,index,item.singerMid)"
            >
              <div class="wrap">
                <span class="num">{{index+1}}</span>
                <div class="songDetails">
                  <h3 class="songName">{{item.name}}</h3>
                  <p class="singer">
                    <span :singerName="singerName">{{item.singer}}</span>
                  </p>
                </div>
                <div>
                  <span class="icon-arrow-backimg iconfont"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </sliderY>
  </div>
</template>

<script>
import mHeader from "./m-header.vue";
import loading from "./loading";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import sliderY from "./sliderY";
import axios from "axios";
export default {
  name: "descDetail",
  data() {
    return {
      cover: "",
      id: "",
      songlist: [],
      tag: [],
      title: [],
      singerMid: "",
    };
  },
  computed: {
    singerName() {
      this.songlist.forEach((song, index) => {
        let str = ``;
        song.singer.forEach((singer) => {
          if (song.singer.length > 1) {
            str += `${singer.name}/`;
            this.songlist[index].singer = str.substring(0, str.length - 1);
          } else {
            this.songlist[index].singer = singer.name;
          }
          this.songlist[index].singerMid = singer.mid;
        });
      });
    },
    coverImg() {
      if (this.cover.includes("600")) {
        return true;
      }
      return false;
    },
    coverImg2() {
      if (this.cover.includes("300")) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapGetters(["desc", "show", "statusIndex"]),
    ...mapMutations({
      isShow: "SET_SHOW",
      setSonglist: "SET_SONGLIST",
      setSongIndex: "SET_SONGINDEX",
      setCurrentSong: "SET_CURRENTSONG",
    }),
    link(val, singer, index, sMid) {
      this.isShow(false);
      this.setSonglist(this.songlist);
      this.setSongIndex(index);
      let ind = 0
      if (this.statusIndex() == 1) {
        this.$router.push({
          name: "playSong",
          params: {
            mid: val,
            singerName: singer,
            singerMind: sMid,
          },
        });
      } else {
        console.log(`这是第${++ind}次点击`);
        setTimeout(()=>{
          this.setCurrentSong(val);
        },150)
      }
    },
  },
  components: {
    mHeader,
    loading,
    sliderY,
  },
  created() {
    if (this.$route.name == "descDetail") {
      this.isShow(true);
    }
    axios({
      method: "GET",
      url: `http://127.0.0.1:9527/api/setRecommendDetails/${this.$store.state.desc}`,
    }).then((res) => {
      // console.log(res);
      if (res.data[0] != undefined) {
        this.cover = res.data[0].cover;
        this.id = res.data[0].id;
        this.songlist = res.data[0].songlist;
        this.tag = res.data[0].tag;
        this.title = res.data[0].title;
      } else {
        this.cover = res.data.cover;
        this.id = res.data.id;
        this.songlist = res.data.songlist;
        this.tag = res.data.tag;
        this.title = res.data.title;
      }
    });
  },
  mounted() {
    if (typeof this.$store.state.desc != "string") {
      this.$router.push("/recommend");
    }
  },
};
</script>
<style lang="stylus" scoped>
#wrap {
  position: relative;
  z-index: -10;
  width: 414px;
}

.load {
  margin-top: 30px;
}

.img_b {
  .cover {
    width: 414px;
    height: 237px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .title {
    width: 90%;
    position: relative;
    margin: 0 auto;
    margin-top: -25px;
    text-align: center;
    height: 80px;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: 0px 2px 5px #ebebeb;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    h5 {
      color: #999696;
      margin-top: -20px;
    }

    .icon {
      display: flex;
      position: relative;

      .iconfont {
        font-size: 46px;
        display: inline-block;
        margin-bottom: 8px;
        margin-top: 12px;
        color: #727793;
      }

      p {
        color: #999696;
        margin-top: 15px;
        margin-left: 15px;
      }
    }

    .songName {
      position: absolute;
      color: #999696;
      padding: 4px 16px;
      right: 115px;
      top: 46px;
    }
  }

  margin-bottom: 26px;
}

.img_s {
  .cover2 {
    width: 210px;
    height: 210px;
    margin: 40px auto 30px;
    padding-top: 50px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
      object-fit: cover;
      box-shadow: 8px 8px 8px #c2c2c2;
    }
  }

  .title {
    width: 90%;
    position: relative;
    margin: 0 auto;
    text-align: center;
    height: 80px;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: 2px 2px 5px #ebebeb;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    h5 {
      width: 70%;
      margin 0 auto
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      color: #999696;
      margin-top: -20px;
    }

    .icon {
      display: flex;
      position: relative;

      .iconfont {
        font-size: 46px;
        display: inline-block;
        margin-bottom: 8px;
        margin-top: 12px;
        color: #727793;
      }

      p {
        color: #999696;
        margin-top: 15px;
        margin-left: 15px;
      }
    }

    .songName {
      position: absolute;
      color: #999696;
      padding: 4px 16px;
      right: 115px;
      top: 46px;
    }
  }

  margin-bottom: 26px;
}

.songlist {
  ul {
    li {
      width: 100%;
      height: 62px;
      box-sizing: border-box;
      padding: 10px 16px;

      .wrap {
        display: flex;
        position: relative;
        box-shadow: 0px 1px 1px #ebebeb;
        box-sizing: border-box;
        margin-right: 18px;

        .num {
          font-size: 20px;
          margin-right: 8px;
          margin-top: 5px;
          color: #999;
        }

        .songDetails {
          width: 100%;

          h3 {
            display: block;
            max-width: 70%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 16px;
            color: #000;
          }

          .singer {
            max-width: 70%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-bottom: 3px;
            color: #777;
            font-size: 12px;
          }
        }

        .icon-arrow-backimg {
          position: absolute;
          right: 16px;
          color: #999;
          top: 8px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>