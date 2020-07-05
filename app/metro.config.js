// eslint-disable-next-line
const { getDefaultConfig } = require('metro-config')

module.exports = getDefaultConfig().then((config) => ({
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve(
      '@bam.tech/react-native-graphql-transformer'
    ),
  },
  resolver: {
    sourceExts: [...config.resolver.sourceExts, 'gql', 'graphql'],
  },
}))
