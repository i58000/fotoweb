'use strict';
const mongoose = require('mongoose');
const schema = require('./schema');

mongoose.connect('mongodb://localhost/swe2017', {
    config: { autoIndex: false }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function () {
    console.log('connect successfully!');
});

module.exports = {
    account: mongoose.model('Accounts', schema.account),
    course: mongoose.model('Courses', schema.course),
    homework: mongoose.model('Homeworks', schema.homework),
    discussion: mongoose.model('discussions', schema.discussion)
};

 