/**
 * Created by ANJINSHUO on 2017/7/4.
 */
'use strict';
const fs = require('fs');
class fileManager {
    static async addType(name) {
        await fs.mkdir('./public/pic/' + name, (err)=>{
            if(err) console.log(err);
            return 'ERROR'
        });
        return 'OK'
    }
    static async delType(name) {
        let path = './public/pic/' + name;
        if( fs.existsSync(path) ) {
            let files = fs.readdirSync(path);
            files.forEach((file)=>{
                let curPath = path + "/" + file;
                if(fs.statSync(curPath).isFile()) {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
    static async modType(oname, name) {
        await fs.rename('./public/pic/'+ oname, './public/pic/'+ name, (err)=>{
            if(err) console.log(err);
            return 'ERROR'
        });
        return 'OK'
    }

    static async addFoto(path, type, originalname) {
        await fs.rename(path, './public/pic/'+ type + '/' + originalname, (err)=>{
            if(err) console.log(err);
            return 'ERROR'
        });
        return 'OK'
    }
    static async delFoto(type, name) {
        fs.unlink('./public/pic/' + type + '/' + name, (err)=>{
            if(err) console.log(err);
            return 'ERROR'
        });
        return 'OK'
    }
    static async modFoto(type, oname, name) {
        await fs.rename('./public/pic/'+ type + '/' + oname, './public/pic/'+ type + '/' + name, (err)=>{
            if(err) console.log(err);
            return 'ERROR'
        });
        return 'OK';
    }
}
module.exports = fileManager;