/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const router = require('koa-router')();
const page = require('../db/page');
router.prefix('/page');

router.get('/:class', page.get)
    .post('/modDes/:class', page.modDes)
    .put('/addFoto/:class', page.addFoto)
    .del('/delFoto/:class/:name', page.delFoto)
    .post('/modFotoDes/:class/:name', page.modFotoDes);

module.exports = router;