var express = require('express'),
  router = express.Router(),
  ejs = require('ejs'),
  Campground = require('../models/campground');

router.get('/', (req, res) => {
  var renderFolder = __dirname + '/../views/campgrounds/';
  Campground.find({}, (err, campgrounds) => {
    if (err) console.log(err);
    else
      ejs.renderFile(renderFolder + 'index.ejs', { campgrounds } , (err, str) => {
        if (err) res.send(err);
        res.render('template', { body: str });
      });
  });
});

router.get('/new', (req, res) => {
  var renderFolder = __dirname + '/../views/campgrounds/';
  ejs.renderFile(renderFolder + 'new.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

router.get('/:id', (req, res) => {
  var renderFolder = __dirname + '/../views/campgrounds/';
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

router.post('/', (req, res) => {
  var { name, image, description } = req.body;
  var newCampground = { name, image, description };
  Campground.create(newCampground, (err, campground) => {
    if (err) console.log(err);
    else res.redirect('/campgrounds');
  });
});

module.exports = router;

