'use strict';
const db = require('./database');
const course = db.course;
const homework = db.homework;
const discussion = db.discussion;

class HomeworkController {
    static async get(ctx, next) {
        return ctx.body = await homework.findById(ctx.params.id);
    }
    
    static async add(ctx, next) {
        let params = ctx.request.body;
        let hw = new homework({
            name: params.name,
            course: params.courseId,
            duedate: params.duedate
        });
        await hw.save();
        let cour = await course.findById(params.courseId);
        cour.homework.push({
            name: hw.name,
            id: hw._id
        });
        await cour.save();
        return ctx.body = cour.homework;
    }

    static async del(ctx, next) {
        let hw = await homework.findById(ctx.params.id);
        let cour = await course.findById(hw.course).select('homework');
        cour.update({ $pull: { 'homework': { 'id': ctx.params.id } } });
        await cour.save();
        await homework.findByIdAndRemove(ctx.params.id);
        return ctx.body = cour.homework;
    }

    // student only    
    static async submitHw(ctx, next) {
        let hw = await homework.findById(ctx.params.id).select('student');
        hw.student.addToSet(ctx.params.stuId);
        await hw.save();
        return ctx.body = hw.student;
    }

    static async changeDue(ctx, next) {
        let hw = await homework.findById(ctx.params.id).select('duedate');
        hw.duedate = JSON.parse(ctx.request.body.duedate);
        await hw.save();
        return ctx.body = hw.duedate;
    }
};

module.exports = HomeworkController;
