<template>
  <div
    class="pedants-warp" v-show="$store.state.isShowSearch"
  >
    <div class="pedants-box">
      <div class="time-box" @click="clickTime">
        <div class="date-layout">
          {{ dayDiv }}
        </div>
        <div class="time-layout">
          {{ timeDiv }}
        </div>
      </div>
      <div class="search-content">
        <search-box />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "./childComp/SearchBox.vue";
export default {
  components: {
    SearchBox,
  },
  data() {
    return {
      timer: null,
      dayDiv: "",
      timeDiv: "",
      isShowSearch: true,
      weeks: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
    };
  },
  created() {
    this.displayTime();
    this.timer = setInterval(this.displayTime, 1000); //单位是毫秒
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    clickTime() {
      this.$store.commit("setShowSearch",false)
      // //刷新父数据
      // getParent(this, "Home").isShowSearch = this.isShowSearch;
    },
    //判断时间是否为个位数，如果时间为个位数就在时间之前补上一个“0”
    check(val) {
      if (val < 10) {
        return "0" + val;
      } else {
        return val;
      }
    },
    displayTime() {
      //获取系统当前的年、月、日、小时、分钟、毫秒
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = date.getMinutes();
      // var second = date.getSeconds();
      var week = this.weeks[date.getDay()];
      var daystr = year + "年" + month + "月" + day + "日  " + week;
      //将系统时间设置到div元素中
      this.dayDiv = daystr;
      this.timeDiv = this.check(hour) + ":" + this.check(minutes);
    },
  },
};
</script>

<style scoped>
.pedants-warp {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(1, 1, 1, 0.5);
  z-index: 100;
}

.pedants-box {
  text-align: center;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, 0);
  height: 100px;
  width: 400px;
}

.date-layout {
  font-family: "Share Tech Mono", monospace;
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6;
  letter-spacing: 0.1em;
  font-size: 24px;
}

.time-layout {
  font-family: "Share Tech Mono", monospace;
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6;
  letter-spacing: 0.05em;
  font-size: 60px;
}

.time-box {
  cursor: pointer;
}
</style>
