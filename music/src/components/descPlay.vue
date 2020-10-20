<template>
  <div>
    <div class="wrap" v-show="!this.$store.state.show">
      <div class="wrapper" ref="wrap"></div>
      <loading v-show="songPic==''" class="load"></loading>
      <div class="header">
        <div class="title">
          <div class="back" @click="clickFn">
            <span class="iconfont icon-back"></span>
          </div>
          <div class="name">
            <div class="songName">{{songName}}</div>
            <div class="singerName" @click="serachSinger">
              {{name}}
              <i class="iconfont icon-arrow-backimg" v-show="songPic!=''"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="songMain">
        <div class="songPic" ref="songPic">
          <img :src="songPic" alt />
        </div>
      </div>
      <div class="control">
        <div class="progress">
          <div class="stratTime">{{startTime}}</div>
          <span class="currentTime" ref="progress" v-show="songPic!=''"></span>
          <div class="endTime">{{duringTime}}</div>
        </div>
        <div class="btn">
          <div class="playModel">
            <span :class="this.playModel()[this.modelIndex()]" @click="changeModel"></span>
          </div>
          <div class="preSong">
            <span class="iconfont icon-shangyishou" @click="pre"></span>
          </div>
          <div class="pause">
            <span :class="this.status()[this.statusIndex()]" @click="controlStatus"></span>
          </div>
          <div class="nextSong">
            <span class="iconfont icon-xiayishou" @click="next"></span>
          </div>
          <div class="songList">
            <span class="iconfont icon-1804-liufupinggongnengtubiao-24" @click="showlist"></span>
            <transition name="list">
              <div class="currentlist" v-show="close">
                <div class="titlewrap">
                  <h5>当前播放列表({{this.songlist().length}})</h5>
                </div>
                <ul>
                  <songSlider :data="this.songlist()">
                    <li
                      v-for="(item,index) in this.songlist()"
                      @click="changeCurrentSong(item,index)"
                      :key="index"
                    >
                      <span v-show="index==currentIndex" class="iconfont icon-zanting currentSong"></span>
                      <span
                        class="songName"
                      >{{item.name?item.name:item.title?item.title:item.song_name}}-</span>
                      <span class="singer">{{item.singer?item.singer:item.singerName}}</span>
                      <span class="delete" @click="del(index)">x</span>
                    </li>
                  </songSlider>
                </ul>
                <div class="close" @click="closelist">关闭</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="miniPlay" v-show="miniShow&&this.$store.state.show">
      <div class="pic" ref="miniPic" @click="showPlayer">
        <img :src="songPic" alt />
      </div>
      <div class="songMsg" ref="songMsg">
        <div class="details" ref="details">
          <div class="content" ref="content">
            <div class="song">{{songName}}</div>
            <div class="singer">--{{singerName}}</div>
          </div>
        </div>
        <div class="btnlist">
          <div class="playModel">
            <span :class="this.playModel()[this.modelIndex()]" @click="changeModel"></span>
          </div>
          <div class="preSong">
            <span class="iconfont icon-shangyishou" @click="pre"></span>
          </div>
          <div class="pause">
            <span :class="this.status()[this.statusIndex()]" @click="controlStatus"></span>
          </div>
          <div class="nextSong">
            <span class="iconfont icon-xiayishou" @click="next"></span>
          </div>
        </div>
      </div>
    </div>
    <audio :src="m4aUrl" ref="audio" preload="metadata" @canplay="ready" @error="error"></audio>
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import loading from "./loading";
import songSlider from "./songSlider";
export default {
  name: "descPlay",
  data() {
    return {
      m4aUrl: "",
      playTime: 0,
      songMid: "",
      songName: "",
      songPic: "",
      singerName: "",
      startTime: "00:00",
      timer: null,
      rotate: 0,
      model: 0,
      close: false,
      loop: false,
      rand: false,
      normal: true,
      present: 0,
      wordTimer: "",
      left: 0,
      miniShow: false,
      songReady: false,
    };
  },
  computed: {
    duringTime() {
      let min = parseInt(this.playTime / 60);
      let sec = this.playTime % 60;
      let endTime = `${min}:${sec}`;
      if (String(min).length == 1) {
        let minute = `0${min}`;
        min = minute;
      }
      if (String(sec).length == 1) {
        let second = `0${sec}`;
        sec = second;
      }
      return `${min}:${sec}`;
    },
    currentIndex() {
      return this.songIndex();
    },
    song() {
      return this.$store.state.currentSong;
    },
    mid() {
      return this.$route.params.mid;
    },
    index() {
      return this.$store.state.songIndex;
    },
    name() {
      if (this.$route.name == "playSearch") {
        return this.$route.params.singername;
      }
      if (this.$route.name == "play") {
        this.singerName = this.$store.state.songlist[
          this.$store.state.songIndex
        ].singerName;
        return this.singerName;
      }
      return this.singerName;
    },
  },
  methods: {
    ...mapMutations({
      isShow: "SET_SHOW",
      setModelIndex: "SET_MODELINDEX",
      setStatusIndex: "SET_STATUSINDEX",
      setSongIndex: "SET_SONGINDEX",
      setSongList: "SET_SONGLIST",
      setCurrentSong: "SET_CURRENTSONG",
    }),
    ...mapGetters([
      "desc",
      "show",
      "playModel",
      "status",
      "statusIndex",
      "modelIndex",
      "songIndex",
      "songlist",
      "currentSong",
    ]),
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = false;
    },
    clickFn() {
      if (this.$route.name == "playSearch") {
        this.$router.push({
          name: "search",
        });
      }
      this.clearwordsCarousel();
      this.isShow(true);
      this.wordsCarousel();
      this.rotate = 0;
      if (this.statusIndex() == 0) {
        this.miniShow = true;
      } else {
        this.miniShow = false;
      }
    },
    serachSinger() {
      this.setStatusIndex(1);
      let singername;
      if (this.singerName != undefined) {
        if (this.singerName.split("/")) {
          singername = this.singerName.split("/")[0];
        } else {
          singername = this.singerName;
        }
      }
      if (this.$route.name == "play") {
        this.$router.push({
          name: "singerDetail",
          params: {
            singerName: singername,
            show:true
          },
        });
      } else {
        this.$router.push({
          name: "singer",
          params: {
            singerName: singername,
          },
        });
      }
    },
    showPlayer() {
      this.isShow(false);
    },
    controlStatus() {
      this.clearTimer();
      this.clearwordsCarousel();
      this.statusIndex() == 0 ? this.setStatusIndex(1) : this.setStatusIndex(0);
      if (this.statusIndex() == 1) {
        this.clearTimer();
        this.clearwordsCarousel();
        this.$refs.audio.pause();
      } else {
        this.PicAnimation();
        this.wordsCarousel();
        if (this.$refs.audio.duration < this.playTime) {
          console.log("该歌曲为会员歌曲，仅能试听");
        }
        this.$refs.audio.play();
      }
      this.timeChange();
    },
    PicAnimation() {
      this.timer = setInterval(() => {
        this.rotate += 0.06;
        if (this.$refs.songPic != undefined) {
          this.$refs.songPic.style.transform = `rotate(${this.rotate}deg)`;
        }
      }, 60 / 1000);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    changeModel() {
      this.model = this.modelIndex();
      this.model = (this.model + 1) % this.playModel().length;
      this.setModelIndex(this.model);
      if (this.model == 0) {
        this.normal = true;
        this.loop = false;
        this.rand = false;
      }
      if (this.model == 1) {
        this.normal = false;
        this.loop = true;
        this.rand = false;
      }
      if (this.model == 2) {
        this.normal = false;
        this.loop = false;
        this.rand = true;
      }
    },
    closelist() {
      this.close = false;
    },
    showlist() {
      this.close = true;
    },
    changeCurrentSong(item, index) {
      this.rotate = 0;
      this.clearTimer();
      this.setSongIndex(index);
      this.setStatusIndex(0);
      this.PicAnimation();
      let songmid = "";
      if (this.$route.name == "playSearch") {
        songmid = this.songlist()[this.songIndex()].song_mid;
      } else {
        if (item.mid) {
          songmid = item.mid;
        } else {
          songmid = item.songMid;
        }
      }

      axios({
        method: "POST",
        url: `http://127.0.0.1:9527/api/getSongDetail`,
        data: {
          songMid: songmid,
        },
      }).then((res) => {
        if (res.data[0]) {
          this.m4aUrl = res.data[0].m4aUrl;
          this.playTime = Number(res.data[0].playTime);
          this.songMid = res.data[0].songMid;
          this.songName = res.data[0].songName;
          this.songPic = res.data[0].songPic;
        } else {
          this.m4aUrl = res.data.m4aUrl;
          this.playTime = Number(res.data.playTime);
          this.songMid = res.data.songMid;
          this.songName = res.data.songName;
          this.songPic = res.data.songPic;
        }
        this.singerName = this.$route.params.singerName;
        this.$refs.wrap.style.background = `url(${this.songPic}) no-repeat center/cover`;
      });
      this.changeSong();
      this.timeChange();
    },
    pre() {
      if (this.songReady != true) {
        return;
      }
      let index = 0;
      if (this.rand == true) {
        index = this.randIndex(0, this.songlist().length - 1);
      } else {
        index = this.songIndex();
      }
      if (index == 0) {
        this.changeCurrentSong(
          this.songlist()[this.songlist().length - 1],
          this.songlist().length - 1
        );
      } else {
        this.changeCurrentSong(this.songlist()[index - 1], index - 1);
      }
      this.changeSong();
      this.songReady = false;
    },
    randIndex(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    },
    timeChange() {
      this.$refs.audio.addEventListener("timeupdate", () => {
        if (this.$refs.audio == undefined) {
          return;
        }
        let min = parseInt(this.$refs.audio.currentTime / 60);
        let sec = parseInt(this.$refs.audio.currentTime % 60);
        if (String(min).length == 1) {
          let minute = `0${min}`;
          min = minute;
        }
        if (String(sec).length == 1) {
          let second = `0${sec}`;
          sec = second;
        }
        let present =
          Number(this.$refs.audio.currentTime * 100) / Number(this.playTime);
        this.$refs.progress.style.backgroundImage = `linear-gradient(to right, #fff 0%,#fff ${present}%,#6d6d6d ${present}%, #6d6d6d 100%)`;
        this.startTime = `${min}:${sec}`;
        if (this.$refs.audio.currentTime == this.$refs.audio.duration) {
          this.clearTimer();
          if (this.loop == true) {
            this.$refs.audio.loop = this.loop;
            this.$refs.audio.play();
          } else {
            this.$refs.audio.loop = false;
            this.next();
          }
        }
      });
    },
    changeSong() {
      setTimeout(() => {
        this.$nextTick(() => {
          if (this.$refs.audio.duration < this.playTime) {
            console.log(
              `该歌曲为会员歌曲，仅能试听${parseInt(
                this.$refs.audio.duration
              )}秒`
            );
          }
          this.$refs.audio.play();
          this.timeChange();
          return;
        });
      }, 150);
    },
    next() {
      if (this.songReady != true) {
        return;
      }
      let index = 0;
      if (this.rand == true) {
        index = this.randIndex(0, this.songlist().length - 1);
      } else {
        index = this.songIndex();
      }
      if (index == this.songlist().length - 1) {
        this.changeCurrentSong(this.songlist()[0], 0);
      } else {
        this.changeCurrentSong(this.songlist()[index + 1], index + 1);
      }
      this.changeSong();
      this.songReady = false;
    },
    del(index) {},
    clearwordsCarousel() {
      clearInterval(this.wordTimer);
    },
    wordsCarousel() {
      this.rotate = 0;
      this.wordTimer = setInterval(() => {
        if (this.left <= -140) {
          this.left = 140;
        } else {
          this.left -= 0.1;
        }
        if (this.$refs.content != undefined) {
          this.$refs.content.style.transform = `translateX(${this.left}px)`;
        }
        if (this.$refs.miniPic != undefined) {
          this.$refs.miniPic.style.transform = `rotate(${this.rotate}deg)`;
        }
      }, 60 / 1000);
    },
  },
  created() {
    let songmid = "";
    if (this.$route.name == "playSearch") {
      songmid = this.$route.params.mid;
      this.isShow(false);
      this.singerName = this.$route.params.singer_name;
      this.setSongList(this.$route.params.songlist);
      this.setSongIndex(this.$route.params.index);
    } else {
      if (this.statusIndex() == 1) {
        songmid = this.$route.params.mid;
        console.log(songmid);
        if (songmid == undefined || songmid == "") {
          this.$router.push("/recommend");
        }
      } else {
        songmid = this.currentSong();
      }
    }
    axios({
      method: "POST",
      url: `http://127.0.0.1:9527/api/getSongDetail`,
      data: {
        songMid: songmid,
      },
    }).then((res) => {
      // console.log(res);
      if (res.data[0]) {
        this.m4aUrl = res.data[0].m4aUrl;
        this.playTime = Number(res.data[0].playTime);
        this.songMid = res.data[0].songMid;
        this.songName = res.data[0].songName;
        this.songPic = res.data[0].songPic;
      } else {
        this.m4aUrl = res.data.m4aUrl;
        this.playTime = Number(res.data.playTime);
        this.songMid = res.data.songMid;
        this.songName = res.data.songName;
        this.songPic = res.data.songPic;
      }
      this.singerName = this.$route.params.singerName;
      if (this.$refs.wrap != undefined) {
        this.$refs.wrap.style.background = `url(${this.songPic}) no-repeat center/cover`;
      }

      this.setCurrentSong(this.songMid);
    });
  },
  mounted() {
    this.$refs.progress.style.backgroundImage = `linear-gradient(to right, #6d6d6d 0%, #6d6d6d 100%) `;
  },
  components: {
    loading,
    songSlider,
  },
  watch: {
    song() {
      // console.log("当前歌曲发生了变化");
      this.rotate = 0;
      this.clearTimer();
      this.PicAnimation();
      let songmid = "";
      if (this.$route.name == "playSearch") {
        songmid = this.songlist()[this.songIndex()].song_mid;
      } else {
        if (this.songlist()[this.songIndex()] != undefined) {
          this.singerName = this.songlist()[this.songIndex()].singer;
        }
        if (
          this.singerName == undefined &&
          this.songlist()[this.songIndex()] != undefined
        ) {
          this.singerName = this.songlist()[this.songIndex()].singerName;
        }
        songmid = this.currentSong();
      }

      axios({
        method: "POST",
        url: `http://127.0.0.1:9527/api/getSongDetail`,
        data: {
          songMid: songmid,
        },
      }).then((res) => {
        setTimeout(() => {
          if (res.data[0]) {
            this.m4aUrl = res.data[0].m4aUrl;
            this.playTime = Number(res.data[0].playTime);
            this.songMid = res.data[0].songMid;
            this.songName = res.data[0].songName;
            this.songPic = res.data[0].songPic;
          } else {
            this.m4aUrl = res.data.m4aUrl;
            this.playTime = Number(res.data.playTime);
            this.songMid = res.data.songMid;
            this.songName = res.data.songName;
            this.songPic = res.data.songPic;
          }
          this.$refs.wrap.style.background = `url(${this.songPic}) no-repeat center/cover`;
          this.setCurrentSong(this.songMid);
        });
        this.changeSong();
        this.setStatusIndex(0);
      }, 150);
    },
    mid() {
      console.log("当前歌曲发生了变化");
      this.rotate = 0;
      this.clearTimer();
      this.PicAnimation();
      let songmid = "";
      if (this.songlist()[this.songIndex()].mid != undefined) {
        songmid = this.songlist()[this.songIndex()].mid;
      } else {
        songmid = this.songlist()[this.songIndex()].songMid;
      }
      this.singerName = this.songlist()[this.songIndex()].singer;
      console.log(songmid);
      axios({
        method: "POST",
        url: `http://127.0.0.1:9527/api/getSongDetail`,
        data: {
          songMid: songmid,
        },
      }).then((res) => {
        if (res.data[0]) {
          this.m4aUrl = res.data[0].m4aUrl;
          this.playTime = Number(res.data[0].playTime);
          this.songMid = res.data[0].songMid;
          this.songName = res.data[0].songName;
          this.songPic = res.data[0].songPic;
        } else {
          this.m4aUrl = res.data.m4aUrl;
          this.playTime = Number(res.data.playTime);
          this.songMid = res.data.songMid;
          this.songName = res.data.songName;
          this.songPic = res.data.songPic;
        }
        this.$refs.wrap.style.background = `url(${this.songPic}) no-repeat center/cover`;
        this.setCurrentSong(this.songMid);
      });
      this.changeSong();
      this.setStatusIndex(0);
    },
    index() {
      console.log("当前歌曲发生了变化");
      this.rotate = 0;
      this.clearTimer();
      this.PicAnimation();
      let songmid = "";
      if (this.$route.name == "playSearch") {
        songmid = this.songlist()[this.songIndex()].song_mid;
      } else {
        if (this.songlist()[this.songIndex()].mid != undefined) {
          songmid = this.songlist()[this.songIndex()].mid;
        } else {
          songmid = this.songlist()[this.songIndex()].songMid;
        }
        this.singerName = this.songlist()[this.songIndex()].singer;
      }
      axios({
        method: "POST",
        url: `http://127.0.0.1:9527/api/getSongDetail`,
        data: {
          songMid: songmid,
        },
      }).then((res) => {
        if (res.data[0]) {
          this.m4aUrl = res.data[0].m4aUrl;
          this.playTime = Number(res.data[0].playTime);
          this.songMid = res.data[0].songMid;
          this.songName = res.data[0].songName;
          this.songPic = res.data[0].songPic;
        } else {
          this.m4aUrl = res.data.m4aUrl;
          this.playTime = Number(res.data.playTime);
          this.songMid = res.data.songMid;
          this.songName = res.data.songName;
          this.songPic = res.data.songPic;
        }
        this.$refs.wrap.style.background = `url(${this.songPic}) no-repeat center/cover`;
        this.setCurrentSong(this.songMid);
      });
      this.changeSong();
      this.setStatusIndex(0);
    },
    deep: true,
  },
};
</script>
<style lang="stylus" scoped>
.list-enter-active, .list-leave-active {
  transition: transform 1s;
}

.list-enter, .list-leave-to {
  transform: translateY(760px);
}

.load {
  position: absolute;
  top: 50px;
  left: 190px;
}

.wrap {
  position: relative;
  z-index: 20;
  height: 736px;
  overflow: hidden;

  .wrapper {
    position: fixed;
    width: 414px;
    height: 736px;
    filter: blur(40px);
    color: #fff;
    z-index: -10;
  }

  .header {
    box-sizing: border-box;
    padding: 10px 12px 10px 12px;

    .title {
      position: relative;

      .back {
        position: absolute;

        .iconfont {
          font-size: 20px;
          line-height: 32px;
          color: #fff;
        }
      }

      .name {
        text-align: center;
        color: #fff;
        font-size: 12px;
        letter-spacing: 1px;
        word-spacing: 2px;

        .songName {
          width: 300px;
          margin: 0 auto;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
        }

        .singerName {
          width: 300px;
          margin: 0 auto;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .icon-arrow-backimg {
          font-size: 12px;
        }
      }
    }
  }

  .songMain {
    position: relative;
    width: 414px;
    height: 480px;

    .songPic {
      position: absolute;
      width: 300px;
      height: 300px;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      border-radius: 50%;
      overflow: hidden;
      border: 12px solid rgba(255, 255, 255, 0.1);

      img {
        position: absolute;
        vertical-align: bottom;
        width: 100%;
        height: 100%;
      }
    }
  }

  .control {
    box-sizing: border-box;
    padding: 10px 12px 10px 12px;
    color: #fff;

    .progress {
      display: flex;

      .currentTime {
        display: inline-block;
        width: 74%;
        height: 2px;
        // background-image: linear-gradient(to right, #6d6d6d 0%, #6d6d6d 50%, #6d6d6d 50%, #6d6d6d 100%);
        margin: 10px 10px 10px;
      }
    }

    .btn {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 80px 20px 50px;
      line-height: 39px;

      .playModel {
        .iconfont {
          font-size: 30px;
        }
      }

      .icon-shangyishou {
        font-size: 30px;
      }

      .icon-xiayishou {
        font-size: 27px;
      }

      .icon-1804-liufupinggongnengtubiao-24 {
        font-size: 35px;
      }

      .pause {
        .iconfont {
          font-size: 34px;
        }
      }

      .songList {
        position: relative;

        .currentlist {
          position: absolute;
          width: 400px;
          height: 460px;
          left: -340px;
          top: -400px;
          background-color: rgb(249, 250, 252);
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          box-sizing: border-box;
          padding: 10px 12px;

          .titlewrap {
            background-color: rgb(249, 250, 252);
            height: 40px;
          }

          h5 {
            color: #000;
            font-size: 16px;
            border-bottom: 1px solid #e4e2e2;
          }

          ul {
            height: 360px;
            overflow: hidden;
            color: #000;

            .singer {
              display: inline-block;
              line-height: 46px;
              max-width: 170px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #999;
              font-size: 12px;
            }

            .songName {
              display: inline-block;
              line-height: 46px;
              max-width: 170px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .delete {
              position: absolute;
              line-height: 46px;
              right: 10px;
              font-size: 18px;
              color: #999;
            }

            li {
              position: relative;
              height: 46px;
              width: 376px;
              border-bottom: 1px solid #e4e2e2;
              box-sizing: border-box;
              padding-left: 22px;

              .currentSong {
                position: absolute;
                top: 8%;
                left: 0;
                font-size: 16px;
                color: #ff7878;
              }
            }
          }

          .close {
            color: #000;
            font-size: 16px;
            text-align: center;
            border-top: 1px solid #e4e2e2;
          }
        }
      }
    }
  }
}
</style>