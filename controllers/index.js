const ModelIndex = require('../models/index');

module.exports.showPageIndex = (req, res, next) => {
    let promise1 = new Promise((resolve, reject) => {
        ModelIndex.getStatistics((err, statistics) => {
            if (err) reject(err);
            resolve(statistics);
        });
    });

    let promise2 = new Promise((resolve, reject) => {
        ModelIndex.getPictures((err, products) => {
            if (err) reject(err);
            resolve(products);
        });
    });

    (async () => {
        try {
            let [statistics, products] = await Promise.all([promise1, promise2]);
            res.render('./pages/index', { statistics, products});
        } catch(err) {
            next(err);
        }
    })();

    // (async () => {
    //     try {
    //         let statistics = await promise1;
    //         let products = await promise2;
    //         res.render('./pages/index', { statistics, products});
    //     } catch(err) {
    //         next(err);
    //     }
    // })();

    // Promise.all([promise1, promise2])
    //     .then(data => {
    //         console.log(data);
    //         let [statistics, products] = data;
    //         res.render('./pages/index', {statistics, products});
    //     })
    //     .catch(err => next(err));

};

module.exports.sendEmail = (reg, res, next) => {
    res.send(`sending email`);
    console.log('sending email');
};
