const defaultSourceExts = require("metro-config/src/defaults/defaults").sourceExts;

module.exports = {
  transformer: {
  	babelTransformerPath: require.resolve('@bit/sigzag.lib.src.react-native-css/transformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: [...defaultSourceExts, 'css', 'yml'],
  },
};
