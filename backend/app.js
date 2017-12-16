var express = require('express'),
  app = express(),
  ejs = require('ejs'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  bodyParser = require('body-parser'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user'),
  seedDB = require('./seeds');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/yelp_camp', { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'There is not a single particle not known by Him.',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  ejs.renderFile(__dirname + '/views/landing.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

app.get('/campgrounds', (req, res) => {
  var renderFolder = __dirname + '/views/campgrounds/';
  Campground.find({}, (err, campgrounds) => {
    if (err) console.log(err);
    else
      ejs.renderFile(renderFolder + 'index.ejs', { campgrounds } , (err, str) => {
        if (err) res.send(err);
        res.render('template', { body: str });
      });
  });
});

app.get('/campgrounds/new', (req, res) => {
  var renderFolder = __dirname + '/views/campgrounds/';
  ejs.renderFile(renderFolder + 'new.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

app.get('/campgrounds/:id', (req, res) => {
  var renderFolder = __dirname + '/views/campgrounds/';
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

app.post('/campgrounds', (req, res) => {
  var { name, image, description } = req.body;
  var newCampground = { name, image, description };
  Campground.create(newCampground, (err, campground) => {
    if (err) console.log(err);
    else res.redirect('/campgrounds');
  });
});

// ==================
// COMMENTS ROUTES
// ==================

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
  var renderFolder = __dirname + '/views/comments/';
  Campground.findById(req.params.id, (err, campground) => {
    if (err) console.error(err);
    ejs.renderFile(renderFolder + 'new.ejs', { campground }, (err, str) => {
      if (err) console.error(err);
      res.render('template', { body: str });
    });
  });
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
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

// AUTH ROUTES
app.get('/register', (req, res) => {
  var renderFolder = __dirname + '/views/';
  ejs.renderFile(renderFolder + 'register.ejs', (err, str) => {
    if (err) console.error(err);
    res.render('template', { body: str });
  });
});

app.post('/register', (req, res) => {
  var { username, password } = req.body;
  User.register(new User({ username }),  password,  (err, user) => {
    if (err) {
      console.error(err);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/campgrounds'));
  });
});

app.get('/login', (req, res) => {
  var renderFolder = __dirname + '/views/';
  ejs.renderFile(renderFolder + 'login.ejs', (err, str) => {
    if (err) console.error(err);
    res.render('template', { body: str });
  });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login'
}), (req, res) => {});


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

app.listen(3000, () => {
  console.log('Yelp Camp has started!!!')
});
