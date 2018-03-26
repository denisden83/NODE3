const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const ModelAdmin = require('../models/admin');

module.exports.showPageAdmin = (req, res, next) => {
    ModelAdmin.getStatistics((err, statistics) => {
        if (err) return next(err);
        res.render('./pages/admin', {
                statistics,
                msgskill: req.query.msgskill,
                msgfile: req.query.msgfile
            }
        );
    });
};

module.exports.addStatistics = (req, res, next) => {
    let objToUpdate = {};
    if (req.body.age) objToUpdate.age = Number(req.body.age);
    if (req.body.concerts) objToUpdate.concerts = Number(req.body.concerts);
    if (req.body.cities) objToUpdate.cities = Number(req.body.cities);
    if (req.body.years) objToUpdate.years = Number(req.body.years);

    if (!Object.keys(objToUpdate).length) {
        res.redirect(`/admin?msgskill=No data to change`);
        return;
    }
    ModelAdmin.addStatistics(objToUpdate,
        (err, result) => {
            if (err) return next(err);
            res.redirect(`/admin?msgskill=Info has been updated`);
        });
};

module.exports.addProduct = (req, res, next) => {
    let form = new formidable.IncomingForm();
    let upload = path.join('./public', 'upload');

    let fileName;

    if (!fs.existsSync(upload)) fs.mkdirSync(upload);

    form.uploadDir = path.join(process.cwd(), upload);

    form.parse(req, (err, fields, files) => {
       if (err) return next(err);
       if (files.photo.name === '' || files.photo.size === 0) {
           fs.unlink(files.photo.path, (err) => console.error(err));
           return res.redirect(`/admin?msgfile=Picture hasn't been attached`);
       }
       if ((!fields.name) || (!fields.price)) {
           fs.unlink(files.photo.path, (err) => console.error(err));
           return res.redirect(`/admin?msgfile=either Name or Price hasn't been inserted`);
       }
       fileName = path.join(upload, files.photo.name);

       fs.rename(files.photo.path, fileName, (err) => {
          if (err) {
              console.error(err);
              fs.unlink(fileName);
              fs.rename(files.photo.path, fileName);
          }
          let src = fileName.substr(fileName.indexOf('\\'));
           ModelAdmin.addProduct(src, fields.name, +fields.price, (err, result) => {
               if (err) return next(err);
               res.redirect(`/admin?msgfile=picture has been saved`);
           });
       });

    });
};

