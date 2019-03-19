const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const util = require('util')
const verify = util.promisify(jwt.verify)
const statusCode = require('../util/status-code')
const proving = require('../token/proving')

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        try {
            const token = ctx.header.authorization  // 获取jwt
            console.log('ctx.header: ', ctx.header);
            console.log('token: ', token);

            if (token){
              //  获取到token
              let res = proving(token);
                if (res && res.exp <= new Date()/1000){
                    ctx.body = {
                      message: '登陆已过期',
                      code: 401
                    };
                    return
                  }else {
                    // todo
                    await next()
                  }
                  return
              } else{  // 没有取到token
                ctx.body = {
                  msg:'您未登录',
                  code: 4001
                }
                return

              }


            // if (token) {
            //     let payload
            //     try {
            //         payload = await verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
            //         ctx.user = {
            //             name: payload.name,
            //             id: payload.id
            //         }
            //     } catch (err) {

            //         err.status = 401;
            //         ctx.body = statusCode.ERROR_401('Token verify fail');
            //     }
            // }
        } catch (err) {
          console.log('err: ', err);
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = statusCode.ERROR_401('Unauthorized，请求需要用户的身份认证！');
            } else {
                ctx.body = statusCode.ERROR_404({err});
            }
        }
    }
}
