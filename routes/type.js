/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const router = require('koa-router')();
const type = require('../db/type');
router.prefix('/t');

router.get('/:type', type.getFromUrl)
    .get('/getTop/',type.getTop)
    .post('/editDes/:type', type.editDes)
    .post('/editName/:type', type.editName)
    .post('/add', type.add)
    .post('/del', type.del);

module.exports = router;