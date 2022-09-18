var express = require('express');
var router = express.Router();
const multer = require('multer');
// 创建文件上传中间件
const uploadMiddleware = multer();
const navCtl = require('../controllers/navCtl');

//网址文件操作
router.post("/addNavAndImg",uploadMiddleware.single('img'), navCtl.addNavAndImg);
router.post("/addNav", navCtl.addNav);
router.post("/addShareNav", navCtl.addShareNav);

router.put('/editNav',navCtl.editNav);
router.put('/editNavImg',uploadMiddleware.single('img'),navCtl.editNavImg);
router.put('/editNavLocation',navCtl.editNavLocation);

router.delete('/delNav',navCtl.delNav);

router.get("/getAllNav",navCtl.getAllNav);
router.get("/getAllNavAndSonNav",navCtl.getAllNavAndSonNav);

module.exports = router;
