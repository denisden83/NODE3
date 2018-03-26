const ModelLonig = require('../models/login');

module.exports.showPageLogin = (req, res, next) => {
  res.render('./pages/login', {msglogin: req.query.msglogin});
};

module.exports.logIn = function(req, res, next) {
    let email = req.body.email;
    let password = +req.body.password;
    if (email === ''){
        res.redirect(`/login?msglogin=Insert email. Default email admin@admin`);
        return;
    }
    if (!/@/.test(email)){
        res.redirect(`/login?msglogin=Email is not valid`);
        return;
    }
    if (password === ''){
        res.redirect(`/login?msglogin=Insert password`);
        return;
    }
    if (email === ''){
        res.redirect(`/login?msglogin=Insert email. Default email admin@admin`);
        return;
    }
    ModelLonig.checkIfAdmin(email, (err, result) => {
        if (err) return next(err);
        if (!result) {
            res.redirect(`/login?msglogin=there's no such user`);
            return;
        }
        if (result.password !== password) {
            res.redirect(`/login?msglogin=Wrong password. Default psw 1234`);
            console.log(typeof result.password);
            console.log(typeof password);
            return;
        }
        if (result.password === password) {
            res.redirect(`/admin`);
            console.log(typeof result.password);
            console.log(typeof password);
            return;
        }
        res.redirect(`/login`);
        console.log(result);
    });

};