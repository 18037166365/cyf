const KoaRouter = require('koa-router');
const session = require('koa-session');
const Models = require('../models');
const router = new KoaRouter();
const { Op } = require('sequelize')

router.get('/getUser', async ctx => {
  let rsCount = await Models.Users.findAndCountAll({ });
  console.log('rsCount')
  console.log(rsCount)

  let rs = await Models.Users.findAll({})
  console.log(rs)
  ctx.body = {
    code: 0,
    data: rs,
    total: rsCount.count,
    msg: 'from hospital???'
  }
});

router.get('/get', async (ctx) => {
  ctx.session.username = "张三111";
  ctx.body = 'hello world'
})
router.get('/session', async (ctx) => {
  ctx.body = ctx.session
})


router.post('/login', async ctx => {
  const { username, password } = ctx.request.body;
  // ctx.redirect('/')
  if(!username && password) {
    ctx.code = {
      code: 1,
      msg: "用户名和密码不能为空"
    }
    return
  }

   let result = await Models.Users.findOne({
     where: {
       username,
       password
     }
   })

     console.log(result)
   if(result == null) {
      ctx.body = {
        code: 2,
        msg: "账号或密码错误"
      }
      return
   }

  //  console.log(result)
  //  if(result == null) {
  //     ctx.body = {
  //       code: 2,
  //       msg: "用户名不存在"
  //     }
  //     return
  //  } else {
  //    console.log(result)
  //    const passwordValidation = result.get('password')
  //    if(md5(password) !== passwordValidation) {
  //     ctx.body = {
  //       code: 1,
  //       data: result,
  //       msg: '密码错误'
  //     }
  //     return
  //    }
    ctx.session.username = result.get('username')
    //  ctx.cookies.set('username', result.get('username'), { signed: false, httpOnly: false })
    // console.log('result.get(id)', result.get('id'));
    //  ctx.session.uid =result.get('id')
    //  console.log('ctx.session.uid: ', ctx.session.uid);
    // ctx.session.userinfo='张三'


     ctx.body = {
      code: 0,
      data: result,
      msg: '登录成功',
      session: ctx.session
    }
  //  }
})


const hospitalRoutes = require('./hospital')
const newsRoutes = require('./news')
const uploadRoutes = require('./upload')
const caseRoutes = require('./case')
const messageRoutes = require('./message')

router.use(hospitalRoutes.routes(), hospitalRoutes.allowedMethods());
router.use(newsRoutes.routes(), newsRoutes.allowedMethods());
router.use(uploadRoutes.routes(), uploadRoutes.allowedMethods());
router.use(caseRoutes.routes(), caseRoutes.allowedMethods());
router.use(messageRoutes.routes(), messageRoutes.allowedMethods());

module.exports = router;
