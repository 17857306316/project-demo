const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    // 中间件代理
    // 跨域是对前端而言的，是浏览器为了网络安全而作出的网络请求限制
    // 当请求不在当前host:port时，属于跨域请求，会被浏览器阻止
    // 当项目属于前后端分离的项目时，前端代码和后端代码通常不运行在同一个端口，甚至不在同一台主机上。为了使前端能够请求后端提供的接口，需要使用跨域技术
    app.use(proxy('/randy', {
        target: 'http://47.105.71.81:3306',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/randy": ""
        },
    }));
    app.use(proxy('/peter', {
        target: 'http://172.19.5.34:9531',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/peter": ""
        },
    }));
};