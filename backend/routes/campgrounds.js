var express = require('express'),
  router = express.Router(),
  ejs = require('ejs'),
  Campground = require('../models/campground'),
  renderFolder = __dirname + '/../views/campgrounds/';

router.get('/', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) console.log(err);
    else
      ejs.renderFile(renderFolder + 'index.ejs', { campgrounds } , (err, str) => {
        if (err) res.send(err);
        res.render('template', { body: str });
      });
  });
});

router.get('/new', isLoggedIn, (req, res) => {
  ejs.renderFile(renderFolder + 'new.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err) console.error(err);
    else {
      ejs.renderFile(renderFolder + 'show.ejs', { campground }, (err, str) => {
        if (err) console.error(err);
        res.render('template', { body: str });
      });
    }
  });
});

router.post('/', isLoggedIn, (req, res) => {
  var { name, image, description } = req.body;
  var author = { id: req.user._id, username: req.user.username };
  var newCampground = { name, image, description, author };
  Campground.create(newCampground, (err, campground) => {
    if (err) console.log(err);
    else res.redirect('/campgrounds');
  });
});

router.get('/:id/edit', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) return res.redirect('/campgrounds');
    ejs.renderFile(renderFolder + 'edit.ejs', { campground }, (err, str) => {
      if (err) return res.send(err);
      res.render('template', { body: str });
    });
  });
});

router.put('/:id', (req, res) => {
  var data = req.body.campground;
  Campground.findByIdAndUpdate(req.params.id, data, (err, campground) => {
    if (err) return res.redirect('/campgrounds');
    res.redirect('/campgrounds/' + req.params.id);
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;

