(async function () {
  const koa = require('koa')
  const app = new koa()
  const KoaBodyparser = require('koa-bodyparser')
  const koaStaticCache = require('koa-static-cache')
  const koaStatic = require('koa-static')
  const router = require('./routers')
  const cors = require('koa-cors');
  const path = require('path')
  const session = require('koa-session')
  const jwt = require('koa-jwt')
  const logger = require('koa-logger')
  const onerror = require('koa-onerror')
  const secret = require('./config/secret')
  const err = require('./middlreware/error')



  // error handler
  onerror(app)
  app.use(logger())

// 此接口列表，过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
  path: [
      // 文章详情
      /^\/login/,
      //静态目录
      // /^\//,
      /^\/get/,
      // 分类
      // /^\/api\/v1\/category\/article\/list/
  ]
}))
app.use(err())


  app.use(KoaBodyparser())


  // app.keys = ['some secret hurr'];

  // const CONFIG = {
  //   key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  //   /** (number || 'session') maxAge in ms (default is 1 days) */
  //   /** 'session' will result in a cookie that expires when session/browser is closed */
  //   /** Warning: If a session cookie is stolen, this cookie will never expire */
  //   maxAge: 86400000,
  //   overwrite: true, /** (boolean) can overwrite or not (default true) */
  //   httpOnly: true, /** (boolean) httpOnly or not (default true) */
  //   signed: true, /** (boolean) signed or not (default true) */
  //   rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  //   renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  // };
  // app.use(session(CONFIG, app));


  //解决跨域
  app.use(cors());

  const staticPath = '../client'

  app.use(koaStatic(
    path.join( __dirname,  staticPath)
  ))

  // app.use(koaStaticCache('./public', {
  //   prefix: '/client',
  //   fzip: true
  // }))

  app.use(router.routes({
    // prefix: '/api/v1'
  }))

  app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
  });

  app.listen(3009)
  console.log('http://127.0.0.1:3009')
})();
