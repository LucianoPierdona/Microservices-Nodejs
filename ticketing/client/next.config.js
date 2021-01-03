module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptios.poll = 300;
    return config;
  },
};
