var express = require('express'),
  app = express(),
  ejs = require('ejs'),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
  {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
  {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
  {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
  {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
  {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
  {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
  {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];

app.get('/', (req, res) => {
  ejs.renderFile(__dirname + '/views/landing.ejs', (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
  });
});

app.get('/campgrounds', (req, res) => {
  ejs.renderFile(__dirname + '/views/campgrounds.ejs', { campgrounds } , (err, str) => {
    if (err) res.send(err);
    res.render('template', { body: str });
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
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});

app.listen(3000, () => console.log('Yelp Camp has started!!!'));
