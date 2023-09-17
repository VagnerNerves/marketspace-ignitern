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
            '@services': './src/services',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@storage': './src/storage',
            '@dtos': './src/dtos'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  }
}
