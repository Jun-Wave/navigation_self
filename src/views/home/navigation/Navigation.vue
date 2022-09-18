<template>
  <div id="navigation">
    <!-- 目录位置菜单 -->
    <div class="top">
      <div class="nav-address">
        <span
          v-for="item in nav_address"
          :key="item.cid"
          @click="debounceMethod(toNavAddress, item.cid)"
        >
          {{ item.title }} /</span
        >
      </div>
      <div class="left">
        <el-tooltip
          :content="$store.state.isExpand ? '展开子文件夹' : '关闭展示子文件夹'"
          placement="top"
        >
          <el-switch
            @change="switchDisplay"
            v-model="isExpand"
            active-color="#409eff"
            inactive-color="#999"
            active-value="expand"
            inactive-value="noExpand"
          >
          </el-switch>
        </el-tooltip>
      </div>
    </div>
    <div class="nav-warp" :class="$store.state.isExpand ?'expand':'no-expand'">
      <page-box />
      <!-- <div class="page-box-test"></div> -->
      <page-son-box
        v-show="$store.state.isExpand"
        v-for="item in sonNavArr"
        :key="item.cid"
        :cataData="item"
      />
    </div>
  </div>
</template>

<script>
import PageBox from "./childComp/PageBox";
import PageSonBox from "./childComp/PageSonBox";
export default {
  name: "",
  components: {
    PageBox,
    PageSonBox,
  },
  props: {},
  data() {
    return {
      nav_address: [
        {
          cid: 1,
          title: "前端",
        },
        {
          cid: 2,
          title: "后端",
        },
      ],
      sonNavArr: [],
      isExpand: "expand"
    };
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例,data,props）
  created() {
    this.isExpand = this.$store.state.isExpand?"expand":"noExpand";
  },
  // 方法集合
  methods: {
    toNavAddress(cid) {
      if (this.$store.state.pageBoxCid !== cid) {
        this.$bus.$emit("refreshNav", cid);
      }
    },
    switchDisplay() {
      this.$store.commit("setIsExpand", !this.$store.state.isExpand); //更新
    },
  },
};
</script>

<style lang="less" scoped>
/* @import url(); 引入公共css类 */
#navigation {
  height: 100%;
  padding: 0 5px 0 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.top {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  .nav-address {
    padding-left: 60px;
    span {
      cursor: pointer;
    }
  }
  .left {
    padding-right: 10px;
  }
}

.nav-warp {
  flex: 1;
  padding: 10px;
}
.expand{
  overflow: auto;
}
.no-expand{
  overflow: hidden;
}
</style>
