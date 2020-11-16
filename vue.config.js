module.exports = {
    publicPath: '',

    configureWebpack: {
        devtool: 'source-map'
    },

    pwa: {
      themeColor: '#DFE7EF',
      msTileColor: '#ACB8CC',
      manifestOptions: {
        background_color: '#ACB8CC'
      }
    }
};