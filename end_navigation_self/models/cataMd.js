const Sequelize = require('sequelize');//引入Sequelize模块
const db = require('../utils/mysqlDb');

//目录表
const Catalogue = db.define('Catalogue',
  {
    cid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    introduce: {
      type: Sequelize.STRING,
    },
    pid: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    layer: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }  
  },{
    underscored: true, //支持驼峰
    tableName: 'catalogue' //表名
  }
);

module.exports = Catalogue;
