module.exports = {
  /** ************ proxy *******************/
  '/xx/**': {
    type: 'proxy',
    target: 'http://xx.xx.cn/',
    headers: {
      'X-Real-IP': '127.0.0.1'
    },
    changeOrigin: true
  }
}
