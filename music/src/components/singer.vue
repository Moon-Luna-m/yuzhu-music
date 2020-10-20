<template>
  <div>
    <mHeader v-show="hide" v-if="show"></mHeader>
    <div class="wrap" v-show="show">
      <div class="img" v-show="singername==undefined">
        <img :src="imgSrc" alt />
      </div>
      <div class="title" v-show="singername!=undefined">
        <div class="singer">
          <div class="name">{{singername}}</div>
          <div class="msg">
            <div class="songnum">歌曲：{{songnum}}</div>
            <div class="albumnum">专辑：{{albumnum}}</div>
          </div>
        </div>
      </div>
      <div class="songlist">
        <div class="title">歌曲列表:</div>
        <ul>
          <singerSlider>
            <li v-for="(item,index) in songlist" @click="paly(item.song_mid,index)" :key="index">
              <div class="songname">{{item.song_name}}</div>
              <div class="singer">{{singername}}</div>
            </li>
          </singerSlider>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import singerSlider from "./singerSlider";
import mHeader from "./m-header.vue";
import axios from "axios";
export default {
  name: "singer",
  props: ["name"],
  data() {
    return {
      singername: "",
      albumnum: 0,
      songnum: 0,
      imgSrc: require("../common/images/pic.jpg"),
      songlist: [],
      show: true,
    };
  },
  computed: {
    hide() {
      if (this.$route.name == "search") {
        return false;
      }
      return true;
    },
  },
  components: {
    mHeader,
    singerSlider,
  },
  methods: {
    paly(mid, index) {
      // console.log(mid);
      if (this.$route.name == "search") {
        this.$router.push({
          name: "playSearch",
          params: {
            mid: mid,
            singername: this.singername,
            songlist: this.songlist,
            index: index,
          },
        });
      } else if (this.$route.path == "/rankSong/singer") {
        this.show = false;
        this.$router.push({
          name: "play",
          params: {
            mid: mid,
            singername: this.singername,
          },
        });
      } else {
        this.$router.push({
          name: "playSong",
          params: {
            mid: mid,
            singername: this.singername,
          },
        });
      }
    },
  },
  created() {
    let singername = "";
    this.show=true
    if (this.$route.name != "search") {
      singername = this.$route.params.singerName;
    } else {
      return;
    }
    if (this.$route.params.singerName == undefined) {
      this.$router.push("/recommend");
    }
    axios({
      method: "POST",
      url: `http://127.0.0.1:9527/api/getSingerData`,
      data: {
        singername: singername,
      },
    }).then((data) => {
      // console.log(data);
      if (data.data[0]) {
        this.singername = data.data[0].singer_name;
        this.albumnum = data.data[0].album_num;
        this.songnum = data.data[0].song_num;
        this.songlist = data.data[0].songlist;
      } else {
        this.singername = data.data.singer_name;
        this.albumnum = data.data.album_num;
        this.songnum = data.data.song_num;
        this.songlist = data.data.songlist;
      }
    });
  },
  watch: {
    name() {
      axios({
        method: "POST",
        url: `http://127.0.0.1:9527/api/getSingerData`,
        data: {
          singername: this.name,
        },
      }).then((data) => {
        console.log(data);
        if (data.data[0]) {
          this.singername = data.data[0].singer_name;
          this.albumnum = data.data[0].album_num;
          this.songnum = data.data[0].song_num;
          this.songlist = data.data[0].songlist;
        } else {
          this.singername = data.data.singer_name;
          this.albumnum = data.data.album_num;
          this.songnum = data.data.song_num;
          this.songlist = data.data.songlist;
        }
      });
    }
  },
};
</script>
<style lang="stylus" scoped>
.wrap {
  .img {
    height: 135px;
    margin: 0 auto;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .title {
    font-family: '宋';

    .singer {
      margin: 0 auto;
      background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
      box-sizing: border-box;
      padding: 10px 20px;

      .name {
        color: #000;
        text-align: center;
        line-height: 100px;
        font-size: 24px;
      }

      .msg {
        display: flex;
        justify-content: space-between;

        .songnum {
          font-size: 12px;
        }

        .albumnum {
          font-size: 12px;
        }
      }
    }
  }

  .songlist {
    box-sizing: border-box;
    padding: 10px 20px;

    .title {
      font-size: 18px;
    }

    ul {
      padding: 10px 5px;

      li {
        display: flex;
        margin-top: 6px;

        .songname {
          margin: 10px;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .singer {
          margin: 10px;
          font-size: 12px;
          color: #999;
          max-width: 200px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>