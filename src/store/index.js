import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowSearch: false,//是否展示搜索框
    cataTreeData: [],//cata的数据 用于移动
    pageBoxCid: 0,//Page中cid,
    cataTreeMap: null,//map 用Page的路径
    isExpand: true//是否展开子目录
  },
  mutations: {
    //修改是否展示搜索框
    setShowSearch(state, isShowSearch) {
      state.isShowSearch = isShowSearch;
    },
    //设置当前展示的目录
    setCid(state, cid) {
      state.pageBoxCid = cid;
    },
    //更新
    setCataTreeMap(state, map) {
      state.cataTreeMap = map;
    },
    //设置
    setTreeData(state, data) {
      state.cataTreeData = data;
    },
    //设置
    setIsExpand(state, isExpand) {
      state.isExpand = isExpand;
      localStorage.setItem("isExpand",isExpand);
    }
  },
  actions: {
  },
  modules: {
  }
})
