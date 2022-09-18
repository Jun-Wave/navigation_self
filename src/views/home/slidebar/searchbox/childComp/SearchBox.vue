<template>
  <div class="search-warp">
    <div class="search-btn-box">
      <div
        class="select-btn"
        v-for="(item,index) in search_select"
        :key="item.className"
      >
        <span
          :class="[
            'select-btn',
            'iconfont',
            item.className,
            item.className === selected.className ? 'is-select' : '',
          ]"
          @click="changSearch(index)"
        ></span>
      </div>
    </div>
    <div class="search-box">
      <el-input
        placeholder="请输入内容"
        v-model="search_value"
        clearable
        @input="debounceOnInput"
        @clear="clearTipArr"
        @keydown.enter.native="debounceEnSearch"
        v-show="isShowSearchBox"
        ><i
          slot="prefix"
          class="el-input__icon el-icon-search"
        ></i>
      </el-input>
      <el-button
        type="primary"
        @click="debounceEnSearch"
        v-show="isShowSearchBox"
        >{{ selected.name + "搜索" }}</el-button
      >
      <div class="tip-bar" v-show="tipArr.length > 0">
        <ul>
          <li
            v-for="item in tipArr"
            :key="item"
            @click="debounceItemSearch(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/index";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      search_value: "",
      tipArr: [],
      search_select: [
        {
          name: "百度",
          className: "icon-baidu",
          url: "https://www.baidu.com/s?ie=utf-8&word=",
        },
        {
          name: "bing",
          className: "icon-bing",
          url: "https://cn.bing.com/search?q=",
        },
        {
          name: "谷歌",
          className: "icon-google-circle-fill",
          url: "https://www.google.com/search?q=",
        },
        {
          name: "搜狗",
          className: "icon-icon-sougoudaichongshezhi",
          url: "https://www.sogou.com/web?_asf=www.sogou.comie=utf8&query=",
        },
        {
          name: "360",
          className: "icon-icon-test",
          url: "https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=",
        },
        {
          name: "微信",
          className: "icon-weixin",
          url:"https://weixin.sogou.com/weixin?type=2&ie=utf8&query="
        }
      ],
      selected: {
        name: "百度",
        className: "icon-baidu",
        url: "https://www.baidu.com/s?ie=utf-8&word=",
      },
      isShowSearchBox: true,
    };
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例,data,props）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {
    // 切换搜索引擎
    changSearch(index) {
      this.selected = this.search_select[index];
    },
    //搜索
    debounceOnInput: utils._debounce(function () {
      this.onInput();
    }, 150),
    onInput() {
      if (this.search_value !== "") {
        //组装查询地址
        const sugurl = `http://suggestion.baidu.com/su?wd=${this.search_value}&cb=window.baidu.sug`;
        //定义回调函数
        const _this = this;
        window.baidu = {
          sug: function (json) {
            _this.tipArr = json.s;
          },
        };
        //动态添加JS脚本
        var script = document.createElement("script");
        script.src = sugurl;
        //添加script标签
        document.body.appendChild(script);
        //添加完成并发送请求后 删除标签
        script.onload = function () {
          document.body.removeChild(script);
        };
      } else {
        this.tipArr = [];
      }
    },
    clearTipArr() {
      this.tipArr = [];
    },

    debounceItemSearch: utils._debounce(function (text) {
      this.ItemSearch(text);
    }, 300),
    ItemSearch(text) {
      this.toSearch(text);
    },

    debounceEnSearch: utils._debounce(function () {
      this.enSearch();
    }, 300),
    enSearch() {
      if ("" === this.search_value) {
        return;
      }
      this.toSearch(this.search_value);
    },
    /**
     * text 搜索的内容
     */
    toSearch(text) {
      let newPage = document.createElement("a");
      newPage.setAttribute("href", this.selected.url + text);
      newPage.setAttribute("target", "_blank");
      newPage.click();
      newPage = null;
    },
  },
};
</script>

<style scoped>
@import url("~@/assets/img/search-btn/iconfont.css");
@import url("~@/assets/img/weixin-btn/iconfont.css");

.search-box >>> input {
  width: 300px;
}
.search-box >>> .el-input {
  margin-right: 10px;
}
</style>
<style lang="less"  scoped>
.search-warp {
  position: relative;
}
.search-btn-box {
  position: absolute;
  text-align: center;
  width: 100%;
  top: 0;
  left: 0;
  margin: 0 0 20px 0;
  .select-btn {
    display: inline-block;
    height: 60px;
    width: 50px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color: #aaa;
    span:hover {
      font-size: 24px;
      color: #fff;
      cursor: pointer;
    }
    .is-select {
      font-size: 24px;
      color: #409eff;
    }
  }
}

.search-box {
  width: 100%;
  position: absolute;
  top: 50px;
  left: 0;
  display: flex;
  justify-items: center;
}
// .show-icon {
//   margin-left: 100px !important;
//   transition: margin-left 0.8s ease-in-out;
// }
.tip-bar {
  width: 400px;
  height: auto;
  max-height: 300px;
  overflow: scroll;
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 99;
  margin: 5px 0;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  box-sizing: border-box;
  background-color: #fff;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  li {
    padding: 0 20px;
    margin: 0;
    line-height: 34px;
    cursor: pointer;
    color: #606266;
    font-size: 14px;
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
