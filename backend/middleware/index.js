var Comment = require('../models/comment'),
  Campground = require('../models/campground');


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('back');
  Campground.findById(req.params.id, (err, campground) => {
    if (err) return res.redirect('back');
    if (!campground.author.id.equals(req.user._id))
      res.redirect('back');
    next();
  });
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('back');
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) return res.redirect('back');
    if (!comment.author.id.equals(req.user._id))
      res.redirect('back');
    next();
  });
};

middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
};


module.exports = middlewareObj;
