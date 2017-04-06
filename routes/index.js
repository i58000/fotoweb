var router = require('koa-router')();
var db = require('../tools/database');

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
  });
})

// router.get('/foo', async function (ctx, next) {
//   await ctx.render('index', {
//     title: 'koa2 foo'
//   });
// });

module.exports = router;
