'use strict';
let router = require('koa-router')();
const fs = require('fs');

router.get('/index', async function (ctx, next) {
    await ctx.redirect('/');
});
router.get('/', async function (ctx, next) {
    await ctx.render('index',{
    });
});
router.get('/about', async function (ctx, next) {
    await ctx.render('about');
});
router.get('/concept', async function (ctx, next) {
    let files = fs.readdirSync('public/pic/concept');
    let data = {
        files,
        cls: 'concept'
    };
    await ctx.render('cls',{
        data
    });
});
router.get('/individual', async function (ctx, next) {
    let files = fs.readdirSync('public/pic/individual');
    let data = {
        files,
        cls: 'individual'
    };
    await ctx.render('cls',{
        data
    });
});
router.get('/portrait', async function (ctx, next) {
    let files = fs.readdirSync('public/pic/portrait');
    let data = {
        files,
        cls: 'portrait'
    };
    await ctx.render('cls',{
        data
    });
});

module.exports = router;
