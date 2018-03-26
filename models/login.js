const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';


module.exports.checkIfAdmin = (email, cb) => {
    MongoClient.connect(url, (err, client) => {
        if (err) return console.log(err);
        const db = client.db('hw3');
        db.collection('admin').findOne({email: email}, {_id: 0},
            (err, result) => {
                cb(err, result);
                client.close();
            });
    });
};