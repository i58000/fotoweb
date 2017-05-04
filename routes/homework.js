'use strict';
var router = require('koa-router')();
router.prefix('/homework');

const homework = require('../tools/homework');

router.get('/:id', homework.get)
    .post('/', homework.add)
    .put('/:id', homework.changeDue)
    .del('/:id', homework.del);

router.put('/:id/:stuId', homework.submitHw);




// router.redirect('/', '/');

module.exports = router;