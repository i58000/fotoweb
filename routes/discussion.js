'use strict';
var router = require('koa-router')();
router.prefix('/discussion');

const discussion = require('../tools/discussion');

router.get('/:courseId', discussion.get)
    // name: String, stuId:ObjectId, content: String
    .post('/:courseId', discussion.add)
    // params: index( of history in the array): Number
    .del("/:courseId", discussion.del);



// router.redirect('/', '/');

module.exports = router;