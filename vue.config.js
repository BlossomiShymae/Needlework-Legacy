module.exports = {
  pluginOptions: {
    css: {
      loaderOptions: {
        // `additionalData` was called `prependData` prior sass-loader 9.
        sass: { additionalData: '@import "@/scss/_variables.scss";' },
      },
    },
    electronBuilder: {
      preload: "src/preload.js",
      chainWebpackMainProcess: (config) => {
        config.module
          .rule("babel-background")
          .test(/\.js$/)
          .use("babel-loader")
          .loader("babel-loader")
          .options({
            plugins: [
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-optional-chaining",
            ],
          });
      },
    },
  },
};
