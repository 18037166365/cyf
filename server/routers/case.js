const KoaRouter = require('koa-router');

const Models = require('../models');
const router = new KoaRouter();
const { Op } = require('sequelize')

router.get('/getCaseList', async ctx => {
  const { id=null } = ctx.query;

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
    let rs = await Models.Case.findAndCountAll({});
    ctx.body = {
      code: 0,
      data: rs.rows,
      count: rs.count,
      rs
    }
  }
})


router.post('/addCase', async ctx => {
  const { name, age, headImg, content, id=null  } = ctx.request.body
  if(!content || !name || !headImg || !age) {
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
        name, age, headImg, content, id
      })
      ctx.body = {
        code: 0,
        data: {
          updateRs,
          id: updateRs.get('id'),
          name: updateRs.get('name'),
          age: updateRs.get('age'),
          headImg: updateRs.get('headImg'),
          content: updateRs.get('content'),
          updatedAt: updateRs.get('updatedAt'),
        },
        msg: '更新成功'
      }
    })
  }else {
    let rs = await Models.Case.create({
      name, age, headImg, content
    })
    ctx.body = {
      code: 0,
      data: {
        id: rs.get('id'),
        name: rs.get('name'),
        age: rs.get('age'),
        headImg: updateRs.get('headImg'),
        content: rs.get('content'),
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
