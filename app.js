const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');
const account = require('./routes/account');

const cors = require('koa-cors');

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// session
app.keys = ['come secret hurr'];
app.use(require('koa-session')({
  key: 'cookie key',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
}, app));

// cors, not necessary
app.use(cors());

// view engine, changed to HTML
app.use(views(__dirname + '/views', {
  extension: 'html'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// db or other errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.throw(err);
  }
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(account.routes(), account.allowedMethods());


module.exports = app;
