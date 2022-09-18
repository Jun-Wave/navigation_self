const async = require('async');
const Constant = require('../constant/constant');

const exportObj = {
  clone,
  checkParams,
  autoFn,
  getImgUrl
};

module.exports = exportObj;

/**
 * 克隆方法、对象
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 判断对象中[参数]是否非空
 * @param {请求的参数集} params 
 * @param {需要验证的参数} checkArr 
 * @param {回调} callback 
 */
function checkParams(params, checkArr, callback) {
  let flag = true;
  checkArr.forEach(v => {
    if (!params[v]) {
      flag = false;
    }
  });
  if (flag) {
    callback(null);//如果参数满足,则通过
  } else {
    //如果缺乏，则不通过，添加{code: 199,msg: '缺少必要参数'}
    //执行async.auto的回调函数
    callback(Constant.LACK);
  }
}

/**
 * 返回统一方法，返回JSON格式数据
 * @param tasks  当前controller执行tasks
 * @param res    当前controller responese
 * @param resObj 当前controller返回json对象
 */
function autoFn(tasks, res, resObj) {
  async.auto(tasks, function (err) {
    //错误返回错误信息
    if (!!err) {
      console.log(JSON.stringify(err));
      res.json({
        code: err.code || Constant.DEFAULT_ERROR.code,
        msg: err.msg || JSON.stringify(err)
      });

    } else {
      res.json(resObj);
    }
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} imgName 
 * @param {*} filePath 
 */
function getImgUrl(req, imgName, filePath) {
  const imgPath = req.protocol + "://" + req.get('host');
  if (!imgName) {
    return "";
  }
  return imgPath + filePath + imgName;
}
