//默认dev配置
const config = {
  DEBUG: true,//是否调试模式
  //默认mysql数据库连接配置  测试数据库
  MYSQL: {
    host: 'localhost',
    database: 'navigation_self',
    username: 'root',
    password: '123456'
  }
};

if (process.env.NODE_ENV === "production") {
  config.DEBUG= false,//是否调试模式
  //生产环境mysql数据库连接配置
  config.MYSQL = {
    host: 'localhost',
    database: 'navigation_self',
    username: 'root',
    password: '123456'
  }
}

module.exports = config;
