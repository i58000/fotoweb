'use strict';
const mongoose = require('mongoose');
const md5 = require('md5');

const ObjectId = mongoose.Schema.Types.ObjectId;

const account = new mongoose.Schema({
    username: {
        name: String,
        idNum: {
            type: Number,
            set: (v) => +v,
            unique: true
        }
    },
    password: {
        type: String,
        set: v => md5(v ? v : '233,666')
    },
    role: {
        type: String,
        default: 'student',
        enum: ['admin', 'teacher', 'student']
    },
    courseId: [ObjectId],
});

const course = new mongoose.Schema({
    name: String,
    teacher: ObjectId,
    student: [ObjectId],
    homework: [ObjectId],
    // date, description, etc. anything you want
    etc: mongoose.Schema.Types.Mixed
});

const homework = new mongoose.Schema({
    course: {
        type: ObjectId,
        required: [true, 'no course assigned!']
    },
    duedate: Date,
    student: [ObjectId]
});

const discussion = new mongoose.Schema({
    course: {
        type: ObjectId,
        required: [true, 'no course assigned!']
    },
    history: [{
        name: ObjectId,
        date: Date,
        content: String
    }]
});

module.exports = {
    account,
    course,
    homework,
    discussion
};
