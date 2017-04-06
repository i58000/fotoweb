var router = require('koa-router')();
var db = require('../tools/database');

router.get('/', async function (ctx, next) {
  if (ctx.session.isNew) {
    await ctx.render('signin');
  }
  else {
    await ctx.redirect('index');
  }
});
router.post('/', async (ctx, next) => {
  let form = ctx.request.body;
  form.password = require('md5')(form.password);
  if ((await db.signin(form)).length) {
    ctx.session.username = form.username;
    console.log('signin successful!');
    await ctx.redirect('index')
  }
  else {
    console.log('password or username incorrect!');
    await ctx.render('error', form);
  }
});

router.get('/signup', async (ctx, next) => {
  await ctx.render('signup');
});
router.post('/signup', async (ctx, next) => {
  var form = ctx.request.body;
  form.password = require('md5')(form.password);
  await db.signup(form);
  ctx.session.username = form.username;
  console.log('signup successful!');
  ctx.redirect('index');
});

router.get('/index', async function (ctx, next) {
  if (ctx.session.isNew) {
    await ctx.redirect('/');
  }
  await ctx.render('index');
});

module.exports = router;
