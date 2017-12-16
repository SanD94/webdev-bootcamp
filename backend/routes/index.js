var express = require('express'),
  router = express.Router(),
  ejs = require('ejs'),
  passport = require('passport'),
  User = require('../models/user');

router.get('/', (req, res) => {
  ejs.renderFile(__dirname + '/../views/landing.ejs', (err, str) => {
    if (err) return res.send(err);
    res.render('template', { body: str });
  });
});

router.get('/register', (req, res) => {
  var renderFolder = __dirname + '/../views/';
  ejs.renderFile(renderFolder + 'register.ejs', (err, str) => {
    if (err) console.error(err);
    res.render('template', { body: str });
  });
});

router.post('/register', (req, res) => {
  var { username, password } = req.body;
  User.register(new User({ username }),  password,  (err, user) => {
    if (err) {
      console.error(err);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/campgrounds'));
  });
});

router.get('/login', (req, res) => {
  var renderFolder = __dirname + '/../views/';
  ejs.renderFile(renderFolder + 'login.ejs', (err, str) => {
    if (err) console.error(err);
    res.render('template', { body: str });
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {});


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

module.exports = router;
