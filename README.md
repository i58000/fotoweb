# TeachingManagementSystem
Course project: a teaching management system

## 框架
* 后端: koa2
* 数据库：MongoDB, Mongoose

## 数据库备份与恢复
* 启动数据库 `./tools/databse.bat`
* 清空所有数据 `./tools/clean.bat`
* 备份数据库 `./tools/dump.bat`
* 数据库恢复 `./tools/restore.bat`

## 安装 & 启动
requires __node v7.6.0__ or higher for ES2015 and async function support.
```
$ npm install
$ npm start
```
访问 `http://localhost:2333`

## one more thing
接口定义在 `./routes` 下面，包括参数说明。所有接口都经过测试，测试命令在 `./toos/TestAPIs.sh` 里，前端可以仿照里面的命令格式发起请求。

`curl` 发起请求的时候，为了方便，可以将 `app.js` 里检测是否登陆的中间件注释掉：
```js
app.use(async (ctx, next) => {
  if (ctx.session.isNew) {
    ctx.throw(403, 'you have to login first!');
  }
  else {
    await next();
  }
});
```

PS：数据库的操作都定义在 `./tools` 下面，可以参考。