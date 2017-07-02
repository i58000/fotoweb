/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const page = require('./database')['page'];
const fs = require('fs');

class PageController {

    static async get(ctx, next) {
        let cn = ctx.url.split('/')[2];  //concept
        // console.log(c);
        let files = fs.readdirSync('public/pic/' + cn);
        console.log(ctx.session)
        let data = {
            files,
            cls: cn,
            username: ctx.session.username
        };
        await ctx.render('cls',{
            data
        });
    }
    static async modDes(ctx, next) {

    }
}

// export default AccountController;
module.exports = PageController;
