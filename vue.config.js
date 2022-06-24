const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,//关闭eslint提示
  devServer: { host: 'localhost', port: 8080, 
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
      },
    },
  }
})
