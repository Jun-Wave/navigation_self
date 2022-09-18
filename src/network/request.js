/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import config from "@/config/config.js"
import router from '@/router/index.js';
import { Message, Loading } from 'element-ui';


/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg, flag = true) => {
  if (flag) {
    Message({
      showClose: true,
      message: msg,
      type: 'success',
      duration: 2000
    });
  } else {
    Message({
      showClose: true,
      message: msg,
      type: 'warning',
      duration: 2000
    });
  }
}


/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login'
  });
}

let loadingInstance = null;//蒙版实例
let timer = null;//定时器
// 创建axios实例
let instance = axios.create({ timeout: 1000 * 60 });
/**
 * 设置默认post请求头
 * 1.表单方式 application/x-www-form-urlencoded
 *  使用qs.stringify(json格式)==>请求体格式
 *  data：id=11111&name=22222
 * 2.JSON方式 application/json
 *  data: json格式
 * 3.文件方式 multipart/form-data
 *  const formData = new FormData()
 *  formData.append('id', '11111')
 *  data: formData
 */
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.baseURL = config.baseURL;


/** 
 * 请求拦截器 
 * 1. 每次请求前，如果存在token则在请求头中携带token 
 * 2. 添加蒙板
 */
instance.interceptors.request.use(
  config => {
    // 添加遮罩层
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (loadingInstance !== null) {//如果存在则关闭
        loadingInstance.close();
      }
      loadingInstance = Loading.service({
        lock: true,
        text: '努力加载中！',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
    }, 800);
    return config;
  },
  error => Promise.error(error))

/** 
 * 响应拦截器
 * 
 */
instance.interceptors.response.use(
  // 请求成功
  res => {
    //如果请求返回快的话，就不需要loading
    // 清除定时器
    clearTimeout(timer);
    timer = null;
    // 请求返回后，关闭loading
    if (loadingInstance !== null) {
      loadingInstance.close();
    }
    if (res.status === 200) {
      const { data } = res;
      if (data) {
        if (data.code === 1000) {
          return Promise.resolve(data);
        } else {//数据出错
          const { code, msg } = data;
          // 状态码判断
          switch (code) {
            //未登录状态，跳转登录页
            case 101:
              tip("未登录,请登录", false)
              setTimeout(() => {
                toLogin();
              }, 1000);
              break;
            // 清除token并跳转登录页
            case 103:
              tip('登录过期，请重新登录', false);
              localStorage.removeItem('profile');
              setTimeout(() => {
                toLogin();
              }, 1000);
              break;
          }
          return Promise.resolve(data);
        }
      }
    } else {
      return Promise.reject(res.data);
    }

  },
  // 请求失败
  error => {
    /*1. 清除定时器*/
    // 清除定时器，如果请求回来了，就无需loading
    clearTimeout(timer);
    timer = null;
    // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
    if (loadingInstance !== null) {
      loadingInstance.close();
    }
    /*2. 判断是否为请求超时*/
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes('timeout')) {
      tip("请求超时！！！", false);
      return Promise.reject(error);// reject这个错误信息
    }
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    if (!window.navigator.onLine) {
      //跳转重新加载页面
      tip("断网了！！！", false);
      setTimeout(() => {
        router.push({
          path: "/reload",
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
      }, 1500);
    } else {
      return Promise.reject(error);
    }

  }
);

export default instance;
