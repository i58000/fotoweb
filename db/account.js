/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const account = require('./database')['account'];

class AccountController {
    static async login(ctx, next) {
        let form = ctx.request.body;

        console.log(form);
        let res = await account.findOne({
            'username': form.username,
            'password': form.password
        });
        if (res !== null) {
            ctx.session.username = res.username;
            ctx.body = 'OK';
        }
        else {
            console.log('username or password incorect!');
            ctx.body = 'ERROR';
        }

    }
    static async logout(ctx, next) {
        console.log('acc')
        ctx.session = null;
        // ctx.render('login')
        ctx.redirect('/admin');
    }
}

// export default AccountController;
module.exports = AccountController;
