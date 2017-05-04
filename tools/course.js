'use strict';
const db = require('./database');
const course = db.course;
const homework = db.homework;
const discussion = db.discussion;

class CourseController {
    static async getCourse(ctx, next) {
        
    }
    static async addCourse(ctx, next) {
    }

    static async addStu(ctx, next) {
    }

    static async delStd(ctx, next) {
    }
    
    // static async addHw(ctx, next) {
    // }

    // static async delHw(ctx, next) {
    // }
};

module.exports = CourseController;
