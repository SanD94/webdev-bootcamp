var express = require('express'),
  router = express.Router({ mergeParams: true }),
  ejs = require('ejs'),
  Campground = require('../models/campground'),
  Comment = require('../models/comment'),
  middleware = require('../middleware');
  renderFolder = __dirname + '/../views/comments/';


router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) console.error(err);
    ejs.renderFile(renderFolder + 'new.ejs', { campground }, (err, str) => {
      if (err) console.error(err);
      res.render('template', { body: str });
    });
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.error(err);
      return res.redirect('/campgrounds');
    }
    Comment.create(req.body.comment, (err, comment) => {
      if (err) return console.error(err);
      comment.author.id = req.user._id;
      comment.author.username = req.user.username;
      comment.save();
      campground.comments.push(comment);
      campground.save();
      res.redirect('/campgrounds/' + campground._id);
    });
  });
});

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  var campground_id = req.params.id;
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) return res.redirect('back');
    ejs.renderFile(renderFolder + 'edit.ejs', { campground_id, comment }, (err, str) => {
      if (err) console.error(err);
      res.render('template', { body: str });
    });
  });
});


router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
    if (err) return res.redirect('back');
    res.redirect('/campgrounds/' + req.params.id);
  });
});


router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) res.redirect('back');
    res.redirect('/campgrounds/' + req.params.id);
  });
});



module.exports = router;
