const path = require('path')
 
module.exports = {
  publicPath: "./",
  lintOnSave:false,   //配置关闭eslint
  productionSourceMap: false,//关闭浏览器中源代码展示
  // 设置路径别名
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
        'utils': '@utils'
      }
    }
  },
  
  // 代理
  devServer: {
    proxy: {
      '/myapi': {
        //  "/myapi/xxx" 代理到 接口：http://localhost:3002/xxx
        target: 'http://localhost:3002',//测试端口
        changeOrigin: true,
        //pathRewrite方法重写url
        pathRewrite: {
          '^/myapi': '/'
        }
      }
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, "./src/assets/css/less/global.less"),
      ],
    },
  },
  
}