var router = require('koa-router')();
const account = require('../tools/account');
    
router.prefix('/account');

router.get('/:id', )
/* params
    name: String,
    idNum: Number,
    password: String
    role(optional): ['admin', 'teacher', 'student']
*/
router.post('/register', account.register);

// params: password: String
router.put('/passwd/:id', account.resetpwd);

router.del('/:id', account.deluser);

// router.redirect('/', '/');

module.exports = router;