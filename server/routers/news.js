const KoaRouter = require('koa-router');

const Models = require('../models');
const router = new KoaRouter();
const { Op } = require('sequelize')

router.get('/getNewsList', async ctx => {
  const { id= null } = ctx.query;
  console.log('id: ', id);

  if(id) {
    let rs = await Models.News.findOne({
      where: {
        id
      }
    });
    console.log('rs: ', rs);
      console.log('rs: ', rs);
      ctx.body = {
        code: 0,
        data: rs,
      sessionUid: ctx.session.uid

      }

  } else {
    let rs = await Models.News.findAndCountAll({});
    ctx.session.count = ctx.session.count + 1

    ctx.body = {
      code: 0,
      data: rs.rows,
      rs,
      session: ctx.session
    }
  }
})


router.post('/addNews', async ctx => {
  const { title, content, from="", id  } = ctx.request.body
  if(!content || !title) {
    ctx.body = {
      code: 1,
      msg: "医院信息不能为空"
    }
    return
  }
  console.log('id',id)
  if(id) {
    let rs = await Models.News.findById(id).then(res => {
      updateRs = res.update({
        content,
        title,
        from,
      })
      ctx.body = {
        code: 0,
        data: {
          id: updateRs.get('id'),
          title: updateRs.get('title'),
          from: updateRs.get('from'),
          content: updateRs.get('content'),
          count: updateRs.get('count'),
          updatedAt: updateRs.get('updatedAt'),
        },
        msg: '更新成功'
      }
    })
  }else {
    let rs = await Models.News.create({
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
        content: rs.get('content'),
        count: rs.get('count'),
        updatedAt: rs.get('updatedAt'),
      },
      msg: '创建成功'
    }
  }
})

router.post('/deleteNews', async ctx => {
  const { id } = ctx.request.body
  console.log(id)
  const rs = await Models.News.find({
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