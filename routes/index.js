// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const ctrlIndex = require('../controllers/index');
const ctrlAdmin = require('../controllers/admin');
const ctrlLogin = require('../controllers/login');


/*----    ROOT ------*/
router.get('/', ctrlIndex.showPageIndex);
router.post('/', ctrlIndex.sendEmail);

/*----    PAGE ADMIN  ------*/
router.get('/admin', ctrlAdmin.showPageAdmin);
router.post('/admin/upload', ctrlAdmin.addProduct);
router.post('/admin/skills', ctrlAdmin.addStatistics);

/*----    LOGIN PAGE  ------*/
router.get('/login', ctrlLogin.showPageLogin);
router.post('/login', ctrlLogin.logIn);


module.exports = router;

// router.get('/', function(req, res, next) {
//   res.render('pages/index', { statistics });
// });