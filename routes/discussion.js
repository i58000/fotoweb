'use strict';
var router = require('koa-router')();
router.prefix('/discussion');

const discussion = require('../tools/discussion');

router.get('/:courseId', discussion.get)
    .post('/:id', discussion.add)
    .del("/:id", discussion.del);



// router.redirect('/', '/');

module.exports = router;