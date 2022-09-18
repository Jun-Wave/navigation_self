module.exports = {
  DEFAULT_SUCCESS: {
    code: 1000,
    msg: 'ok'
  },
  DEFAULT_ERROR: {
    code: 500,
    msg: "发生错误"
  },
  NOT_LOGIN: {
    code: 101,
    msg: "没有登录"
  },
  
  LOGIN_ERROR: {
    code: 102,
    msg: "用户邮箱账号或者密码错误"
  },
  TOKEN_ERROR: {
    code: 103,
    msg: "身份验证失败,请重新登录！"
  },
  USER_REPEAT: {
    code: 104,
    msg: "用户已注册！"
  },
  USER_JION: {
    code: 105,
    msg: "加入成功！"
  },
  USER_ERROR: {
    code: 106,
    msg: "用户不存在！"
  },
  //表操作
  CREATE_ERROR: {
    code: 201,
    msg: "数据添加失败"
  },
  DELETE_ERROR: {
    code: 202,
    msg: "数据删除失败"
  },
  UPDATE_ERROR: {
    code: 203,
    msg: "数据更新失败"
  },
  GET_ERROR: {
    code: 203,
    msg: "数据查询失败"
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    msg: "资源没有找到！"
  },
  DATA_NOT_FOUND: {
    code: 405,
    msg: "查询不到数据！"
  },
  CODE_ERROR: {
    code: 601,
    msg: "验证码错误！"
  },
  SEND_ERROR: {
    code: 602,
    msg: "发送邮箱失败！"
  },
  SEND_TIME_NO: {
    code: 603,
    msg: "请60秒后再重新发送！"
  },
  SAVE_FILE_ERROR:{
    code: 701,
    msg: "保存文件失败！"
  },
  //token加密密码
  CRYPTO_KEY: "sfdf2343s4*37d@fd",
  //redis键值对
  tokenKey:"TokenNavTwo",
  sendKey: "SendNavTwo"
}