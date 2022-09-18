<template>
  <div class="page-item-warp">
    <!-- 操作窗口 -->
    <page-item-ctl ref="itemCtl" />
    <div
      class="right-click-menu"
      :style="{
        display: isShow ? 'block' : 'none',
        top: menuTop + 'px',
        left: menuLeft + 'px',
      }"
    >
      <ul class="menu-box">
        <li><strong>菜单</strong></li>
        <li class="menu-btn" @click="debounceMethod(openEditBox)">修改</li>
        <li class="menu-btn" @click="debounceMethod(openEditImgBox)">
          修改logo
        </li>
        <li class="menu-btn" @click="debounceMethod(openAddBox)">添加</li>
        <li class="menu-btn" @click="debounceMethod(openRemoveBox)">移动</li>
        <li class="menu-btn" @click="debounceMethod(openDelBox)">删除</li>
      </ul>
    </div>
    <div class="item-box-warp">
      <!-- 目录 -->
      <div class="item-box" v-for="item in catalist" :key="item.id">
        <div class="item-a" @click="debounceMethod(toCata, item.cid)">
          <img :src="require('@/assets/img/nav/cata.png')" />
          <div>{{ item.title }}</div>
        </div>
      </div>
      <!-- 网址 -->
      <div class="item-box" v-for="item in navlist" :key="item.id">
        <a
          target="_blank"
          class="item-a"
          :href="item.url"
          @contextmenu.prevent="menuClick($event, item)"
        >
          <img :src="item.imgurl" />
          <div>{{ item.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PageItemCtl from "./PageItemCtl";
export default {
  name: "PageItem",
  components: {
    PageItemCtl,
  },
  props: {
    navlist: {
      type: Array,
      default: () => [],
    },
    catalist: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShow: false, //是否展示右键菜单
      menuTop: 0, //菜单默认相对位置
      menuLeft: 0, //菜单默认相对位置
      itemCtl: null, //子组件
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.itemCtl = this.$refs.itemCtl;
    document.addEventListener("click", () => {
      this.isShow = false;
    });
  },
  // 方法集合
  methods: {
    //右键
    menuClick(e, item) {
      // 展示菜单项
      //记录鼠标开始位置
      let startX = e.clientX;
      let startY = e.clientY;
      this.menuLeft = startX;
      this.menuTop = startY;
      this.isShow = true; //展示
      this.itemCtl.selectItem = item; //选中item
    },

    // 左键目录
    toCata(cid) {
      if (this.$store.state.pageBoxCid !== cid) {
        this.$bus.$emit("refreshNav", cid);
      }
    },
    /**
     * 右键菜单按钮事件
     */
    //1. 打开编辑框
    openEditBox() {
      this.itemCtl.editItemDialog = true;
      const { title, url, imgurl, introduce } = this.itemCtl.selectItem;
      this.itemCtl.itemFrom.title = title || "";
      this.itemCtl.itemFrom.url = url || "";
      this.itemCtl.itemFrom.imgUrl = imgurl || this.imgUrl(null, title);
      this.itemCtl.itemFrom.introduce = introduce || "";
    },
    //2. 打开图片编辑框
    openEditImgBox() {
      this.itemCtl.editItemImgDialog = true;
      const { title, imgurl } = this.itemCtl.selectItem;
      this.itemCtl.itemFrom.imgUrl = imgurl || this.imgUrl(null, title);
    },
    //3. 打开删除编辑框
    openDelBox() {
      this.itemCtl.delItemDialog = true;
    },
    //4. 打开添加编辑框
    openAddBox() {
      this.itemCtl.addItemDialog = true;
      this.itemCtl.itemFrom.title = "";
      this.itemCtl.itemFrom.url = "";
      this.itemCtl.itemFrom.imgUrl = "";
      this.itemCtl.itemFrom.introduce = "";
    },
    //5. 打开移动编辑框
    openRemoveBox() {
      //深拷贝
      const treeData = JSON.parse(
        JSON.stringify(this.$store.state.cataTreeData)
      );
      //添加属性
      this.addKey(treeData, this.itemCtl.selectItem.cid);
      this.itemCtl.removeTreeData = treeData;
      this.itemCtl.removeItemDialog = true;
    },
    /**
     * 工具类
     */
    //1. 获取父节点
    getParentNode(node, className) {
      let parent = node.parentNode;
      while (parent) {
        if (!parent.classList.contains(className)) {
          parent = parent.parentNode;
        } else if (parent.tagName.toLowerCase() === "body") {
          return false;
        } else {
          return parent;
        }
      }
    },
    //2. 如果没有图片,则生成图片
    imgUrl(url, title) {
      if (url === null || url === "") {
        return textToImg(title);
      }
      return url;
    },
    //3. 添加disabled
    addKey(arr, pid) {
      arr.forEach((item) => {
        //如果item.layer>5
        if (item.cid === pid) {
          item.disabled = true;
        }
        //item
        if (Array.isArray(item.children)) {
          this.addKey(item.children, pid);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page-item-warp {
  flex: 1;
  position: relative;
  overflow-y: auto;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin: 10px 0;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
//
.item-box-warp {
  *zoom: 1; //清除浮动
  &::after {
    //清除浮动
    display: table;
    content: " ";
    clear: both;
  }
  .item-box {
    display: block;
    float: left;
    width: 100px;
    margin: 10px;
    text-align: center;
    text-decoration: none;
    .item-a {
      display: inline-block;
      width: 100%;
      cursor: pointer;
      img {
        width: 60px;
        height: 60px;
        border-radius: 8px;
      }
      div {
        text-align: center;
        color: #222;
        // white-space: nowrap;
        // text-overflow: ellipsis;
        // overflow: hidden;
      }
    }
  }
}

.right-click-menu {
  position: fixed;
  display: none;
  width: auto;
  height: 100px;
  background-color: #fff;
  z-index: 99;
}
.page-item-warp::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.menu-box {
  border: 1px solid #979797;
  background: #f1f1f1;
  padding: 2px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  width: auto;
  overflow: hidden;
}
.menu-box li {
  float: left;
  clear: both;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
  padding: 0 10px;
  width: 100%;
  display: inline-block;
}
.menu-btn:hover {
  background: #e6edf6;
  cursor: pointer;
  color: #b4d2f6;
}
</style>
