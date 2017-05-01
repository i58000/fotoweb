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
            ctx.session.idNum = res.username.idNum;
            ctx.session.role = res.role;
            await ctx.redirect('index');
        }
        console.log('username or password incorect!')
        await ctx.render('error');
    }
    static async logout(ctx, next) {
        ctx.session = null;
        ctx.redirect('/');
    }
    static async deluser(ctx, next) {
        if (ctx.session.role !== 'admin') {
            ctx.throw("Admin Only!");
        }
        account.findByIdAndRemove(ctx.request.body._id);
        ctx.response.body = "OK";
    }
    static async resetpwd(ctx, next) {
        let res = await account.findById(ctx.response.body._id);
        if (res.username.idNum !== ctx.session.idNum || ctx.session.role !== 'admin') {
            ctx.throw('permission denied!');
        }
        res.password = ctx.response.body.password;
        res.save();
        ctx.response.body = "OK";
    }
    
};

// export default AccountController;
module.exports = AccountController;





