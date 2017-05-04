var router = require('koa-router')();
const account = require('../tools/account');
    
router.prefix('/account');

router.post('/register', account.register);

router.post('/resetpwd', account.resetpwd);

router.del('/deluser', account.deluser);

// router.redirect('/', '/');

module.exports = router;