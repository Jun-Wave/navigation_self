<template>
  <div>
    <!-- 修改网址文件 -->
    <el-dialog title="修改网址文件" :visible.sync="editItemDialog" width="40%">
      <el-form
        label-position="right"
        label-width="110px"
        :model="itemFrom"
        :rules="itemFromRules"
      >
        <el-form-item label="网址名称" prop="title">
          <el-input
            v-model="itemFrom.title"
            :placeholder="selectItem !== null ? selectItem.title : ''"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="网址链接" prop="url">
          <el-input v-model="itemFrom.url" clearable></el-input>
        </el-form-item>
        <el-form-item label="网址介绍" prop="introduce">
          <el-input
            type="textarea"
            v-model="itemFrom.introduce"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(editItem)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改网址文件 -->
    <el-dialog
      title="修改网址logo"
      :visible.sync="editItemImgDialog"
      width="40%"
    >
      <el-form
        label-position="right"
        label-width="110px"
        :model="itemFrom"
        :rules="itemFromRules"
      >
        <el-form-item label="网址logo" prop="imgUrl">
          <img-up-load :initImg="itemFrom.imgUrl" ref="editImg" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(editItemImg)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加网址文件 -->
    <el-dialog title="添加网址文件" :visible.sync="addItemDialog" width="40%">
      <el-form
        label-position="right"
        label-width="110px"
        :model="itemFrom"
        :rules="itemFromRules"
      >
        <el-form-item label="网址文件名称" prop="title">
          <el-input v-model="itemFrom.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="网址链接" prop="url">
          <el-input v-model="itemFrom.url" clearable></el-input>
        </el-form-item>
        <el-form-item label="网址logo" prop="imgUrl">
          <img-up-load ref="addImg" />
        </el-form-item>
        <el-form-item label="网址文件介绍" prop="introduce">
          <el-input
            type="textarea"
            v-model="itemFrom.introduce"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(addItem)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="移动网址" :visible.sync="removeItemDialog" width="30%">
      <span
        >将"
        {{ selectItem !== null ? selectItem.title : "" }}
        "移动到</span
      >
      <el-tree
        :data="removeTreeData"
        show-checkbox
        default-expand-all
        node-key="nid"
        ref="treeForm"
        highlight-current
        check-strictly
        :props="defaultProps"
        @check-change="handleNodeClick"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="removeItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(removeItem)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="删除网址文件" :visible.sync="delItemDialog" width="30%">
      <span
        >确认删除"
        {{ selectItem !== null ? selectItem.title : "" }}
        "网址文件吗？</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="delItemDialog = false">取 消</el-button>
        <el-button type="primary" @click="debounceMethod(delItem)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpLoad from "@/views/components/imgupload";
import utils from "@/utils/index";
export default {
  name: "",
  components: {
    ImgUpLoad,
  },
  props: {},
  data() {
    return {
      //默认是否显示修改弹窗
      editItemDialog: false,
      editItemImgDialog: false,
      delItemDialog: false,
      addItemDialog: false,
      removeItemDialog: false,

      isSelect: false,

      grandFather: null, //PageBox 用于刷新数据
      selectItem: null, //右键选中的网址
      checkedId: "", //移动 部分选中树节点的id
      removeTreeData: [], ////用于移动网址弹窗时 选择数据
      itemFrom: {
        title: "",
        url: "",
        imgUrl: "",
        introduce: "",
      },
      //规则
      itemFromRules: {
        title: [
          { required: true, message: "请输入网站名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        url: [
          { required: true, message: "请输入网站链接", trigger: "blur" },
          {
            validator: this.validUrl,
            message: "链接不合法",
            trigger: "blur",
          },
        ],
        introduce: [
          { max: 255, message: "长度不能超过255个字符", trigger: "blur" },
        ],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例,data,props）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.grandFather = this.$parent.$parent;
  },

  // 方法集合
  methods: {
    /**
     * 验证类函数
     */
    checkTitle() {
      const len = this.itemFrom.title.length;
      return len > 0 && len < 10;
    },
    checkIntroduce() {
      const len = this.itemFrom.introduce.length;
      return len < 255;
    },
    checkUrl() {
      return utils.verifyPageUrl(this.itemFrom.url);
    },
    /**
     * 网络请求 网址操作
     */
    //1. 修改网址
    editItem() {
      // 验证参数
      if (!this.checkTitle()) {
        this.$utils.tip("目录名长度在 1 到 10 个字符", false);
        return;
      }
      if (!this.checkIntroduce()) {
        this.$utils.tip("目录介绍长度不能超过255个字符", false);
        return;
      }
      const obj = {
        nid: this.selectItem.nid,
        url: this.itemFrom.url,
        title: this.itemFrom.title,
        introduce: this.itemFrom.introduce,
      };
      this.$api.editNav(obj).then((res) => {
        if (res.code === 1000) {
          this.grandFather.getAllNav(this.grandFather.cataData.cid);
          this.$utils.tip("修改成功！");
          this.editItemDialog = false;
        }
      });
    },
    //修改图片
    editItemImg() {
      if (this.$refs.editImg.dialogVisible) {
        //添加了图片
        const obj = {
          nid: this.selectItem.nid,
        };
        this.$refs.editImg.finish((img) => {
          obj.img = img;
          this.$api.editNavImg(obj).then((res) => {
            if (res.code === 1000) {
              this.grandFather.getAllNav(this.grandFather.cataData.cid);
              this.$utils.tip("修改成功！");
              this.editItemImgDialog = false;
              this.$refs.editImg.dialogVisible = false;
            }
          });
        });
      } else {
        this.$utils.tip("没有选择图片!", false);
      }
    },
    //添加网址
    addItem() {
      // 验证参数
      if (!this.checkTitle()) {
        this.$utils.tip("目录名长度在 1 到 10 个字符", false);
        return;
      }
      if (!this.checkIntroduce()) {
        this.$utils.tip("目录介绍长度不能超过255个字符", false);
        return;
      }
      if (!this.checkUrl()) {
        this.$utils.tip("网址链接无效！", false);
        return;
      }
      const obj = {
        cid: this.grandFather.cataData.cid,
        url: this.itemFrom.url,
        title: this.itemFrom.title,
        introduce: this.itemFrom.introduce,
      };
      if (this.$refs.addImg.dialogVisible) {
        //添加了图片
        this.$refs.addImg.finish((img) => {
          obj.img = img;
          this.$api.addNavAndImg(obj).then((res) => {
            if (res.code === 1000) {
              this.grandFather.getAllNav(this.grandFather.cataData.cid);
              this.$utils.tip("添加成功！");
              this.addItemDialog = false;
              this.$refs.addImg.dialogVisible = false;
            }
          });
        });
      } else {
        this.$api.addNav(obj).then((res) => {
          if (res.code === 1000) {
            this.$utils.tip("添加成功！");
            this.grandFather.getAllNav(this.grandFather.cataData.cid);
            this.$refs.addImg.dialogVisible = false;
            this.addItemDialog = false;
          }
        });
      }
    },
    //删除节点
    delItem() {
      const arr = [];
      arr.push(this.selectItem.nid);
      this.$api.delNavByArr(arr).then((res) => {
        if (res.code === 1000) {
          this.$utils.tip("删除成功！");
          this.grandFather.getAllNav(this.grandFather.cataData.cid);
          this.delItemDialog = false;
        }
      });
    },
    removeItem() {
      if (!this.isSelect) {
        //已经选择
        this.$utils.tip("没有选择目录！", false);
        return;
      }
      const obj = {
        cid: this.checkedId,
        nid: this.selectItem.nid,
      };
      this.$api.editNavLocation(obj).then((res) => {
        if (res.code === 1000) {
          this.$utils.tip("移动成功！");
          this.grandFather.getAllNav(this.checkedId);
          this.removeItemDialog = false;
        }
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
        this.$refs.treeForm.setCheckedKeys([node.cid]); //勾选节点
      } else {
        //如果点击自己
        if (this.checkedId == node.cid) {
          this.$refs.treeForm.setCheckedKeys([node.cid]);
        }
      }
      if (!this.isSelect) {
        //已经选择
        this.isSelect = true;
      }
    },

    /**
     * 工具类
     */
    // 1. 验证网页地址
    validUrl(rule, value, callback) {
      if (utils.verifyPageUrl(value)) {
        callback();
      } else {
        callback("请输入合法的网站链接", false);
      }
    },
  },
};
</script>

<style scoped>
/* @import url(); 引入公共css类 */
</style>
