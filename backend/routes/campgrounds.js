var express = require('express'),
  router = express.Router(),
  ejs = require('ejs'),
  Campground = require('../models/campground'),
  middleware = require('../middleware'),
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

router.get('/new', middleware.isLoggedIn, (req, res) => {
  ejs.renderFile(renderFolder + 'new.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

// TODO : renderFile functions should see the express locals variables[
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err) return console.error(err);
    var currentUser = res.locals.currentUser;
    ejs.renderFile(renderFolder + 'show.ejs', { campground, currentUser }, (err, str) => {
      if (err) return console.error(err);
      res.render('template', { body: str });
    });
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
  var { name, image, description } = req.body;
  var author = { id: req.user._id, username: req.user.username };
  var newCampground = { name, image, description, author };
  Campground.create(newCampground, (err, campground) => {
    if (err) console.log(err);
    else res.redirect('/campgrounds');
  });
});

router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) return res.redirect('/back');
    ejs.renderFile(renderFolder + 'edit.ejs', { campground }, (err, str) => {
      if (err) return res.send(err);
      res.render('template', { body: str });
    });
  });
});

router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  var data = req.body.campground;
  Campground.findByIdAndUpdate(req.params.id, data, (err, campground) => {
    if (err) return res.redirect('/campgrounds');
    res.redirect('/campgrounds/' + req.params.id);
  });
});

router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) return console.error(err);
    res.redirect('/campgrounds');
  });
});


module.exports = router;

