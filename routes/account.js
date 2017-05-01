var router = require('koa-router')();
const account = require('../tools/account');
    
router.prefix('/account');

router.use(async (ctx, next) => {
    if (ctx.session.isNew) {
        ctx.throw('you have to login first!');
    }
    else {
        await next();
    }
});

router.get('/', function (ctx, next) {
    ctx.body = 'this is a account response!';
})

router.post('/register', account.register);

router.post('/resetpwd', account.resetpwd);

router.post('/deluser', account.deluser);

// router.redirect('/', '/');

module.exports = router;