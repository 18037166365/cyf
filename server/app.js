(async function () {
  const koa = require('koa')
  const KoaBodyparser = require('koa-bodyparser')
  const koaStaticCache = require('koa-static-cache')
  const koaStatic = require('koa-static')
  const router = require('./routers')
  const cors = require('koa-cors');
  const path = require('path')
  const session = require('koa-session')



  const app = new koa()
  app.use(KoaBodyparser())


  app.use(session({
    keys: 'koa:session',
    signed: false
  }, app))

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


  router.get('/', async (ctx) => {
    ctx.body = 'hello world'
  })

  app.use(router.routes())
  app.listen(3009)
  console.log('http://47.94.110.229:3009')
})();
