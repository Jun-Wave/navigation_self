<template>
  <div class="page-box-warp">
    <div class="page-box">
      <div class="grid-content bg-purple">
        <div class="binav-title">
          <span class="binav-item">{{ cataData.title }}</span>
          <div class="set-button">
            <!-- <el-button
              type="warning"
              size="small"
              icon="el-icon-plus"
              @click="debounceMethod(openAddNav)"
              circle
            ></el-button> -->
          </div>
        </div>
        <page-item :navlist="cataData.navList" :catalist="cataData.cataList" ref="pageSonItem" />
      </div>
    </div>
  </div>
</template>

<script>
import PageItem from "./PageItem";
export default {
  name: "PageBox",
  components: {
    PageItem,
  },
  props: {
    cataData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      // cataData: {
      //   cid: "",
      //   title: "",
      //   createdAt: "",
      //   navList: [],
      //   cataList: [],
      // }
    };
  },
  // 方法集合
  methods: {
    openAddNav() {
      //触发子组件事件
      this.$refs.pageSonItem.openAddBox();
    },
  },
};
</script>

<style lang="less" scoped>
.page-box-warp {
  // flex: 1;
  float: left;
  .page-box {
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    height: 100%;
    .bg-purple {
      background: #d3dce6;
      height: 100%;
    }
    .grid-content {
      padding: 10px 0 20px 0;
      border-radius: 4px;
      // width: 370px;
      // height: 350px;
      // min-width: 370px;
      // min-height: 350px;
      margin: 10px 5px;
    }
  }
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
