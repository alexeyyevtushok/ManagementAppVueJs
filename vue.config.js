module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/ManagementAppVueJs/'
      : '/',
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
