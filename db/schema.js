/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const md5 = require('md5');
// const ObjectId = mongoose.Schema.Types.ObjectId;

const account = new mongoose.Schema({
    username: String,
    password: String,
});

const foto = new mongoose.Schema({
    name: String,
    des: String,
    type: String
});

const type = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    des: String,
    father: {
        type: String,
        default: null
    },
    subType: [ObjectId],
    // foto: [ObjectId],
    isTop: {
        type: Boolean,
        default: true
    }, //
    isSub: {
        type: Boolean,
        default: true
    }
    // sub: [String],
});

module.exports = {
    account,
    type,
    foto
};
