var express = require('express'),
  app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('landing'));

app.get('/campgrounds', (req, res) => {
  res.send('Something should be here but I don\'t know which');
});

app.listen(3000, () => console.log('Yelp Camp has started!!!'));
