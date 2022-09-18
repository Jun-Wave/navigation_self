var express = require('express');
var router = express.Router();

const cataCtl = require('../controllers/cataCtl');

//目录操作
router.get("/getAllCata",cataCtl.getAllCata);
router.post("/addCata",cataCtl.addCata);
router.put('/editCataTitle',cataCtl.editCataTitle);
router.put('/editCataLocation',cataCtl.editCataLocation);
router.delete('/delCata',cataCtl.delCata);


module.exports = router;
