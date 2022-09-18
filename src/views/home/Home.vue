<template>
  <div class="home">
    <!-- 侧栏 -->
    <div id="slide-bar-box">
      <div id="slide-bar">
        <slide-bar />
      </div>
      <!-- <button id="close-btn">关闭</button> -->
      <span id="control-btn" @click="handleBtn()" class="iconfont">{{
        isShow ? "&#xe63d;" : "&#xe63e;"
      }}</span>
      <!-- <button id="control-btn"></button> -->
      <div id="drag-btn"></div>
    </div>
    <div class="right">
      <navigation />
    </div>
  </div>
</template>

<script>
import SlideBar from "./slidebar/SlideBar.vue";
import Navigation from "./navigation/Navigation.vue";

export default {
  name: "Home",
  components: { SlideBar, Navigation },
  data() {
    return {
      slideBarWidth: 200,
      slideBarBox: null,
      dragBtn: null,
      slideBar: null,
      isShow: true,
    };
  },
  created() {
    let isExpand =  localStorage.getItem("isExpand");
    if(isExpand!=null) {
      isExpand = isExpand==="false"?false:true;
      this.$store.commit("setIsExpand", isExpand);
    }else{
      this.$store.commit("setIsExpand", true);
    }
    
  },
  mounted() {
    this.dragBtn = document.getElementById("drag-btn");
    this.slideBarBox = document.getElementById("slide-bar-box");
    this.slideBar = document.getElementById("slide-bar");

    this.dragSlidBar(20, this.dragBtn, this.slideBarBox);
    // this.closeSlideBar(closeBtn, slideBarBox, slideBar);
    // this.openSlideBar(openBtn, slideBarBox, slideBar);

    const slideBarWidth = parseInt(localStorage.getItem("slideBarWidth"));
    if(typeof slideBarWidth === 'number'&&slideBarWidth>200&&slideBarWidth<=400) {
      this.slideBarWidth = slideBarWidth;
      this.slideBarBox.style.width = this.slideBarWidth + "px";
    }
  },
  methods: {
    /**
     * delay: 防抖时间
     */
    dragSlidBar(delay, dragBtn, slideBarBox) {
      const that = this;
      //鼠标按下
      dragBtn.onmousedown = function (e) {
        //记录鼠标开始位置
        let startX = e.clientX;
        //防抖初始时间
        let init_time = 0;
        //给得是document绑定事件
        document.onmousemove = function (e) {
          // 防抖
          let now_time = new Date(); //现在时间
          if (now_time - init_time > delay) {
            //满足时间则执行
            init_time = now_time;
            //记录鼠标位置
            let endX = e.clientX;
            //计算鼠标移动距离
            let moveX = endX - startX;
            // 更新鼠标初始位置
            startX = endX;
            // 更新盒子宽度
            that.slideBarWidth += moveX;
            // 边界值处理
            if (that.slideBarWidth < 200) {
              that.slideBarWidth = 200;
            }
            if (that.slideBarWidth > 400) {
              that.slideBarWidth = 400;
            }
            slideBarBox.style.width = that.slideBarWidth + "px";
          }
          return false; //阻止默认事件
        };
        //解除事件
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
          // 释放鼠标
          dragBtn.releaseCapture && dragBtn.releaseCapture();
          //更新
          localStorage.setItem("slideBarWidth",that.slideBarWidth);
        };
        // 捕获鼠标
        dragBtn.setCapture && dragBtn.setCapture();
        return false; //阻止默认事件
      };
    },
    /**
     * 关闭侧栏
     */
    handleBtn() {
      if (this.isShow) {
        this.slideBarBox.style.transition = "width 1s";
        this.slideBarBox.style.width = "0px";
        this.slideBar.style.width = this.slideBarWidth - 6 + "px";
        this.isShow = false;
      } else {
        this.slideBarBox.style.width = this.slideBarWidth + "px";
        setTimeout(() => {
          this.slideBarBox.style.transition = "width 0s";
        }, 1000);
        this.slideBar.style.width = "auto";
        this.isShow = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/fonts/slideBar/iconfont.css");
.home {
  width: 100%;
  height: 100vh;
  background-color: fff;
  display: flex;
}

#slide-bar-box {
  width: 200px;
  height: 100%;
  // background-color: #999;
  position: relative;

  #slide-bar {
    padding-right: 6px;
  }
}

#drag-btn {
  width: 6px;
  height: 100%;
  background-color: transparent;
  cursor: w-resize;
  position: absolute;
  right: 0;
  top: 0;
}

.right {
  height: 100%;
  flex: 1;
  background-color: #fff;
  position: relative;
  box-shadow: -1px 2px 3px rgba(1, 1, 1, 0.1);
}

#control-btn {
  position: absolute;
  top: 10px;
  right: -50px;
  z-index: 10;
  font-size: 30px;
  cursor: pointer;
}
#control-btn:hover {
  color: @hover-color;
}
</style>