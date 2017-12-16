var mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment');

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "blah blah blah"
  },
  {
    name: "Desert Mesa",
    image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
    description: "blah blah blah"
  },
  {
    name: "Canyon Floor",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "blah blah blah"
  }
];

var comment = {
  text: 'This place is great, but I wish there was internet',
  author: 'Homer'
};

function seedDB() {
  // remove campgrounds
  Campground.remove({}, (err) => {
    if (err) console.log(err);
    console.log("remove campgrounds!");
    data.forEach(seed =>
      Campground.create(seed, (err, campground) => {
        if (err) console.error(err);
        console.log('added a campground');
        Comment.create(comment, (err, comment) => {
          if (err) console.error(err);
          campground.comments.push(comment);
          campground.save();
          console.log('Created new comment');
        });
      })
    );
  });
  // add a few comments
}

module.exports = seedDB;
