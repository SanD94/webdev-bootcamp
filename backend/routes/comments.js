var express = require('express'),
  router = express.Router({ mergeParams: true }),
  ejs = require('ejs'),
  Campground = require('../models/campground'),
  Comment = require('../models/comment');

router.get('/new', isLoggedIn, (req, res) => {
  var renderFolder = __dirname + '/../views/comments/';
  Campground.findById(req.params.id, (err, campground) => {
    if (err) console.error(err);
    ejs.renderFile(renderFolder + 'new.ejs', { campground }, (err, str) => {
      if (err) console.error(err);
      res.render('template', { body: str });
    });
  });
});

router.post('/', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.error(err);
      res.redirect('/campgrounds');
    }
    Comment.create(req.body.comment, (err, comment) => {
      if (err) console.error(err);
      campground.comments.push(comment);
      campground.save();
      res.redirect('/campgrounds/' + campground._id);
    });
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;
