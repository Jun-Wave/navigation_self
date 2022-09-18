<template>
  <div :class="$store.state.isExpand?'':'is-expand'" class="page-box grid-content bg-purple">
    <div class="binav-title">
      <span class="binav-item">{{ cataData.title }}</span>
      <div class="set-button">
        <el-button
          type="warning"
          size="small"
          icon="el-icon-plus"
          @click="debounceMethod(openAddNav)"
          circle
        ></el-button>
      </div>
    </div>
    <page-item :catalist="cataData.cataList" :navlist="cataData.navList" ref="pageItem"/>
    <!-- <page-item :catalist="cataData.cataList" :navlist="morkData.navData.data.fatherData.navList" ref="pageItem"/> -->
    
  </div>
</template>

<script>
import PageItem from "./PageItem";
import textToImg from "@/utils/TextToImg";
// import morkData from "@/network/morkData.js";
export default {
  name: "PageBox",
  components: {
    PageItem,
  },
  props: {},
  data() {
    return {
      // morkData: null,//测试数据
      cataData: {
        cid: "",
        title: "",
        createdAt: "",
        navList: [],
        cataList: [],
        
      },
    };
  },
  created() {
    // this.morkData = morkData;//测试数据
  },
  mounted() {
    // this.getAllNav(this.$store.state.pageBoxCid);
    this.$bus.$on("refreshNav", (cid) => {
      this.getAllNav(cid);
    });
  },
  // 方法集合
  methods: {
    //获取目录下的网址
    getAllNav(cid) {
      this.$api.getAllNav(cid).then((res) => {
        if (res.code === 1000) {
          
          this.cataData = res.data;
          
          //存储信息
          this.$store.commit("setCid", res.data.cid);
          //添加 目录导航
          this.$parent.nav_address = []; //清空
          this.addCataNav(res.data.cid, this.$store.state.cataTreeMap);
          this.addNavImg(); //添加图片

          this.$parent.sonNavArr = [];
          if (this.$store.state.isExpand) {
            res.data.cataList.forEach(async (item) => {
              let sonNavData = await this.$api.getAllNav(item.cid);
              sonNavData.data.navList.forEach((obj) => {
                obj.imgurl = this.imgUrl(obj.imgurl, obj.title);
              });
              this.$parent.sonNavArr.push(sonNavData.data);
            });
          }
        }
      });
    },
    //添加没有则 添加图片
    addNavImg() {
      this.cataData.navList.forEach((item) => {
        item.imgurl = this.imgUrl(item.imgurl, item.title);
      });
    },
    //添加目录位置
    addCataNav(cid, map) {
      const { title } = map[cid];
      this.$parent.nav_address.unshift({
        cid,
        title,
      });
      if (map[cid].pid !== 0 && map[cid].pid !== "0") {
        //如果存在父节点
        this.addCataNav(map[cid].pid, map);
      }
    },
    //如果没有图片,则生成图片
    imgUrl(url, title) {
      if (url === null || url === "") {
        return textToImg(title);
      }
      return url;
    },
    openAddNav() {
      //触发子组件事件
      this.$refs.pageItem.openAddBox();
    },
  },
};
</script>

<style lang="less" scoped>
.page-box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.is-expand{
  height: 100%;//控制是否全页面
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  // padding: 10px 0 20px 0;
  border-radius: 4px;
  // width: 370px;
  // height: 350px;
  min-width: 370px;
  // min-height: 350px;
  // margin: 10px 5px;
}
.add-box {
  margin: 20px 0;
}

.binav-title {
  overflow: hidden;
  // height: 62px;
  padding: 15px 10px;
  // margin: 10px 0;
  display: flex;
  justify-content: space-between;
  .binav-item {
    line-height: 32px;
    font-size: 18px;
    font-weight: bold;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
