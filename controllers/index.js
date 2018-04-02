const ModelIndex = require('../models/index');
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports.sendEmail = (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.json({msg: 'Все поля нужно заполнить', status: 'Error'});
    }
    const transporter = nodemailer.createTransport(config.get('sendMail:smtp'));
    const mailOptions = {
      from: `"${req.body.name}" <${req.body.email}>`,
      to: config.get('sendMail:finalDestination'),
      subject: config.get('sendMail:subject'),
      text: req.body.message.trim().slice(0, 500) +
      `\n Отправлено с: <${req.body.email}>`
      // html: req.body.message.trim().slice(0, 500) +
      // '<br /> Отправлено с: &lt' + req.body.email + '&gt'
    };
    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return res.json({msg: `При отправку письма произошла ошибка: ${error}`, status: 'Error'});
       }
        console.log(info);
        res.json({msg: `Письмо успешно отправлено`, status: 'Ok'});
    });
};

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
            res.render('./pages/index', { statistics, products });
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


