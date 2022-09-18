const Sequelize = require('sequelize');//引入Sequelize模块
const db = require('../utils/mysqlDb');

// 定义models
const Nav = db.define('Nav',
  {
    nid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    cid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imgurl: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Date.now()
    },
    introduce: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },{
    underscored: true, //支持驼峰
    tableName: 'nav' //表名
  }
)

module.exports = Nav;
