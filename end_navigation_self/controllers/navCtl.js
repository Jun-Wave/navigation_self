const Common = require('../utils/common');
const Constant = require('../constant/constant');
const { Op } = require("sequelize");//运算操作
const NavMd = require('../models/navMd');
const CataMd = require('../models/cataMd');
const fs = require('fs');
const path = require("path");

module.exports = {
  getAllNav,
  addNav,
  addShareNav,
  addNavAndImg,
  editNav,
  editNavImg,
  editNavLocation,
  delNav,
  getAllNavAndSonNav
}

function addNav(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * post 请求
     * cid 所属目录id
     * title 名称
     * url 地址
     * introduce 介绍
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['cid', 'introduce', 'title', 'url'], cb);
    },
    createNav: ["checkParams", (result, cb) => {
      let { cid, introduce, title, url } = req.body;
      NavMd.create({
        cid,

        title,
        introduce,
        url
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }],

  };
  Common.autoFn(tasks, res, resObj);
}

function addShareNav(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * post 请求
     * cid 所属目录id
     * title 名称
     * url 地址
     * introduce 介绍
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['cid', 'introduce', 'imgurl', 'title', 'url'], cb);
    },
    createNav: ["checkParams", (result, cb) => {
      let { cid, introduce, imgurl, title, url } = req.body;
      NavMd.create({
        cid,

        title,
        introduce,
        url,
        imgurl
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }],

  };
  Common.autoFn(tasks, res, resObj);
}

function addNavAndImg(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * post 请求
     * cid 父id
     * title 名称
     * url 地址
     * imgurl logo地址
     * introduce 介绍
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['cid', 'introduce', 'title', 'url'], cb);
    },
    checkFile: cb => {
      Common.checkParams(req.file, ['originalname'], cb);
    },
    uploadImg: ["checkParams", "checkFile", (result, cb) => {
      //获取上传文件的拓展名称 
      const fileFormat = (req.file.originalname).split(".");
      let extension = fileFormat[fileFormat.length - 1];
      // let extension = ''
      //使用时间戳作为新文件名
      let fileName = new Date().getTime() + "." + extension;
      fs.writeFile(
        path.join(__dirname, "../public/img/logo/" + fileName),
        req.file.buffer,
        (err) => {
          if (err) {
            cb(Constant.SAVE_FILE_ERROR)
          } else {
            let path = Common.getImgUrl(req, fileName, '/img/logo/');
            cb(null, path)
          }
        }
      )
    }],
    createNav: ["uploadImg", (result, cb) => {
      let { cid, introduce, title, url } = req.body;
      let imgurl = result["uploadImg"];
      NavMd.create({
        cid,

        title,
        introduce,
        url,
        imgurl
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }],

  };
  Common.autoFn(tasks, res, resObj);
}


function getAllNav(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * get 请求
     * cid 目录id
     */
    checkParams: cb => {
      Common.checkParams(req.query, ['cid'], cb);
    },
    queryRootCata: ["checkParams", (result, cb) => {
      CataMd.findOne({
        where: {
          cid: req.query.cid
        }
      }).then(data => {
        if (data) {
          resObj.data = {
            cid: data.cid,
            title: data.title,
            pid: data.pid,
            layer: data.layer,
            introduce: data.introduce,
            createdAt: data.createdAt,
            navList: [],
            cataList: []
          }
          cb(null);
        } else {
          cb(Constant.DEFAULT_ERROR);
        }

      })
    }],
    queryCata: ["queryRootCata", (result, cb) => {
      CataMd.findAll({
        where: {
          pid: req.query.cid
        }
      }).then(data => {
        let list = [];
        if (data) {
          data.forEach(item => {
            list.push({
              cid: item.cid,
              title: item.title,
              pid: item.pid,
              layer: item.layer,
              introduce: item.introduce,
              createdAt: item.createdAt,
              isNav: false
            });
          });
        }
        resObj.data.cataList = list;
        cb(null);
      })
    }],
    queryAllNav: ["queryCata", (result, cb) => {
      NavMd.findAll({
        where: {
          cid: req.query.cid
        }
      }).then((data) => {
        let list = [];
        if (data) {
          data.forEach(item => {
            list.push({
              nid: item.nid,
              cid: item.cid,
              title: item.title,
              introduce: item.introduce,
              url: item.url,
              imgurl: item.imgurl,
              createdAt: item.createdAt,
              isNav: true
            });
          });
        }
        resObj.data.navList = list;
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

function getAllNavAndSonNav(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * get 请求
     * cid 目录id
     */
    checkParams: cb => {
      Common.checkParams(req.query, ['cid'], cb);
    },
    queryRootCata: ["checkParams", (result, cb) => {
      CataMd.findOne({
        where: {
          cid: req.query.cid
        }
      }).then(data => {
        if (data) {
          resObj.data = {
            cid: data.cid,
            title: data.title,
            pid: data.pid,
            layer: data.layer,
            introduce: data.introduce,
            createdAt: data.createdAt,
            fatherList: [],
            cataList: [],
            sonList: []
          }
          cb(null);
        } else {
          cb(Constant.DEFAULT_ERROR);
        }
      })
    }],
    queryCata: ["queryRootCata", (result, cb) => {
      CataMd.findAll({
        where: {
          pid: req.query.cid
        }
      }).then(data => {
        let list = [];
        if (data) {
          data.forEach(item => {
            list.push({
              cid: item.cid,
              title: item.title,
              pid: item.pid,
              layer: item.layer,
              introduce: item.introduce,
              createdAt: item.createdAt,
              isNav: false
            });
          });
        }
        resObj.data.cataList = list;
        cb(null);
      })
    }],
    queryAllNav: ["queryCata", (result, cb) => {
      NavMd.findAll({
        where: {
          cid: req.query.cid
        }
      }).then((data) => {
        let list = [];
        if (data) {
          data.forEach(item => {
            list.push({
              nid: item.nid,
              cid: item.cid,
              title: item.title,
              introduce: item.introduce,
              url: item.url,
              imgurl: item.imgurl,
              createdAt: item.createdAt,
              isNav: true
            });
          });
        }
        resObj.data.fatherList = list.concat(resObj.data.cataList);
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }],
    queryAllSonNav: ["queryAllNav", async (result, cb) => {
      console.log(111);
      const arr = resObj.data.cataList;
      // console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        let cataData = await CataMd.findAll({
          where: {
            pid: arr[i].cid
          }
        });
        console.log(cataData);
        let cataList = [];
        cataData.forEach(item => {
          cataList.push({
            cid: item.cid,
            title: item.title,
            introduce: item.introduce,
            url: item.url,
            imgurl: item.imgurl,
            createdAt: item.createdAt,
            isNav: true
          });
        });
        console.log(222);
        console.log(cataList);
        let navData = await NavMd.findAll({
          where: {
            cid: arr[i].cid
          }
        });
        console.log(444);
        let navList = [];

        navData.forEach(item => {
          navList.push({
            cid: item.cid,
            title: item.title,
            introduce: item.introduce,
            url: item.url,
            imgurl: item.imgurl,
            createdAt: item.createdAt,
            isNav: true
          });
        });

        console.log(333);
        console.log(navList);
        resObj.data.sonList.push(navList.concat(cataList));
        console.log(resObj.data);
      }
      cb(null);
    }],
  };
  Common.autoFn(tasks, res, resObj);
}



function editNav(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * put 请求
     * nid id
     * introduce 介绍
     * title 名称
     * url: 网址地址
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['nid', 'introduce', 'title', 'url'], cb);
    },
    editNav: ["checkParams", (result, cb) => {
      let { nid, introduce, title, url } = req.body;
      NavMd.update({
        title,
        introduce,
        url,
      }, {
        where: {
          nid
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

function editNavImg(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * put 请求
     * nid id
     * img fromdata图片文件
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['nid'], cb);
    },
    checkFile: cb => {
      Common.checkParams(req.file, ['originalname'], cb);
    },
    delImg: ['checkFile', "checkParams", (result, cb) => {
      NavMd.findOne({
        where: {
          nid: req.body.nid
        }
      }).then(data => {
        //获取图片地址
        //删除文件
        if (data.imgurl !== null && data.imgurl !== "") {
          const fileName = data.imgurl.split("/img/logo/")[1];
          fs.unlink(path.join(__dirname, "../public/img/logo/" + fileName),
            function (err) {
              if (err) {
                console.log(err);
                cb(Constant.UPDATE_ERROR);
              }
            })

        }
        cb(null);
      }).catch(err => {
        console.log(err);
        cb(Constant.DELETE_ERROR);
      })
    }],
    uploadImg: ["delImg", (result, cb) => {
      //获取上传文件的拓展名称 
      const fileFormat = (req.file.originalname).split(".");
      let extension = fileFormat[fileFormat.length - 1];
      // let extension = ''
      //使用时间戳作为新文件名
      let fileName = new Date().getTime() + "." + extension;
      fs.writeFile(
        path.join(__dirname, "../public/img/logo/" + fileName),
        req.file.buffer,
        (err) => {
          if (err) {
            cb(Constant.SAVE_FILE_ERROR)
          } else {
            let path = Common.getImgUrl(req, fileName, '/img/logo/');
            cb(null, path)
          }
        }
      )
    }],
    updateNav: ["uploadImg", (result, cb) => {
      let imgurl = result["uploadImg"];
      NavMd.update({
        imgurl
      }, {
        where: {
          nid: req.body.nid
        }
      }).then((res) => {
        cb(null);
      }).catch(err => {
        //创建错误
        console.log(err);
        cb(Constant.DEFAULT_ERROR);
      })
    }],

  };
  Common.autoFn(tasks, res, resObj);
}

function editNavLocation(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * post 请求
     * nid: id
     * cid 所属目录id
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['nid', 'cid'], cb);
    },
    editNav: ["checkParams", (result, cb) => {
      NavMd.update({
        cid: req.body.cid
      }, {
        where: {
          nid: req.body.nid
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


function delNav(req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  let tasks = {
    /**
     * delete 请求
     * [nid1,nid2]
     */
    checkParams: cb => {
      Common.checkParams(req.body, ['nidArr'], cb);
    },
    delImg: ["checkParams", (result, cb) => {
      let { nidArr } = req.body;
      if (!Array.isArray(nidArr)) {
        cb(Constant.DEFAULT_ERROR);
      }
      const list = [];
      req.body['nidArr'].forEach((item) => {
        list.push(
          NavMd.findOne({
            where: {
              nid: item
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
    delNav: ["delImg", (result, cb) => {
      let { nidArr } = req.body;
      NavMd.destroy({
        where: {
          nid: {
            [Op.in]: nidArr
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
