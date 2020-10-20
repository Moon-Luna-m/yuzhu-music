<template>
  <div class="classify">
    <div class="btn" @click="link(1)">
      <p :class="isActive[0]?'active':''">推荐</p>
    </div>
    <div class="btn" @click="link(2)">
      <p :class="isActive[1]?'active':''">歌单</p>
    </div>
    <div class="btn" @click="link(3)">
      <p :class="isActive[2]?'active':''">排行</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: [true, false, false],
    };
  },
  methods: {
    link(val) {
      if (val == 1) {
        this.$router.push("/recommend");
      }
      if (val == 2) {
        this.$router.push("/songlist");
      }
      if (val == 3) {
        this.$router.push("/rank");
      }
    },
  },
  created() {
    let href = String(window.location.href);
    let rank = "rank";
    let songlist = "songlist";
    let recommend = "recommend";
    if (href.includes("rank")) {
      this.isActive = [false, false, true];
    }
    if (href.includes("songlist")) {
      this.isActive = [false, true, false];
    }
    if (href.includes("recommend")) {
      this.isActive = [true, false, false];
    }
  },
};
</script>



<style lang="stylus" scoped>
.active {
  border-bottom: 2px solid #000 !important;
}

.classify {
  display: flex;
  justify-content: space-around;

  .btn {
    width: 34%;
    background-color: #fff;

    p {
      width: 70%;
      margin: 0 auto;
      line-height: 38px;
      text-align: center;
      border-bottom: 2px solid transparent;
    }
  }
}
</style>