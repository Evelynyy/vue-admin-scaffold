<template lang="html">
  <div class="error-404">
    <div class="box">
      <h1>NOT ON THE EARTH ! ! !</h1>
      <img :src="image"/>
      <h1>404: 您访问的页面去火星啦！</h1>
      <h2>{{ seconds }} 秒后回到 <a href="javascript:void(0)" @click="back">上一页</a></h2>
    </div>
  </div>
</template>

<script>
const DEFAULT_SECONDS = 5;

export default {
  data () {
    return {
      image: require('@/assets/images/404.png'),
      seconds: DEFAULT_SECONDS,
      timer: null
    };
  },
  mounted () {
    this.timer = window.setInterval(() => {
      this.seconds--;
      if (this.seconds === 0) {
        this.clearTimer();
        this.back();
      }
    }, 1000);
  },
  beforeDestroy () {
    this.clearTimer();
  },
  methods: {
    back () {
      this.$router.go(-1);
    },
    clearTimer () {
      if (this.timer) window.clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss">
.error-404 {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #6bc5a4;
  background-image: url('~@/assets/images/mars.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;

  .box {
    margin: 10% auto auto auto;

    img {
      margin: 30px auto;
    }

    h1, h2 {
      margin: 10px auto;
      color: white;
      font-weight: normal;
    }

    h1 {
      margin: 20px auto;
    }

    a {
      color: white;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
