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
        set: (v) => v ? v : 'student',
        // default: 'student',
        enum: ['admin', 'teacher', 'student']
    },
    courseId: [ObjectId],
});

const course = new mongoose.Schema({
    name: String,
    teacher: {
        name: String,
        id: ObjectId
    },
    student: [{
        name: String,
        id: {
            type: ObjectId,
            unique: true
        }
    }],
    homework: [{
        name: String,
        id: ObjectId
    }],
    // date, description, etc. anything you want
    etc: mongoose.Schema.Types.Mixed
});

const homework = new mongoose.Schema({
    name: String,
    course: {
        type: ObjectId,
        required: [true, 'no course assigned!']
    },
    duedate: {
        type: Date,
        set: date => date ? date : new Date()
    },
    student: [ObjectId]
});

const discussion = new mongoose.Schema({
    course: {
        type: ObjectId,
        required: [true, 'no course assigned!']
    },
    history: [{
        name: String,
        id: ObjectId,
        date: {
            type: Date,
            default: new Date()
        },
        content: String
    }]
});

module.exports = {
    account,
    course,
    homework,
    discussion
};
