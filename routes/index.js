'use strict';
const router = require('koa-router')();
const account = require('../db/account');
const type = require('../db/type');
const foto = require('../db/foto');

router.get('/', async function (ctx, next) {
    let data = {topType: await type.getTop()};
    await ctx.render('index',{
        data
    });
});
router.get('/about', async function (ctx, next) {
    let data = {topType: await type.getTop()};
    await ctx.render('about', {
        data
    });
});

router.get('/admin', async function (ctx, next) {
    // console.log(ctx.session.username);
    if(ctx.session.username === undefined){
        let data = {topType: await type.getTop()};
        await ctx.render('login',{
            data
        });
    }
    else{
        let topType = await type.getTop();
        let subType = await type.getSub();
        let allFoto;
        if(topType.length === 0) allFoto = [];
        else allFoto = await foto.get(topType[0].name);

        console.log(subType);

        let data = {
            topType,
            subType,
            allFoto,
            curType: subType[0]
        };
        await ctx.render('admin',{
            data
        });
    }
});
router.get('/admin/:type', async function (ctx, next) {
    let data = {topType: await type.getTop()};
    if(ctx.session.username === undefined){
        await ctx.render('login',{
            data
        });
    }
    else{
        let topType = await type.getTop();
        let subType = await type.getSub();
        let allFoto = await foto.get(ctx.params.type);
        let curType = subType[0];
        for(let i in subType){
            if(subType[i].name === ctx.params.type){
                curType = subType[i];
            }
        }
        let data = {
            subType,
            topType,
            allFoto,
            curType
        };
        await ctx.render('admin',{
            data: data
        });
    }
});

router.post('/login', account.login);
router.get('/logout', account.logout);

module.exports = router;
