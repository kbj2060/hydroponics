const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api', {
            target: `http://localhost:9000/`,
            changeOrigin: true
        })
    );
    app.use(
      createProxyMiddleware('/stream', {
        target: `http://121.157.207.47:9999/`,
        changeOrigin: true
      })
    )
};