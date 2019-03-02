const KoaRouter = require('koa-router');

const Models = require('../models');
const router = new KoaRouter();
const { Op } = require('sequelize')

router.get('/getMessageList', async ctx => {
  const { id=null,page=1, pageSize=10 } = ctx.query;

  if(id) {
    let rs = await Models.Case.findOne({
      where: {
        id
      }
    });
      ctx.body = {
        code: 0,
        data: rs
      }

  } else {
    let rs = await Models.Case.findAndCountAll({
      offset:(page - 1) * pageSize,
      limit: pageSize
    });
    ctx.body = {
      code: 0,
      data: rs.rows,
      count: rs.count,
      rs
    }
  }
})


router.post('/addMessage', async ctx => {
  const { name, phoneNumber, content, id=null, status=null  } = ctx.request.body
  if(!content || !phoneNumber) {
    ctx.body = {
      code: 1,
      msg: "案例信息不能为空"
    }
    return
  }
  console.log('id',id)
  if(id) {
    let rs = await Models.Case.findById(id).then(res => {
      updateRs = res.update({
        name, phoneNumber, content, id, status
      })
      ctx.body = {
        code: 0,
        data: {
          updateRs,
          id: updateRs.get('id'),
          status: updateRs.get('status'),
          name: updateRs.get('name'),
          content: updateRs.get('content'),
          phoneNumber: updateRs.get('phoneNumber'),
          updatedAt: updateRs.get('updatedAt'),
        },
        msg: '更新成功'
      }
    })
  }else {
    let rs = await Models.Case.create({
      name, phoneNumber, content
    })
    ctx.body = {
      code: 0,
      data: {
        id: rs.get('id'),
        name: rs.get('name'),
        status: rs.get('status'),
        content: rs.get('content'),
        phoneNumber: rs.get('phoneNumber'),
        updatedAt: rs.get('updatedAt'),
      },
      msg: '创建成功'
    }
  }
})

router.post('/deleteCase', async ctx => {
  const { id } = ctx.request.body
  console.log(id)
  const rs = await Models.Case.find({
    where: {
      id
    }
  })
  console.log(rs)

  if(rs) {
   const deleteRs =  await rs.destroy()
   ctx.body = {
     code: 0,
     data: {
        id
     },
     msg: '删除成功'
   }
   return
  } else {
    ctx.body = {
      code: 1,
      rs
    }
  }
})

module.exports = router;