<template>
  <div id="slide-bar">
    <div class="open-seach-btn">
      <el-button icon="el-icon-search" @click="openSearchBox()">百度一下</el-button>
    </div>
    <search-box />
    <cata-tree />
  </div>
</template>

<script>
import CataTree from "./catatree/CataTree.vue";
import SearchBox from "./searchbox/Time.vue";
export default {
  name: "SlideBar",
  components: {
    CataTree,
    SearchBox,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例,data,props）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    openSearchBox() {
      this.$store.commit("setShowSearch",true);
    }
  },
};
</script>

<style lang="less" scoped>
.open-seach-btn ::v-deep .el-button {
  display: block !important;
  width: 100% !important;
  background: #fff;
  &:hover {
    background-color: #f5f7fa;
  }
}
</style>
