const KoaRouter = require('koa-router');

const Models = require('../models');
const router = new KoaRouter();
const { Op } = require('sequelize')
const proving = require('../token/proving')

router.get('/getHospitalList', async ctx => {
  const { id=null } = ctx.query;
  console.log('id: ', id);

  if(id) {
    let rs = await Models.Hospital.findOne({
      where: {
        id
      }
    });
    console.log('rs: ', rs);
      console.log('rs: ', rs);
      ctx.body = {
        code: 0,
        data: rs
      }

  } else {
    let rs = await Models.Hospital.findAndCountAll({});
    ctx.body = {
      code: 0,
      data: rs.rows,
      count: rs.count,
      rs,
      session: ctx.session
    }
  }
})


router.post('/addHospital', async ctx => {
  const { name, logo, content, id  } = ctx.request.body
  if(!content || !name || !logo) {
    ctx.body = {
      code: 1,
      msg: "医院信息不能为空"
    }
    return
  }
  console.log('id',id)
  if(id) {
    let rs = await Models.Hospital.findById(id).then(res => {
      updateRs = res.update({
        content,
        name,
        logo
      })
      ctx.body = {
        code: 0,
        data: {
          updateRs,
          id: updateRs.get('id'),
          name: updateRs.get('name'),
          logo: updateRs.get('logo'),
          content: updateRs.get('content'),
          updatedAt: updateRs.get('updatedAt'),
        },
        msg: '更新成功'
      }
    })
  }else {
    let rs = await Models.Hospital.create({
      content,
      name,
      logo
    })
    ctx.body = {
      code: 0,
      data: {
        id: rs.get('id'),
        name: rs.get('name'),
        logo: rs.get('logo'),
        content: rs.get('content'),
        updatedAt: rs.get('updatedAt'),
      },
      msg: '创建成功'
    }
  }
})

router.post('/deleteHospital', async ctx => {
  const { id } = ctx.request.body
  console.log(id)
  const rs = await Models.Hospital.find({
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
