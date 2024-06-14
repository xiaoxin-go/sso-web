const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  configureWebpack:{
    output: {
      filename: 'app.js'
    }
  },
  transpileDependencies: true,
  devServer: {
    // disableHostCheck: true,//webpack4.0 开启热更新
    allowedHosts: ['localhost'],
    proxy: {
      '/api': {
        target: 'http://localhost:8030',

        ws: false,
        secure: false,
        // pathRewrite: { '^/api/': '/' },
      },
    },
  },
  lintOnSave: false,
});
