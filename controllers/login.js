const ModelLogIn = require('../models/login');

module.exports.showPageLogin = (req, res, next) => {
  res.render('./pages/login', {msglogin: req.query.msglogin});
};

module.exports.logIn = function(req, res, next) {
    if (req.session.isAdmin) return res.redirect('/admin');
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
    // if (password === 0){
    //     res.redirect(`/login?msglogin=Insert password`);
    //     return;
    // }

    ModelLogIn.checkIfAdmin(email, (err, result) => {
        if (err) return next(err);
        if (!result) {
            res.redirect(`/login?msglogin=There's no such user. Default email admin@admin`);
            return;
        }
        if (result.password !== password) {
            res.redirect(`/login?msglogin=Wrong password. Default psw 1234`);
            return;
        }
        if (result.password === password) {
            req.session.isAdmin = true;
            res.redirect(`/admin`);
            return;
        }
        res.redirect(`/login`);
    });
};