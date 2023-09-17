module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@services': './src/services'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  }
}
