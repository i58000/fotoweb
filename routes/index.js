'use strict';
var router = require('koa-router')();
const account = require('../tools/account');

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.throw(err)
  }
});

router.get('/', async function (ctx, next) {
  if (ctx.session.isNew) {
    await ctx.render('signin');
  }
  else {
    await ctx.redirect('index');
  }
})
  .post('/', account.login)
  .get('/signup', async (ctx, next) => {
    await ctx.render('signup');
  })
  .get('/delete', account.deluser);

// router.post('/signup', async (ctx, next) => {
//   var form = ctx.request.body;
//   form.password = require('md5')(form.password);
//   await db.signup(form);
//   ctx.session.username = form.username;
//   console.log('signup successful!');
//   ctx.redirect('index');
// });

router.get('/index', async function (ctx, next) {
  if (ctx.session.isNew) {
    await ctx.redirect('/');
  }
  await ctx.render('index');
});

router.get('/signout', async function (ctx, next) {
  ctx.session = null;
  ctx.redirect('/');
});

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    await ctx.render('error');
  }
});

module.exports = router;
