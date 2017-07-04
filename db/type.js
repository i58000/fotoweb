/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const type = require('./database')['type'];
const foto = require('../db/foto');
const fm = require('./fileManager');

class TypeController {
    static async getAll() {
        return await type.find();
    }
    static async getFromUrl(ctx, next) {
        let tn = ctx.url.split('/')[2];  //concept
        let t = await type.findOne({
            'name': tn
        });
        let fotos = await foto.get(tn);
        let data = {
            allType: await type.find(),
            fotos,
            type: t,
            username: ctx.session.username
        };
        await ctx.render('page',{
            data
        });
    }
    static async editDes(ctx, next) {
        console.log(ctx.params.type);
        let res = await type.findOne({
            'name': ctx.params.type
        });
        res.des = ctx.request.body.des;
        await res.save();
        return ctx.body = "OK";
    }
    static async editName(ctx, next) {
        let oname = ctx.params.type;
        let name = ctx.request.body.name;
        let ores = await type.findOne({
            'name': oname
        });
        if(ores===null) return ctx.body = 'ERROR';
        let nres = await type.findOne({
            'name': name
        });
        if(nres) return ctx.body = 'name exist';

        ores.name = name;
        ores.save();
        foto.modType(oname, name);
        fm.modType(oname, name);
        return ctx.body = "OK";
    }
    static async add(ctx, next) {
        let name = ctx.request.body.name;
        let des = ctx.request.body.des;
        if(name === 'tmp') return ctx.body = 'tmp is not allowed';
        let ores = await type.findOne({
            'name': name
        });
        if(ores) return ctx.body = 'NAME EXIST';
        let newType = new type({
            name: name,
            des: des
        });
        newType.save();
        fm.addType(name);
        return ctx.body = "OK";
    }
    static async del(ctx, next) {
        let name = ctx.request.body.type;
        let res = await type.findOne({
            'name': name
        });
        if(res === null) return ctx.body = "NAME IS NOT EXIST";
        await type.findByIdAndRemove(res._id);
        await foto.delType(name);
        fm.delType(name);
        ctx.body = "OK";
    }
}

// export default AccountController;
module.exports = TypeController;
