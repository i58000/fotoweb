const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/swe2017');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function () {
    console.log('connect successfully!');
});

const account = mongoose.model('account', mongoose.Schema({
    username: String,
    password: String
}));

const signin = async (user) => {
    console.log(user);
    return account.find(user, async (err, res) => {
        if (err) {
            console.log(err);
        }
        return res;
    });
}

const signup = async (user) => {
    const acc = new account(user);
    acc.save((err, acc) => {
        if (err) {
            console.log(err);
        }
        console.log(user);
    });
}

module.exports = {
    'signin': signin,
    'signup': signup
}
