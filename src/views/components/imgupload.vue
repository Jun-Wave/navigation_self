<template>
  <div>
    <el-upload
      class="upload-demo"
      action=""
      accept="image/jpeg,image/png"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeUpload"
      v-show="!dialogVisible"
    >
      <div slot="trigger">
        <img v-if="initImg!==''" class="nav-img" :src="initImg" alt="" />
        <i v-else class="el-icon-upload"></i>
      </div>
      <div class="upload-tip">
        点击图片上传: 支持png,jpg图片格式，单张图片最大支持300kb
      </div>
    </el-upload>
    <div class="cropper-content" v-show="dialogVisible">
      <div class="btn-box">
        <!-- <span class="comfrim-btn">√</span> -->
        <span class="cancel-btn" @click="handleCancel">×</span>
      </div>
      <div class="cropper" style="text-align: center">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        ></vueCropper>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/index";
export default {
  props: {
    initImg: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      dialogVisible: false, //显示图片剪裁框
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      fileName: "", //文件名称
      tid: "", //上传图片tid
      imgurl: "", //上传后展示图片
      imgData: null
    };
  },
  mounted() {

  },
  methods: {
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
      //校验
      // const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      //   return false;
      // }
      const isLt5M = file.size / 1024 / 1024 < 0.31;
      if (!isLt5M) {
        this.$utils.tip("上传文件大小不能超过 300kB!", false);
        return false;
      }

      this.fileName = file.name; //修改名称

      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw);
        this.dialogVisible = true;
      });
    },

    //blob转文件
    blobToFile(blob, fileName, mimeType) {
      return new File([blob], fileName, { type: mimeType });
    },

    //取消更改图片
    handleCancel() {
      this.dialogVisible = false;
    },

    //上传图片防抖处理
    finishDebounce: utils._debounce(function () {
      this.finish();
    }, 300),
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish(callback) {
      this.$refs.cropper.getCropBlob((data) => {
        //先将显示图片地址清空，防止重复显示
        this.option.img = "";
        //将剪裁后base64的图片转化为file格式
        let img = this.blobToFile(data, this.fileName, {
          type: data.type,
        });
        callback(img);
      });
    }
  },
};
</script>

<style lang="less" scoped>
.upload-demo {
  min-height: 20px;
}
.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
  .btn-box {
    display: flex;
    font-size: 25px;
    font-weight: bold;
    text-align: right;
    justify-content: space-between;
    span {
      cursor: pointer;
      background: #b4d2f6;
      padding: 0 5px;
    }
    span:hover {
      color: #1890ff;
    }
  }
}
.nav-img {
  // height: auto;
  //   width: 300px;
  width: auto;
  height: 300px;
}
.upload-tip {
  font-size: 10px;
  line-height: 15px;
}
.el-icon-upload {
  font-size: 50px;
}
.foresee-img {
  width: 100px;
}
</style>
