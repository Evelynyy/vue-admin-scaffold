const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');

    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'));

    config.module
      .rule('images')
      .use('url-loader')
      .tap((options) => Object.assign(options, { limit: 100 * 1024 }))
      .end();
  },
  productionSourceMap: false,
  // webpack配置
  configureWebpack: {
    performance: {
      // 关闭webpack的性能提示
      hints: false,
    },
  },
  devServer: {
    // 配置代理
    proxy: {
      // /xxx 与 request.js 文件中设置的 baseURL 一致
      '/xxx': {
        target: 'http://xxxx',
        changeOrigin: true,
        // headers 可选
        headers: {
          xx: 'xxx',
        },
        ws: true,
        pathRewrite: {
          '^/xxx': '',
        },
      },
    },
  },
};
