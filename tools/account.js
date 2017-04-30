'use strict';
const account = require('./database')['account'];
const md5 = require('md5');

class AccountController {
    static async register(ctx, next) {
        let form = ctx.request.body;
        const acc = new account(form);
        // await acc.save();
        acc.save();
        ctx.response.body = "OK";
    }

    static async login(ctx, next) {
        let form = ctx.request.body;
        console.log(md5(form.password));
        let res = await account.findOne({
            'username.idNum': +form.username,
            'password': md5(form.password)
        }).select('username role');
        if (res !== null) {
            ctx.cookies.set('username', res.username);
            ctx.cookies.set('role', res.role);
            ctx.session.role = res.role;
            await ctx.redirect('index');
        }
        console.log('username or password incorect!')
        await ctx.render('error');
    }
    static async logout(ctx, next) {

    }
    static async deluser(ctx, next) {
        if (ctx.session.role !== 'admin') {
            ctx.throw("Admin Only!")
        }
    }
    static async resetpwd(ctx, next) {

    }
    
};

// export default AccountController;
module.exports = AccountController;





