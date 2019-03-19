const KoaRouter = require('koa-router');
const session = require('koa-session');
const Models = require('../models');
const router = new KoaRouter();
const { Op } = require('sequelize')
const addtoken = require('../token/addToken');
const proving = require('../token/proving')

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

router.get('/getAuth', async ctx => {
  let token = ctx.request.header.authorization;
  console.log('token: ', token);
  if (token){
  //  获取到token
    let res = proving(token);
    console.log('res: ', res);

      if (res && res.exp > new Date()/1000){
        ctx.body = {
          msg:'ojbk',
          code: 0,
          res
        }
        return
      }else {
        ctx.body = {
          msg: '您暂未登陆, 或者登陆已过期',
          code: 401,
        };
        return
        }
        return
    } else{  // 没有取到token
      ctx.body = {
        msg:'您暂未登陆, 或者登陆已过期',
        code: 401
      }
      return
    }
});


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
    let tk = addtoken({user:result.get('username'),id:result.get('id')})
    console.log('tk: ', tk);

    // ctx.session.username = "张三111";
    // ctx.session.name = result.get('username')
    //  ctx.cookies.set('username', result.get('username'), { signed: false, httpOnly: false })
    // console.log('result.get(id)', result.get('id'));
    //  ctx.session.uid =result.get('id')
    //  console.log('ctx.session.uid: ', ctx.session.uid);
    // ctx.session.userinfo='张三'


     ctx.body = {
      code: 0,
      data: result,
      msg: '登录成功',
      session: ctx.session,
      tk
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
