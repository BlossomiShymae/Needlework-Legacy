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
      builderOptions: {
        productName: "Needlework",
      },
      chainWebpackRendererProcess: (config) => {
        config.plugin("html").tap((args) => {
          args[0].title = "Needlework";
          return args;
        });
      },
    },
  },
};
