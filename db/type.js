/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const type = require('./database')['type'];
const foto = require('../db/foto');
const fm = require('./fileManager');

class TypeController {
    static async getTop() {
        let top = await type.find({
            'isTop': true
        });
        for(let i=0; i < top.length; i++){
            for(let j=0; j < top[i].subType.length; j++){
                top[i].subType[j] = await type.findById(top[i].subType[j]);
            }
        }
        return top;
    }
    static async getSub() {
        let sub = await type.find({
            'isSub': true
        });
        return sub;
    }
    static async getFromUrl(ctx, next) {
        let tn = ctx.url.split('/')[2];  //concept
        let t = await type.findOne({
            'name': tn
        });
        let fotos = await foto.get(tn);
        let data = {
            topType: await TypeController.getTop(),
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
        let father = ctx.request.body.father;

        if(name === 'tmp') return ctx.body = 'tmp is not allowed';
        let ores = await type.findOne({
            'name': name
        });
        if(ores) return ctx.body = 'NAME EXIST';

        let isSub = true;
        if(father === "添加一个父类") isSub = false; //标记
        else fm.addType(name); //如果不是添加父类，则新建文件夹

        let newType = new type({
            name: name,
            des: des,
            isSub: isSub
        });

        await newType.save();


        if(father !== "无父类" && father !== "添加一个父类" ){
            let s = await type.findOne({
                'name': name
            });
            s.isTop = false;
            s.father = father;
            let f = await type.findOne({
                'name': father
            });
            f.subType.push(s._id);
            s.save();
            f.save();
        }

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

        if(res.father !== null){
            let f = await type.findOne({
                name: res.father
            });
            if(f.subType.length === 1) f.remove();
            else f.subType.pull(res._id);
            await f.save();
        }

        ctx.body = "OK";
    }
}

// export default AccountController;
module.exports = TypeController;
