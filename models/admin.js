const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

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

module.exports.addProduct = (src, name, price, cb) => {
    MongoClient.connect(url, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('hw3');
        db.collection('pictures').insertOne({src: src, name: name, price: price},
            (err, result) => {
                cb(err, result);
                client.close();
            });
    });
};

module.exports.addStatistics = (objToUpdate, cb) => {
    MongoClient.connect(url, (err, client) => {
        if (err) return console.error(err);
        const db = client.db('hw3');
        db.collection('statistics').findOneAndUpdate({name: 'statistics'},
            {$set: objToUpdate},
            (err, result) => {
                cb(err, result);
                client.close();
            });
    });
};



