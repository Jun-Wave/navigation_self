import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import debounce from './mixins/debounce';
// 使用防抖
Vue.mixin(debounce);
Vue.config.productionTip = false
Vue.use(ElementUI);

/**
 * 图片剪切
 */
 import VueCropper from 'vue-cropper'
 Vue.use(VueCropper);
/*
 * 将工具库挂载到全局
 */
import utils from './utils/index';
Vue.prototype.$utils = utils;
/**
 * 事件总线
 */
Vue.prototype.$bus = new Vue();
/*
 * 将网络请求接口方法挂载到全局
 */
import api from './network/index';
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
