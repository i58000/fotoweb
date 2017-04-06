const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/swe2017');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function () {
    console.log('connect successfully!');
});

module.exports = {
    
}
