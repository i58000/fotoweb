/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const router = require('koa-router')();
const foto = require('../db/foto');

const multer = require('koa-multer');
const upload = multer({ dest: './public/pic/tmp/' });

router.prefix('/foto');

router.post('/add/:type', upload.single('upfile'), foto.add)
    .post('/del', foto.del)
    .post('/editName', foto.editName)
    .post('/editDes', foto.editDes);
module.exports = router;
