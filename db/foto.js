/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const foto = require('./database')['foto'];
const fm = require('./fileManager');

// const sleep = require('sleep');


class FotoController {
    static async get(type) {
        return await foto.find({
            'type': type
        });
    }
    static async getLine(ctx, next) {
        let type = ctx.params.type;
        let line = ctx.params.line;
        console.log(type);
        console.log(line);
        let res = await foto.find({
            'type': type
        }).skip(4*line).limit(4);
        for(let i in res){
            res[i] = {
                name: res[i].name,
                des: res[i].des
            }
        }
        // sleep.sleep(5);

        return ctx.body = res;
    }
    static async delType(name) {
        console.log(name);
        foto.remove({
            type: name
        }, function(err, docs){
            if(err) console.log(err);
            console.log('删除成功：' + docs);
        });
    }
    static async modType(oname, name) {
        console.log(oname,name);
        foto.update({
            type : oname
        },{
            $set:{'type': name}
        },{
            multi: true
        },(res)=>{
            console.log(res)
        });
    }
    static async add(ctx, next) {
        let file = ctx.req.file;
        let des = ctx.req.body.newfotodes;
        let type = ctx.params.type;

        if(file === undefined) return ctx.redirect('/admin/' + type + '?error');

        let { originalname, path, mimetype } = file;

        let res = await foto.findOne({
            name: originalname,
            type: type
        });
        if(res) return ctx.redirect('/admin/' + type + '?error');
        let newfoto = new foto({
            name: originalname,
            des: des,
            type: type
        });
        newfoto.save();
        fm.addFoto(path,type,originalname);
        return ctx.redirect('/admin/' + type + '?ok');
    }

    static async del(ctx, next) {
        let name = ctx.request.body.name;
        let type = ctx.request.body.type;

        let res = await foto.findOne({
            name: name,
            type: type
        });
        console.log(res);
        await foto.findByIdAndRemove(res._id);
        return ctx.body = await fm.delFoto(type, name);
    }
    static async editName(ctx, next) {
        let type =  ctx.request.body.type;
        let oname =  ctx.request.body.name;
        let name =  ctx.request.body.fotonewname;

        let ores = await foto.findOne({
            type: type,
            name: name
        });
        if(ores) return ctx.body = 'NAME EXIST';

        let nres = await foto.findOne({
            type: type,
            name: oname
        });
        if(nres === null) return ctx.body = 'ERROR';

        nres.name = name;
        nres.save();
        fm.modFoto(type,oname,name);
        return ctx.body = 'OK';
    }
    static async editDes(ctx, next) {
        let type =  ctx.request.body.type;
        let oname =  ctx.request.body.name;
        let des =  ctx.request.body.fotonewdes;

        let res = await foto.findOne({
            type: type,
            name: oname
        });
        console.log(type, oname)
        if(res === null) return ctx.body = 'ERROR';

        res.des = des;
        res.save();
        return ctx.body = 'OK';
    }
}

// export default AccountController;
module.exports = FotoController;