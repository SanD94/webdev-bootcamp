var express = require('express'),
  app = express(),
  ejs = require('ejs'),
  mongoose = require('mongoose');
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp', { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = mongoose.Schema({
   name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*
Campground.create({ name: "Granite Hill",
  image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg" },
  (err, campground) => {
    if (err) console.log(err);
    else {
      console.log("NEWLY CREATED BACKGROUND: ");
      console.log(campground);
    }
  });*/


app.get('/', (req, res) => {
  ejs.renderFile(__dirname + '/views/landing.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    if (err) console.log(err);
    else
      ejs.renderFile(__dirname + '/views/campgrounds.ejs', { campgrounds } , (err, str) => {
        if (err) res.send(err);
        res.render('template', { body: str });
      });
  });
});

app.get('/campgrounds/new', (req, res) => {
  ejs.renderFile(__dirname + '/views/new.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

app.post('/campgrounds', (req, res) => {
  var { name, image } = req.body;
  var newCampground = { name, image };
  Campground.create(newCampground, (err, campground) => {
    if (err) console.log(err);
    else res.redirect('/campgrounds');
  });
});

app.listen(3000, () => console.log('Yelp Camp has started!!!'));
