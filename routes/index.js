'use strict';
const router = require('koa-router')();
const account = require('../db/account');
const type = require('../db/type');
const foto = require('../db/foto');

router.get('/', async function (ctx, next) {
    let data = {allType: await type.getAll()};
    await ctx.render('index',{
        data
    });
});
router.get('/about', async function (ctx, next) {
    let data = {allType: await type.getAll()};
    await ctx.render('about', {
        data
    });
});

router.get('/admin', async function (ctx, next) {
    // console.log(ctx.session.username);
    if(ctx.session.username === undefined){
        let data = {allType: await type.getAll()};
        await ctx.render('login',{
            data
        });
    }
    else{
        let allType = await type.getAll();
        let allFoto;
        if(allType.length === 0) allFoto = [];
        else allFoto = await foto.get(allType[0].name);
        let data = {
            allType: allType,
            allFoto: allFoto,
            curType: allType[0]
        };
        await ctx.render('admin',{
            data
        });
    }
});
router.get('/admin/:type', async function (ctx, next) {
    let data = {allType: await type.getAll()};
    if(ctx.session.username === undefined){
        await ctx.render('login',{
            data
        });
    }
    else{
        let allType = await type.getAll();
        let allFoto = await foto.get(ctx.params.type);
        let curType = allType[0];
        for(let i in allType){
            if(allType[i].name === ctx.params.type){
                curType = allType[i];
            }
        }
        let data = {
            allType: allType,
            allFoto: allFoto,
            curType: curType
        };
        await ctx.render('admin',{
            data: data
        });
    }
});

router.post('/login', account.login);
router.get('/logout', account.logout);

module.exports = router;
