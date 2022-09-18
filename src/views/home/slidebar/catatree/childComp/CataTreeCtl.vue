<template>
  <div>
    <!-- 修改文件夹 -->
    <el-dialog title="修改目录名" :visible.sync="alterTreeDialog" width="30%">
      <el-form
        label-position="right"
        label-width="100px"
        :model="treeFrom"
        :rules="treeFromRules"
      >
        <el-form-item label="目录名" prop="title">
          <el-input
            v-model="treeFrom.title"
            :placeholder="selectNode !== null ? selectNode.label : ''"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="目录介绍" prop="introduce">
          <el-input
            type="textarea"
            v-model="treeFrom.introduce"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alterTreeDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(alterTreeName)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加文件夹 -->
    <el-dialog title="添加目录" :visible.sync="addTreeDialog" width="30%">
      <el-form
        label-position="right"
        label-width="100px"
        :model="treeFrom"
        :rules="treeFromRules"
      >
        <el-form-item label="目录名" prop="title">
          <el-input v-model="treeFrom.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="目录介绍" prop="introduce">
          <el-input
            type="textarea"
            v-model="treeFrom.introduce"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTreeDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(addTree)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加次根目录 -->
    <el-dialog title="添加次根目录" :visible.sync="addRootTreeDialog" width="30%">
      <el-form
        label-position="right"
        label-width="100px"
        :model="treeFrom"
        :rules="treeFromRules"
      >
        <el-form-item label="目录名" prop="title">
          <el-input v-model="treeFrom.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="目录介绍" prop="introduce">
          <el-input
            type="textarea"
            v-model="treeFrom.introduce"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRootTreeDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(addRootTree)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 移动文件 -->
    <el-dialog title="移动目录" :visible.sync="removeTreeDialog" width="30%">
      <span class="title">将"{{ selectNode !== null ? selectNode.title : "" }}"移动到</span>
      <el-tree
        :data="removeTreeData"
        show-checkbox
        default-expand-all
        node-key="cid"
        ref="treeForm"
        highlight-current
        check-strictly
        :props="defaultProps"
        @check-change="handleNodeClick"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeTreeDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(removeTree)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除目录" :visible.sync="delTreeDialog" width="30%">
      <span
        >确认删除"
        {{ selectNode !== null ? selectNode.title : "" }} "目录吗？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="delTreeDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(delTree)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      //默认是否显示称弹窗
      alterTreeDialog: false, 
      delTreeDialog: false,
      addTreeDialog: false,
      addRootTreeDialog: false,
      removeTreeDialog: false,

      
      selectNode: null,//右键选中的目录
      checkedId: "", //移动 部分选中树节点的id
      isSelect: false,//移动 是否选中
      checkedLayer: 1, //移动 部分选中树节点的layer层级
      isAddSameLevel: false, //是否是添加同级节点
      removeTreeData: [],//用于移动目录弹窗时 选择
      defaultProps: {
        children: "children",
        label: "title",
      },
      treeFrom: {
        title: "",
        introduce: "",
      },
      //规则
      treeFromRules: {
        title: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        introduce: [
          { max: 255, message: "长度不能超过255个字符", trigger: "blur" },
        ],
      }
    };
  },
  // 方法集合
  methods: {
    /**
     * 验证类函数
     */
    checkTitle() {
      const len = this.treeFrom.title.length;
      return len > 0 && len < 10;
    },
    checkIntroduce() {
      const len = this.treeFrom.introduce.length;
      return len < 255;
    },
    /**
     * 网络请求
     */
    //1. 修改node名称
    alterTreeName() {
      // 验证参数
      if (!this.checkTitle()) {
        this.$utils.tip("目录名长度在 1 到 10 个字符",false);
        return;
      }
      if (!this.checkIntroduce()) {
        this.$utils.tip("目录介绍长度不能超过255个字符",false);
        return;
      }
      const obj = {
        cid: this.selectNode.cid,
        title: this.treeFrom.title,
        introduce: this.treeFrom.introduce,
      };
      this.$api.editCataTitle(obj).then((res) => {
        if (res.code === 1000) {
          this.$parent.getTreeData();
          this.$utils.tip("修改成功!");
        }
        this.alterTreeDialog = false;
      });
    },


    //2. 删除子数
    delTree() {
      this.$parent.delArr = [];
      this.$parent.getDelIdArr(this.selectNode);
      this.$api.delCataByArr(this.$parent.delArr).then((res) => {
        if (res.code === 1000) {
          this.$parent.getTreeData();
          this.$utils.tip("删除成功!");
        }
        this.delTreeDialog = false;
      });
    },
    
    


    //3. 添加节点
    addRootTree() {
      // 3.1验证参数
      if (!this.checkTitle()) {
        this.$utils.tip("目录名长度在 1 到 10 个字符",false);
        return;
      }
      if (!this.checkIntroduce()) {
        this.$utils.tip("目录介绍长度不能超过255个字符",false);
        return;
      }
      //3.2添加同级节点
      const obj = {
        pid: this.$store.state.cid,//用户根目录cid
        title: this.treeFrom.title,
        introduce: this.treeFrom.introduce,
        flayer: 0,//父目录的层级
      };
      this.$api.addCata(obj).then((res) => {
        if (res.code === 1000) {
          this.$parent.getTreeData();
          this.$utils.tip("添加成功!");
        }
        this.addRootTreeDialog = false;
      });
    },

    //4 添加子节点
    addTree() {
      // 4.1验证参数
      if (!this.checkTitle()) {
        this.$utils.tip("目录名长度在 1 到 10 个字符",false);
        return;
      }
      if (!this.checkIntroduce()) {
        this.$utils.tip("目录介绍长度不能超过255个字符",false);
        return;
      }
      //添加子级
      if (!this.isAddSameLevel) {
        if (this.selectNode.layer > 5) {
          this.$utils.tip("节点树层级不能大于5", false);
          return;
        }
        const obj = {
          pid: this.selectNode.cid,//父目录cid
          title: this.treeFrom.title,
          introduce: this.treeFrom.introduce,
          flayer: this.selectNode.layer,//父目录层级
        };
        this.$api.addCata(obj).then((res) => {
          if (res.code === 1000) {
            this.$parent.getTreeData();
            this.$utils.tip("添加成功!");
          }
          this.addTreeDialog = false;
        });
      } else {
        //添加同级节点
        const obj = {
          pid: this.selectNode.pid,//父目录cid 同级所以相同
          title: this.treeFrom.title,
          introduce: this.treeFrom.introduce,
          flayer: this.selectNode.layer - 1,//父目录层级 同级所以父层级=同级-1
        };
        this.$api.addCata(obj).then((res) => {
          if (res.code === 1000) {
            this.$parent.getTreeData();
            this.$utils.tip("添加成功!");
          }
          this.addTreeDialog = false;
        });
      }
    },



    //4. 确认移动节点
    removeTree() {
       if (!this.isSelect) {
        //已经选择
        this.$utils.tip("没有选择目录！", false);
        return;
      }
      const obj = {
        cid: this.selectNode.cid,
        pid: this.checkedId,
        flayer: this.checkedLayer,//在选中移动节点的赋值
      };
      this.$api.editCataLocation(obj).then((res) => {
        if (res.code === 1000) {
          this.$parent.getTreeData();
        }
        this.removeTreeDialog = false;
      });
    },
    /**
     * 选中当选框
     * node: 节点所对应的对象
     * checked: 节点本身是否被选中
     * isChildBeSelected: 节点的子树中是否有被选中的节点
     */
    handleNodeClick(node, checked) {
      if (checked === true) {
        //节点本身是否被选中
        this.checkedId = node.cid; //赋值
        this.checkedLayer = node.layer;
        this.$refs.treeForm.setCheckedKeys([node.cid]); //勾选节点
      } else {
        //如果点击自己
        if (this.checkedId == node.cid) {
          this.$refs.treeForm.setCheckedKeys([node.cid]);
        }
      }
      if(!this.isSelect) {//已经选择
        this.isSelect = true;
      }
    },
  },
};
</script>

<style scoped>
  .title {
    position: relative;
    top: -15px;
  }
</style>