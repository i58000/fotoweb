'use strict';
const db = require('./database');
const course = db.course;
const homework = db.homework;
const discussion = db.discussion;

class HomeworkController {
    static async add(ctx, next) {
    }

    static async del(ctx, next) {
    }

    // student only    
    static async submitHw(ctx, next) {
    }

    static async changeDue(ctx, next) {
    }
};

module.exports = HomeworkController;
