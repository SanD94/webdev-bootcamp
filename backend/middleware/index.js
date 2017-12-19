var Comment = require('../models/comment'),
  Campground = require('../models/campground');


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You need to be logged in to do that');
    return res.redirect('back');
  }
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash('error', 'Campground not found');
      return res.redirect('back');
    }
    if (!campground.author.id.equals(req.user._id)) {
      req.flash('error', 'You don\'t have permission to do that');
      return res.redirect('back');
    }
    next();
  });
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You need to be logged in to do that');
    return res.redirect('back');
  }
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      req.flash('error', 'Comment not found');
      return res.redirect('back');
    }
    if (!comment.author.id.equals(req.user._id)) {
      req.flash('error', 'You don\'t have permission to do that');
      return res.redirect('back');
    }
    next();
  });
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('error', 'You need to be logged in to do that');
  res.redirect('/login');
};


module.exports = middlewareObj;
