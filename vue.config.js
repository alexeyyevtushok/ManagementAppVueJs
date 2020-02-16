module.exports = {
  publicPath: '/',
  outputDir: 'docs',
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      });
  }
};
