module.exports = {
  devServer: {
    proxy: {
      '/xd': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/xd' : ''}
      }
    }
  }
}