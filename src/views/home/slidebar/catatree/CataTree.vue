<template>
  <div class="cata-tree-box">
    <div id="cata-tree">
      <el-tree
        v-if="treeData.length >= 1"
        :data="treeData"
        node-key="cid"
        @node-click="clickNode"
        :props="defaultProps"
        :default-expand-all="true"
        @node-contextmenu="nodeMenu"
        :expand-on-click-node="false"
      >
      </el-tree>
      <!-- 添加目录 -->
      <el-button
        v-if="treeData.length < 1"
        size="mini"
        icon="el-icon-plus"
        type="primary"
        @click="openAddRootCata()"
        >添加目录</el-button
      >
      <!--自定义右键菜单-->
      <div id="mymenu" class="skin">
        <ul>
          <li><strong>目录菜单</strong></li>
          <li class="menu-btn" @click="debounceMethod(editName)">重命名</li>
          <li class="menu-btn" @click="debounceMethod(addNode)">添加子级</li>
          <li class="menu-btn" @click="debounceMethod(openAddNodeBySameLevel)">添加同级</li>
          <li class="menu-btn" @click="debounceMethod(openRemoveNode)">移动节点</li>
          <li class="menu-btn" @click="debounceMethod(delNode)">删除节点</li>
        </ul>
      </div>
    </div>

    <cata-tree-ctl ref="treeCtl" />
  </div>
</template>

<script>
import CataTreeCtl from "./childComp/CataTreeCtl.vue";
import morkData from "@/network/morkData.js"
export default {
  name: "CataTree",
  components: {
    CataTreeCtl,
  },
  data() {
    return {
      treeData: [], //展示的节点树
      delArr: [], //要删除的cid数组
      defaultProps: {
        children: "children",
        label: "title",
      },
      treeCtl: null, //子组件
      myMenuBox: null,
      cataBox: null,
    };
  },
  mounted() {
    //获取节点
    this.cataBox = document.getElementById("cata-tree");
    this.myMenuBox = document.getElementById("mymenu");
    this.init();
    this.treeCtl = this.$refs.treeCtl; //获取
  },
  methods: {
    init() {
      this.getTreeData(); //获取数据
      document.addEventListener("click", () => {
        this.myMenuBox.style.visibility = "hidden";
      });
    },
    //左键点击请求数据
    clickNode(obj) {
      if (this.$store.state.pageBoxCid !== obj.cid) {
        this.$bus.$emit("refreshNav", obj.cid);
      }
    },
    //右键 文件夹树节点
    nodeMenu(e, obj) {
      this.myMenuBox.style.left = e.pageX - this.cataBox.offsetLeft + "px";
      this.myMenuBox.style.top = e.pageY - this.cataBox.offsetTop + "px";
      /*设置菜单可见*/
      this.myMenuBox.style.visibility = "visible";
      this.treeCtl.selectNode = obj; //赋值
    },

    //更新数据
    getTreeData() {
      this.$api.getAllCata().then(res=> {
        if (res.code === 1000) {
          let result = res.data;
          if (result.length >= 2) {
            //大于1
            const initTreeData = this.ArrToTree(result);
            this.$store.commit("setTreeData", initTreeData); //更新
            this.treeData = initTreeData;
            this.$bus.$emit("refreshNav", initTreeData[0].cid);
          } else {
            const map = result.reduce((pre, cur) => {
              pre[cur.cid] = cur;
              return pre;
            }, {});
            this.$store.commit("setCataTreeMap", map);
            this.$store.commit("setTreeData", result); //更新
            this.treeData = result;
            this.$bus.$emit("refreshNav", this.treeData[0].cid);
            // console.log(this.treeData);
          }
        }
      })
    },

    /**
     * 右键菜单打开界面
     */
    //1. 打开修改名称
    editName() {
      this.treeCtl.alterTreeDialog = true;
    },
    //2. 打开添加根节
    openAddRootCata() {
      this.treeCtl.addRootTreeDialog = true;
    },
    //3.添加同级选择框
    openAddNodeBySameLevel() {
      this.treeCtl.isAddSameLevel = true;
      this.treeCtl.addTreeDialog = true;
    },
    //4. 添加子级
    addNode() {
      this.treeCtl.isAddSameLevel = false;
      this.treeCtl.addTreeDialog = true;
    },
    //5. 移动节点
    openRemoveNode() {
      this.treeCtl.isSelect = false;
      this.delArr = []; //清空要删除cid的
      this.getDelIdArr(this.treeCtl.selectNode); //获取获取要清空的cid
      //深拷贝
      const treeData = JSON.parse(
        JSON.stringify(this.$store.state.cataTreeData)
      );
      //添加属性
      this.addKey(treeData);
      this.treeCtl.removeTreeData = treeData;
      this.treeCtl.removeTreeDialog = true;
    },
    //删除节点
    delNode() {
      this.treeCtl.delTreeDialog = true;
    },

    /**
     * 工具类
     */
    //1. 添加disabled
    addKey(arr) {
      arr.forEach((item) => {
        //如果item.layer>5
        if (item.layer > 5) {
          item.disabled = true;
        }
        if (this.delArr.indexOf(item.cid) !== -1) {
          item.disabled = true;
        }
        if (item.cid === this.treeCtl.selectNode.pid) {
          item.disabled = true;
        }
        //item
        if (Array.isArray(item.children)) {
          this.addKey(item.children);
        }
      });
    },
    //2. 获取删除的id
    getDelIdArr(obj) {
      this.delArr.push(obj.cid);
      if (obj.children) {
        obj.children.forEach((item) => {
          this.getDelIdArr(item);
        });
      }
    },

    //3. 数组 转成 树结构
    ArrToTree(arr) {
      const map = arr.reduce((pre, cur) => {
        pre[cur.cid] = cur;
        return pre;
      }, {});
      const result = [];
      for (let item of arr) {
        if (item.pid===0||item.pid==="0") {
          result.push(item);
          continue;
        }
        if (item.pid in map) {
          const parent = map[item.pid];
          parent.children = parent.children || [];
          parent.children.push(item);
        }
      }
      this.$store.commit("setCataTreeMap", map);
      return result;
    },
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
#cata-tree {
  position: relative;
  padding-left: 25px;
}
ul {
  list-style-type: none;
}

#mymenu ul {
  position: absolute;
  float: left;
  border: 1px solid #979797;
  background: #f1f1f1;
  padding: 2px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6);
  width: auto;
  z-index: 999;
  overflow: hidden;
}

#mymenu ul li {
  float: left;
  clear: both;
  height: 24px;
  overflow: hidden;
  line-height: 24px;
  white-space: nowrap;
  padding: 0 10px;
  width: 100%;
  display: inline-block;
}

.menu-btn:hover {
  background: #e6edf6;
  cursor: pointer;
  color: #7fb5f7;
}

.skin {
  /* overflow: hidden; */
  padding: 2px;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
