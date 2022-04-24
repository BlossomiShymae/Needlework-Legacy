module.exports = {
  css: {
    loaderOptions: {
      // `additionalData` was called `prependData` prior sass-loader 9.
      sass: {
        prependData:
          '@import "@/scss/_variables.scss"; @import "@/scss/_styles.scss";',
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.ts",
      disableMainProcessTypescript: false,
      mainProcessTypeChecking: true,
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
      // Provide an array of files that, when changed, will recompile the main process and restart Electron
      // Your main process file will be added by default
      mainProcessWatch: [
        "src/apis",
        "src/config",
        "src/libs",
        "src/services",
        "src/static",
        "src/themes",
      ],
    },
  },
};
