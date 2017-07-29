/**
 * Created by ANJINSHUO on 2017/7/2.
 */
'use strict';
const mongoose = require('mongoose');
const schema = require('./schema');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/fotoweb2', {
    config: { autoIndex: false }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function () {
    console.log('connect successfully!');
});

module.exports = {
    account: mongoose.model('Accounts', schema.account),
    foto: mongoose.model('Foto', schema.foto),
    type: mongoose.model('Type', schema.type),
};