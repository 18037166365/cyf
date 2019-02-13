(async function () {
  const koa = require('koa')
  const KoaBodyparser = require('koa-bodyparser')
  const koaStaticCache = require('koa-static-cache')
  const koaStatic = require('koa-static')
  const router = require('./routers')
  const cors = require('koa-cors');
  var path = require('path')

  const app = new koa()
  app.use(KoaBodyparser())

  const staticPath = '../client'

  app.use(koaStatic(
    path.join( __dirname,  staticPath)
  ))


  //解决跨域
  app.use(cors());

  // app.use(koaStaticCache('./public', {
  //   prefix: '/client',
  //   fzip: true
  // }))


  router.get('/', async (ctx) => {
    ctx.body = 'hello world'
  })

  app.use(router.routes())
  app.listen(3009)
  console.log('http://127.0.0.1:3009')
})();
