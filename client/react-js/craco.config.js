module.exports = {
  devServer: {
    proxy: {
      '/server': {
        target: 'http://localhost:8080',
        pathRewrite: {'^/server' : ''}
      }
    }
  }
}