<template>
  <div>
    <mHeader></mHeader>
    <classify></classify>
    <div class="rank">
      <rankSlider>
        <div class="content">
          <div class="rankMsg" v-for="(rank,index) in group" :key="index">
            <ul v-for="list in rank.toplist" :key="list._id" @click="link(list.topId,list.picUrl)">
              <li>
                <div class="content">
                  <div class="title">{{list.musichallTitle}}</div>
                  <div class="songlist">
                    <div class="song" v-for="(song,index) in list.rankSong" :key="song.songMid">
                      {{index+1}}.
                      <span class="songName">{{song.title}}</span>-
                      <span class="singer">{{song.singerName}}</span>
                    </div>
                  </div>
                </div>
                <div class="cover">
                  <img :src="list.picUrl" alt />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </rankSlider>
    </div>
  </div>
</template>

<script>
import mHeader from "./m-header.vue";
import classify from "./classify.vue";
import axios from "axios";
import rankSlider from "./rankSlider";
export default {
  data() {
    return {
      group: [],
    };
  },
  components: {
    mHeader,
    classify,
    rankSlider,
  },
  created() {
    axios({
      method: "GET",
      url: `http://127.0.0.1:9527/api/getRankData`,
    }).then((data) => {
      // console.log(data);
      this.group = data.data[0].group;
    });
  },
  methods: {
    link(val,cover){
      this.$router.push({
        name:'rankSong',
        params:{
          topId:val,
          cover:cover
        }
      })
    }
  },
};
</script>
<style lang="stylus" scoped>
.rank {
  background-color: rgb(245, 245, 245);
  padding: 0 15px;
  height: 656px;
  .content{
    padding-top 20px
    padding-bottom 18px
  }
  .rankMsg {
    ul {
      height: 120px;
      overflow: hidden;
      box-sizing: border-box;
      margin-bottom: 15px;

      li {
        display: flex;
        justify-content: space-between;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        background-color: #fff;

        .content {
          width: 260px;
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
          padding: 15px;

          .title {
            font-family: '宋';
            font-size: 18px;
            margin-bottom: 4px;
          }

          .songlist {
            font-size: 14px;
            font-weight: 800;

            .song {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-weight: normal;
              margin-bottom: 4px;

              .songName {
                font-weight: normal;
                font-size: 12px;
              }

              .singer {
                font-weight: normal;
                color: #a2a2a2;
                font-size: 12px;
              }
            }
          }
        }
      }

      .cover {
        img {
          width: 120px;
          vertical-align: bottom;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
  }
}
</style>