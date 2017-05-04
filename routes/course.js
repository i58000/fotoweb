'use strict';
var router = require('koa-router')();
router.prefix('/course');

const course = require('../tools/course');

router.get('/:id', course.getCourse)
    .post('/', course.addCourse)
    .post('/:id/stu', course.addStu)
    .del('/:id/stu', course.delStd);




// router.redirect('/', '/');

module.exports = router;