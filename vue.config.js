const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  // 站点路径
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '',

  // 资源路径
  assetsDir: 'static',

  // 代理跨域
  devServer: {
    // 目标服务器
    proxy: 'http://t_xinghuo.demo2.dx623.com/'
  },

  // js source-map
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true,//console
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            }
          }
        })
      ]
    }
  }
}

