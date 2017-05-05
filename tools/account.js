'use strict';
const account = require('./database')['account'];
const md5 = require('md5');

class AccountController {
    static async getAccountInfo(ctx, next) {
        return ctx.body = await account.findById(ctx.params.id);
    }

    static async register(ctx, next) {
        let form = ctx.request.body;
        // console.log(form);
        const acc = new account({
            username: {
                name: form.name,
                idNum: form.idNum
            },
            password: form.password,
            role: form.role
        });
        // await acc.save();
        acc.save();
        return ctx.response.body = acc;
    }

    static async login(ctx, next) {
        let form = ctx.request.body;
        // console.log(form);
        let res = await account.findOne({
            'username.idNum': +form.username,
            'password': md5(form.password)
        }, 'username role');// .then((res) => console.log(res));
        if (res !== null) {
            ctx.cookies.set('username', res.username);
            ctx.cookies.set('role', res.role);
            ctx.session.idNum = res.username.idNum;
            ctx.session.role = res.role;
            return await ctx.redirect('index');
        }
        console.log('username or password incorect!')
        await ctx.render('error');
    }
    static async logout(ctx, next) {
        ctx.session = null;
        ctx.redirect('/');
    }
    static async deluser(ctx, next) {
        // if (ctx.session.role !== 'admin') {
        //     ctx.throw("Admin Only!");
        // }
        await account.findByIdAndRemove(ctx.params.id);
        ctx.body = "OK";
    }
    static async resetpwd(ctx, next) {
        let res = await account.findById(ctx.params.id);
        if (res.username.idNum !== ctx.session.idNum || ctx.session.role !== 'admin') {
            ctx.throw('permission denied!');
        }
        res.password = ctx.request.body.password;
        await res.save();
        return ctx.body = "OK";
    }
};

// export default AccountController;
module.exports = AccountController;





