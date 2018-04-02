const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
const url = config.get('mongoUrl');

module.exports.getStatistics = (cb) => {
    MongoClient.connect(url, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('hw3');
        db.collection('statistics').findOne({name: 'statistics'}, {_id: 0, name: 0},
            (err, result) => {
                cb(err, result);
                client.close();
            });
    });
};

module.exports.getPictures = (cb) => {
    MongoClient.connect(url, (err, client) => {
       if (err) return console.error(err);
       const db = client.db('hw3');
       db.collection('pictures').find({}, {_id: 0}).toArray((err, result) => {
           cb(err, result);
           client.close();
       });
    });
};