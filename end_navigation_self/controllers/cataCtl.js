const Common = require('../utils/common');
const Constant = require('../constant/constant');
const { Op } = require("sequelize");
const CataMd = require('../models/cataMd');;
const NavMd = require('../models/navMd');

module.exports = {
  getAllCata,
  addCata,
  editCataTitle,
  editCataLocation,
  delCata,
}

function addCata(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * post 请求
     * pid 父id
     * introduce 介绍
     * title 名称
     * flayer 父节点层级
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['pid', 'introduce', 'title', 'flayer'], cb);
    },
    createCate: ["checkParams", (result, cb) => {
      let { pid, introduce, title, flayer } = req.body;
      if (typeof flayer === "string") {
        flayer = parseInt(flayer);
      }
      CataMd.create({
        title,
        introduce,
        pid: pid,
        layer: flayer + 1
      }).then((res) => {
        resObj.data = res.dataValues;
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }]
  };
  Common.autoFn(tasks, res, resObj);
}

function getAllCata(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * get 请求
     * uid 用户id
     */
    // checkParams: cb => {
    //   Common.checkParams(req.query, ['uid'], cb);
    // },
    check: cb => {
      CataMd.findAll().then((data) => {
        if (data) {
          let list = [];
          data.forEach(item => {
            list.push({
              cid: item.cid,
              title: item.title,
              introduce: item.introduce,
              pid: item.pid,
              layer: item.layer,
              createdAt: item.createdAt
            });
          });
          resObj.data = list;
        }
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }
  };
  Common.autoFn(tasks, res, resObj);
}

function editCataTitle(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * post 请求
     * introduce 介绍
     * title 名称
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['cid', 'introduce', 'title'], cb);
    },
    editCate: ["checkParams", (result, cb) => {
      let { cid, introduce, title } = req.body;
      CataMd.update({
        title,
        introduce
      }, {
        where: {
          cid
        }
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }]
  };
  Common.autoFn(tasks, res, resObj);
}

function editCataLocation(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * post 请求
     * cid 该目录id
     * pid 父id
     * flayer 父节点层级
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['cid', 'pid', 'flayer'], cb);
    },
    editCate: ["checkParams", (result, cb) => {
      let { cid, pid, flayer } = req.body;
      if (typeof flayer === "string") {
        flayer = parseInt(flayer);
      }
      CataMd.update({
        pid: pid,
        layer: flayer + 1
      }, {
        where: {
          cid
        }
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }]
  };
  Common.autoFn(tasks, res, resObj);
}


function delCata(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * delete 请求
     * [cid1,cid2]
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['cidArr'], cb);
    },
    delCate: ["checkParams", (result, cb) => {
      const { cidArr } = req.body;
      if (!Array.isArray(cidArr)) {
        cb(Constant.DEFAULT_ERROR);
      }
      // if(cidArr.indexOf("1")!==-1||cidArr.indexOf(1)!==-1) {
      //   cb(Constant.DEFAULT_ERROR);
      // }
      CataMd.destroy({
        where: {
          cid: {
            [Op.in]: cidArr
          }
        }
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }],
    delImg: ["delCate", (result, cb) => {
      const list = [];
      req.body['cidArr'].forEach((item) => {
        list.push(
          NavMd.findOne({
            where: {
              cid: item
            }
          }).then(data => {
            //获取图片地址
            //删除文件
            if (data.imgurl !== null && data.imgurl !== "") {
              const fileName = data.imgurl.split("/img/logo/")[1];
              fs.unlink(path.join(__dirname, "../public/img/logo/" + fileName),
                function (err) {
                  if (err) {
                    cb(Constant.UPDATE_ERROR);
                  }
                })
            }
          }))
      })
      Promise.all(list).then(data => {
        cb(null);
      }).catch(err => {
        console.log(err);
        cb(Constant.DELETE_ERROR);
      })

    }],
    delNav: ["delCate",(result, cb) => {
      NavMd.destroy({
        where: {
          cid: {
            [Op.in]: cidArr
          }
        }
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }]
  };
  Common.autoFn(tasks, res, resObj);
}
