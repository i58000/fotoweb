'use strict';
const db = require('./database');
const course = db.course;
const homework = db.homework;
const discussion = db.discussion;

class DiscussionController {
    static async get(ctx, next) {
        return ctx.body = await discussion.findOne({ course: ctx.params.courseId });
    }
    
    static async add(ctx, next) {
        let discuss = await discussion.findOne({ course: ctx.params.courseId }).select('history');
        let params = ctx.request.body;
        console.log(params)
        discuss.history.push({
            name: params.name,
            id: params.stuId,
            content: params.content
        });
        await discuss.save();
        return ctx.body = discuss.history;
    }

    static async del(ctx, next) {
        let discuss = await discussion.findOne({ course: ctx.params.courseId }).select('history');
        discuss.history.pull(discuss.history[+ctx.request.body.index]);
        await discuss.save();
        return ctx.body = discuss.history;
    }
};

module.exports = DiscussionController;
