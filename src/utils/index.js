import { Message } from 'element-ui';
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg,flag=true) => {
  if(flag) {
    Message({
      showClose: true,
      message: msg,
      type: 'success',
      duration: 2000
    });
  }else {
    Message({
      showClose: true,
      message: msg,
      type: 'warning',
      duration: 2000
    });
  }
  
}

const formatTime = date => {
  var date = new Date(date)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " + [hour, minute, second].map(formatNumber).join(":")
  );
};

// 格式化日期
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

// 获取当前日期
const getCurrentTime = () => {
  return new Date().format("yyyy-MM-dd");
};

//   两位整数显示
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

// 校验是否为有效身份证
const checkIdCard = idcard => {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!regIdCard.test(idcard)) {
    return false;
  } else {
    return true;
  }
};
/**
判断字符串是否是手机号码，若是则返回true,若否则返回false
**/
const checkPhone = phone => {
  return /^1(3\d|4\d|5\d|6\d|7\d|8\d|9\d)\d{8}$/g.test(phone);
};

//   手机显示尾号
const loadStarPhone = phone => {
  let dh = phone.substr(0, 3) + "****" + phone.substr(7);
  return dh;
};
// 校验日期
const checkDate = dateStr => {
  var a = /^(\d{4})-(\d{2})-(\d{2})$/;
  if (!a.test(dateStr)) {
    return false;
  } else {
    return true;
  }
};

// 校验是否为数字，可带小数点
const checknumber = val => {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(val)) {
    return true;
  }
  return false;
};

// 检测是否是姓名
const checkName = val => {
  var rel = new RegExp("^[\u4E00-\u9FA5\uf900-\ufa2d·]*$");
  if (!rel.test(val)) {
    return false;
  }
  return true;
};

// 检测字符串长度是否在区间内
const checkStringLength = (val, min, max) => {
  if (val.length > min && val.length < max) {
    return true;
  } else {
    return false;
  }
};

/* 截获url的参数 
    @return  false:未找到
    @param variable获取的目标参数名称 
    @anthor linshangyuan 
    @version V1 */
const getQueryVariable = variable => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
// 校验两位小数
const formatNumber2 = num => {
  let rel = /^(\d+|\d+\.\d{1,2})$/;
  if (!rel.test(num)) {
    return false;
  }
  return true;
};
// 校验一位小数
const formatNumber1 = num => {
  let rel = /^(\d+|\d+\.\d{0,1})$/;
  if (!rel.test(num)) {
    return false;
  }
  return true;
};
// 强制保留2位小数
const toDecimal2 = x => {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf(".");
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + 2) {
    s += "0";
  }
  return s;
};

// 防抖
function _debounce(fn, delay) {
  var delay = delay || 200;
  let timer = null
  return function () {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}
// 格式化时间月和日
function formatDate(data) {
  var date = new Date(data)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return M + D
}


//将数字（整数）转为汉字，从零到一亿亿，需要小数的可自行截取小数点后面的数字直接替换对应arr1的读法就行了
function tranToChinaNum(num) {
  var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
  var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿');//可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return "零";
  }
  var english = num.toString().split("")
  var result = "";
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i;//倒序排列设值
    result = arr2[i] + result;
    var arr1_index = english[des_i];
    result = arr1[arr1_index] + result;
  }
  //将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
  //合并中间多个零为一个零
  result = result.replace(/零+/g, '零');
  //将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
  //将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿');
  //移除末尾的零
  result = result.replace(/零+$/, '')
  //将【零一十】换成【零十】
  //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  //将【一十】换成【十】
  result = result.replace(/^一十/g, '十');
  return result;

}

const verifyqqEmail = num => {
  let rel = /^[1-9]\d{7,10}@qq\.com$/;
  if (!rel.test(num)) {
    return false;
  }
  return true;
};

//判断网址
const verifyPageUrl = num => {
  let rel = /^(https|http)(:\/\/)(www\.){0,1}(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+(:[0-9]+){0,1}/;//加上可以添加端口号
  if (!rel.test(num)) {
    return false;
  }
  return true;
};

export default {
  tip,//提示
  formatTime, //格式化时间
  toDecimal2, //格式化为两位小数
  formatNumber2, //校验两位小数
  formatNumber1, //校验一位小数
  checknumber, //校验是否为纯数字，可带小数点
  checkName, //校验是否为纯汉字
  checkPhone, //校验电话号码
  checkDate, //校验日期格式
  checkIdCard, //校验身份证号码
  _debounce, //防抖
  getCurrentTime, //获取当前时间
  checkStringLength, //检查字符串长度是否在区间内
  loadStarPhone, //显示手机尾号
  getQueryVariable, //截取url参数
  formatDate, //格式化时间
  tranToChinaNum,//将数字转为中文数字,
  verifyqqEmail,//验证qq邮箱
  verifyPageUrl,//验证网址,
};
