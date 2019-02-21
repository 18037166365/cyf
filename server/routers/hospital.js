const KoaRouter = require('koa-router');

const Models = require('../models');
const router = new KoaRouter();
const { Op } = require('sequelize')

router.get('/getHospitalList', async ctx => {
  let rs = await Models.Hospital.findAndCountAll();

  ctx.body = {
    code: 0,
    data: rs.rows,
    msg: 'hello sb'
  }
})

router.post('/toogle', async ctx => {
  const { id } = ctx.request.body

  const rs = await Models.Messages.findOne({
    where: {
      id
    }
  })
  if(rs) {
    const rsStatus = rs.get('status')
    console.log(rsStatus)
    const statusChangeTo = rsStatus == 0? 1:0
   const updateRs = rs.update({
      status: statusChangeTo
    })
    ctx.body = {
      code: 0,
      data: {
        id: rs.get('id'),
        status: statusChangeTo
      }
    }
  } else {
    ctx.body = {
      code: 1,
      msg: '传入的id有误'
    }
  }


})

router.post('/addHospital', async ctx => {
  const { title, content, from=""  } = ctx.request.body
  if(!content || !title) {
    ctx.body = {
      code: 1,
      msg: "医院信息不能为空"
    }
    return
  }

  let rs = await Models.Hospital.create({
    content,
    title,
    from
  })

    ctx.body = {
      code: 0,
      data: {
        id: rs.get('id'),
        title: rs.get('title'),
        from: rs.get('from'),
        count: rs.get('count'),
        updatedAt: rs.get('updatedAt'),
      },
      msg: '创建成功'
    }
})

router.post('/delete', async ctx => {
  const { id } = ctx.request.body
  console.log(id)
  const rs = await Models.Messages.find({
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



module.exports = router;
